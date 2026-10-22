import React, { useState, useEffect, useRef } from 'react';
import { CARS_DATA } from './data/mockData';
import { fetchWixProducts } from './services/wixService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductFilterSection } from './components/ProductFilterSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductsCatalogPage } from './components/ProductsCatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { LoaderScreen } from './components/LoaderScreen';
import { BackgroundMusic } from './components/BackgroundMusic';

export function App() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [isWixLoading, setIsWixLoading] = useState(true);
  const [wixConnected, setWixConnected] = useState(false);

  // View state: 'home' | 'products' | 'product-detail'
  const [currentView, setCurrentView] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);

  // Background audio state and reference
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying && !audio.paused) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio.volume = 0.35;
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadWixStore() {
      try {
        setIsWixLoading(true);
        const { products: liveWixProducts, fromLiveWix } = await fetchWixProducts();
        if (isMounted && fromLiveWix && liveWixProducts.length > 0) {
          const sanitizedProducts = liveWixProducts.map((prod) => ({
            ...prod,
            badge: prod.badge && prod.badge.toLowerCase().includes('wix') ? null : prod.badge,
          }));
          setProductsList(sanitizedProducts);
          setWixConnected(true);
        }
      } catch (err) {
        console.warn('Wix initialization error:', err);
      } finally {
        if (isMounted) setIsWixLoading(false);
      }
    }

    loadWixStore();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync view with browser URL hash for smooth back/forward navigation
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const query = decodeURIComponent(hash.replace('#product/', '')).toLowerCase();
        const found = productsList.find(
          (p) =>
            (p.slug && p.slug.toLowerCase() === query) ||
            (p.id && p.id.toLowerCase() === query)
        );
        if (found) {
          setActiveProduct(found);
          setCurrentView('product-detail');
        }
      } else if (hash === '#products') {
        setCurrentView('products');
      } else if (hash === '#home' || hash === '' || hash === '#contact') {
        setCurrentView('home');
      }
    };

    if (productsList.length > 0) {
      handleHashSync();
    }
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, [productsList]);

  // Selected car object
  const selectedCar = selectedCarId ? CARS_DATA.find((c) => c.id === selectedCarId) : null;

  // Navigation handlers
  const handleOpenProductDetail = (product) => {
    setActiveProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product.slug) {
      window.location.hash = `product/${product.slug}`;
    } else if (product.id) {
      window.location.hash = `product/${product.id}`;
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = 'home';
  };

  const handleNavigateProducts = () => {
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = 'products';
  };

  // Cart actions with variant preservation
  const getItemKey = (p) =>
    `${p.id}__${p.selectedColor || ''}__${p.selectedVersion || ''}`;

  const handleAddToCart = (product) => {
    const itemKey = getItemKey(product);
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => getItemKey(item.product) === itemKey);
      if (existing) {
        return prevItems.map((item) =>
          getItemKey(item.product) === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1, key: itemKey }];
    });
  };

  const handleBuyNow = (product, qty = 1) => {
    const itemKey = getItemKey(product);
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => getItemKey(item.product) === itemKey);
      if (existing) {
        return prevItems.map((item) =>
          getItemKey(item.product) === itemKey
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevItems, { product, quantity: qty, key: itemKey }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId || item.key === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId && item.key !== productId)
    );
  };

  const handleSelectCar = (carId) => {
    setSelectedCarId((prev) => (prev === carId ? null : carId));
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const elem = document.getElementById('products');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-maharaja-950 text-amber-50 selection:bg-gold selection:text-maharaja-950 flex flex-col justify-between">
      
      {/* Royal Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectVehicle={handleSelectCar}
        selectedCar={selectedCar}
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateProducts={handleNavigateProducts}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section with Video Background & Title */}
            <Hero onNavigateProducts={handleNavigateProducts} />

            {/* 2. Category Section with Car Cards */}
            <CategorySection
              selectedCarId={selectedCarId}
              onSelectCar={handleSelectCar}
            />

            {/* 3. Product Filters (All Products, Our Limited Products) & Dynamic Products */}
            <ProductFilterSection
              selectedCarId={selectedCarId}
              onAddToCart={handleAddToCart}
              onOpenQuickView={handleOpenProductDetail}
              productsList={productsList}
              isWixLoading={isWixLoading}
            />

            {/* 5. Testimonials & Client Reviews */}
            <TestimonialsSection />

            {/* 6. Instagram Feed / Reels Showcase */}
            <InstagramSection />

            {/* 7. Contact Us & Consultation Booking */}
            <ContactSection />
          </>
        )}

        {currentView === 'products' && (
          <ProductsCatalogPage
            productsList={productsList}
            onAddToCart={handleAddToCart}
            onOpenProduct={handleOpenProductDetail}
            onBackToHome={handleNavigateHome}
            isWixLoading={isWixLoading}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            product={activeProduct || productsList[0]}
            productsList={productsList}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleOpenProductDetail}
            onBackToProducts={handleNavigateProducts}
            onBackToHome={handleNavigateHome}
          />
        )}
      </main>

      {/* Royal Footer */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer with WhatsApp Order Formatting */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Royal Initial Brand Loader Screen */}
      <LoaderScreen onFinished={() => setIsLoaderFinished(true)} />

      {/* Background Theme Audio - Active on full site except loader screen */}
      <BackgroundMusic
        isLoaderFinished={isLoaderFinished}
        isPlaying={isAudioPlaying}
        setIsPlaying={setIsAudioPlaying}
        audioRef={audioRef}
      />

    </div>
  );
}

export default App;
