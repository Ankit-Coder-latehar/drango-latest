import React, { useState, useEffect } from 'react';
import { CARS_DATA } from './data/mockData';
import { fetchWixProducts } from './services/wixService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductFilterSection } from './components/ProductFilterSection';
import { FeaturedSlideshow } from './components/FeaturedSlideshow';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductPage } from './components/ProductPage';

export function App() {
  const [selectedCarId, setSelectedCarId] = useState('thar-roxx');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [isWixLoading, setIsWixLoading] = useState(true);
  const [wixConnected, setWixConnected] = useState(false);

  // View state: 'home' | 'product'
  const [currentView, setCurrentView] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadWixStore() {
      try {
        setIsWixLoading(true);
        const { products: liveWixProducts, fromLiveWix } = await fetchWixProducts();
        if (isMounted && fromLiveWix && liveWixProducts.length > 0) {
          // Set live Wix API inventory only
          setProductsList(liveWixProducts);
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

  // Selected car object
  const selectedCar = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  // Navigation handlers
  const handleOpenProductPage = (product) => {
    setActiveProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateProducts = () => {
    if (!activeProduct && productsList.length > 0) {
      setActiveProduct(productsList[0]);
    }
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleSelectCar = (carId) => {
    setSelectedCarId(carId);
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    // Smooth scroll down to the product filter section
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
      />

      {/* Main Sections */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero Section with Video Background & Title */}
            <Hero onNavigateProducts={handleNavigateProducts} />

            {/* 2. Category Section with Car Cards */}
            <CategorySection
              selectedCarId={selectedCarId}
              onSelectCar={handleSelectCar}
            />

            {/* 3. Product Filters (External, Internal, All...) & Dynamic Products */}
            <ProductFilterSection
              selectedCarId={selectedCarId}
              onAddToCart={handleAddToCart}
              onOpenQuickView={handleOpenProductPage}
              productsList={productsList}
              isWixLoading={isWixLoading}
            />

            {/* 4. Featured Products Slideshow / Scrolling Showcase */}
            <FeaturedSlideshow
              onAddToCart={handleAddToCart}
              onOpenQuickView={handleOpenProductPage}
              productsList={productsList}
            />

            {/* 5. Testimonials & Client Reviews */}
            <TestimonialsSection />

            {/* 6. Instagram Feed / Reels Showcase */}
            <InstagramSection />

            {/* 7. Contact Us & Consultation Booking */}
            <ContactSection />
          </>
        ) : (
          <ProductPage
            product={activeProduct || productsList[0]}
            productsList={productsList}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setActiveProduct(p)}
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

    </div>
  );
}

export default App;
