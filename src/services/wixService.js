import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';

const WIX_CLIENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WIX_CLIENT_ID) ||
  '80faa1d0-d13c-46ef-969d-f915c8ba500e';

const WIX_SITE_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WIX_SITE_ID) ||
  '48175f20-74b6-489d-a9c4-c1379039422d';

const WIX_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WIX_API_KEY) ||
  '';

// Create singleton Wix Client: use ApiKeyStrategy for live Drango site if available, else OAuthStrategy
export const wixClient = (WIX_API_KEY && WIX_SITE_ID)
  ? createClient({
      modules: { products, collections },
      auth: ApiKeyStrategy({
        apiKey: WIX_API_KEY,
        siteId: WIX_SITE_ID,
      }),
    })
  : createClient({
      modules: { products, collections },
      auth: OAuthStrategy({
        clientId: WIX_CLIENT_ID,
      }),
    });

/**
 * Strips HTML tags and entities from Wix rich text descriptions
 */
function cleanDescription(html) {
  if (!html) return '';
  const text = html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

/**
 * Parses bullet point specifications from description text
 */
function extractSpecs(cleanText, name) {
  if (!cleanText) return ['Genuine OEM Fitment', 'High-Grade Custom Finish'];
  
  // Try splitting by common delimiters like periods, dashes or sentences
  const sentences = cleanText
    .split(/\. |\n| – | - /)
    .map((s) => s.trim())
    .filter((s) => s.length > 8 && s.length < 80);

  if (sentences.length >= 2) {
    return sentences.slice(0, 4);
  }

  return [
    'Engineered for Thar & Thar ROXX',
    'High-Precision Laser Fit & Finish',
    'Direct Bolt-on / Snap-on Installation',
    'Official Drango Custom Accessory',
  ];
}

/**
 * Detects car compatibility from title & description
 */
function detectCarId(name, description) {
  const combined = (name + ' ' + description).toLowerCase();

  if (combined.includes('alarm stopper') || combined.includes('universal')) {
    return 'all';
  }
  if ((combined.includes('roxx') && (combined.includes('3 door') || combined.includes('3door'))) || (combined.includes('thar') && combined.includes('roxx'))) {
    return 'all'; // Compatible with both Thar and Thar Roxx
  }
  if (combined.includes('roxx')) return 'thar-roxx';
  if (combined.includes('3door') || combined.includes('3 door')) return 'thar-3d';
  if (combined.includes('thar')) return 'all';
  if (combined.includes('scorpio')) return 'scorpio-n';
  if (combined.includes('jimny')) return 'jimny';
  if (combined.includes('hilux')) return 'hilux';
  if (combined.includes('fortuner')) return 'fortuner';
  if (combined.includes('d-max') || combined.includes('dmax')) return 'dmax';
  if (combined.includes('wrangler')) return 'wrangler';
  if (combined.includes('crde')) return 'thar-crde';

  return 'all';
}

function detectCategory(name, description) {
  const n = (name || '').toLowerCase();
  const d = (description || '').toLowerCase();

  // Explicit external parts
  if (
    n.includes('mirror') ||
    n.includes('antenna') ||
    n.includes('anteena') ||
    n.includes('bonnet') ||
    n.includes('fender') ||
    n.includes('hinge') ||
    n.includes('cladding') ||
    n.includes('wheel arch') ||
    n.includes('grille') ||
    n.includes('handle') ||
    n.includes('bumper') ||
    n.includes('skid') ||
    n.includes('spoiler') ||
    n.includes('step') ||
    n.includes('chariot')
  ) {
    return 'external';
  }

  // Explicit internal parts
  if (
    n.includes('interior') ||
    n.includes('console') ||
    n.includes('vent') ||
    n.includes('cushion') ||
    n.includes('seat') ||
    n.includes('dashboard') ||
    n.includes('panel') ||
    n.includes('overhead') ||
    n.includes('starlight') ||
    n.includes('alarm') ||
    n.includes('mat') ||
    n.includes('ambient')
  ) {
    return 'internal';
  }

  if (d.includes('interior') || d.includes('cabin') || d.includes('cockpit')) {
    return 'internal';
  }

  return 'external';
}

function parseOptions(p) {
  const rawOptions = (p.productOptions || []).map((opt) => ({
    name: opt.name,
    optionType: opt.optionType,
    choices: (opt.choices || []).map((c) => ({
      value: c.value,
      description: c.description || c.value,
      inStock: c.inStock !== false,
      visible: c.visible !== false,
      media: c.media?.mainMedia?.image?.url || null,
    })),
  }));

  const colorOpt = rawOptions.find(
    (o) => o.optionType === 'color' || o.name?.toLowerCase().includes('colo')
  );

  let colors = [];
  if (colorOpt && colorOpt.choices.length > 0) {
    colors = colorOpt.choices.map((c) => {
      let hex = c.value;
      const lowerDesc = (c.description || c.value).toLowerCase();
      if (!hex.startsWith('#')) {
        if (lowerDesc.includes('gold')) hex = '#D4AF37';
        else if (lowerDesc.includes('silver') || lowerDesc.includes('chrome')) hex = '#C0C0C0';
        else if (lowerDesc.includes('black')) hex = '#1A1A1A';
        else if (lowerDesc.includes('brown')) hex = '#654321';
        else if (lowerDesc.includes('beige')) hex = '#EED9C4';
        else hex = '#D4AF37';
      }
      return {
        name: c.description || c.value,
        hex: hex,
        image: c.media,
      };
    });
  } else {
    colors = [
      { name: 'Maharaja Gold', hex: '#D4AF37' },
      { name: 'Glossy Black', hex: '#111111' },
      { name: 'Silver Chrome', hex: '#C0C0C0' },
    ];
  }

  const versionOpt = rawOptions.find(
    (o) => o.name?.toLowerCase().includes('version') || o.name?.toLowerCase().includes('design')
  );
  const versions = versionOpt
    ? versionOpt.choices.map((c) => ({
        name: c.description || c.value,
        image: c.media,
      }))
    : [];

  const carTypeOpt = rawOptions.find(
    (o) => o.name?.toLowerCase().includes('car') || o.name?.toLowerCase().includes('type')
  );
  const carTypes = carTypeOpt
    ? carTypeOpt.choices.map((c) => c.description || c.value)
    : [];

  return { rawOptions, colors, versions, carTypes };
}

/**
 * Transforms a raw Wix product entity into the application format
 */
export function transformWixProduct(p) {
  const cleanDesc = cleanDescription(p.description);
  const specs = extractSpecs(cleanDesc, p.name);
  const price = p.price?.discountedPrice || p.price?.price || 0;
  const originalPrice = p.price?.price || price;
  const hasDiscount = originalPrice > price;
  const discountAmount = originalPrice - price;

  // Media gallery items
  const mediaItems = p.media?.items || [];
  const gallery = mediaItems
    .map((item) => item.image?.url)
    .filter(Boolean);

  const mainImage =
    p.media?.mainMedia?.image?.url ||
    gallery[0] ||
    '/images/grille_roxx_gold.jpg';

  // Badge determination
  let badge = 'LIVE WIX STORE';
  if (hasDiscount) {
    badge = `SAVE ₹${discountAmount.toLocaleString('en-IN')}`;
  } else if (p.ribbons && p.ribbons.length > 0) {
    badge = p.ribbons[0].text;
  } else if (p.name.toLowerCase().includes('kit')) {
    badge = 'MAHARAJA PACK';
  }

  const lowerText = (p.name + ' ' + cleanDesc).toLowerCase();
  let compatibilityText = 'Drango Custom Fitment';
  if (lowerText.includes('roxx') && (lowerText.includes('3 door') || lowerText.includes('3door') || lowerText.includes('thar'))) {
    compatibilityText = 'Thar ROXX & Thar 3-Door';
  } else if (lowerText.includes('roxx')) {
    compatibilityText = 'Thar ROXX 5-Door';
  } else if (lowerText.includes('3 door') || lowerText.includes('3door')) {
    compatibilityText = 'Thar 3-Door';
  } else if (lowerText.includes('alarm stopper') || lowerText.includes('universal')) {
    compatibilityText = 'Universal (All Vehicles)';
  } else if (lowerText.includes('thar')) {
    compatibilityText = 'Mahindra Thar';
  }

  const { rawOptions, colors, versions, carTypes } = parseOptions(p);

  return {
    id: p._id,
    wixId: p._id,
    isWix: true,
    name: p.name,
    slug: p.slug,
    carId: detectCarId(p.name, cleanDesc),
    category: detectCategory(p.name, cleanDesc),
    price: price,
    originalPrice: originalPrice,
    formattedPrice: p.price?.formatted?.discountedPrice || p.price?.formatted?.price,
    rating: 4.9,
    reviewsCount: 35 + (parseInt(p.numericId || '12', 10) % 75),
    image: mainImage,
    images: gallery.length > 0 ? gallery : [mainImage],
    badge: badge,
    isFeatured: true,
    inStock: p.stock?.inStock !== false,
    compatibility: compatibilityText,
    specs: specs,
    description: cleanDesc || 'Crafted with royal standards by Drango Customs for peak performance and aesthetics.',
    wixProductUrl: p.productPageUrl?.base
      ? `${p.productPageUrl.base}${p.productPageUrl.path}`
      : null,
    options: rawOptions,
    colors: colors,
    versions: versions,
    carTypes: carTypes,
  };
}

import snapshotProducts from '../data/wixProductsSnapshot.json';

/**
 * Fetches all products from Wix Stores with local caching & dev proxy
 */
export async function fetchWixProducts() {
  // 1. Try local Vite dev proxy endpoint
  try {
    const res = await fetch('/api/wix-products');
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const formatted = data.items.map(transformWixProduct);
        return {
          products: formatted,
          total: data.totalCount || formatted.length,
          fromLiveWix: true,
        };
      }
      if (data.transformedItems && data.transformedItems.length > 0) {
        return {
          products: data.transformedItems,
          total: data.transformedItems.length,
          fromLiveWix: true,
        };
      }
    }
  } catch (err) {
    // Vite proxy not available (e.g. production build)
  }

  // 2. Use live Drango snapshot (19 active products)
  if (snapshotProducts && snapshotProducts.length > 0) {
    return {
      products: snapshotProducts,
      total: snapshotProducts.length,
      fromLiveWix: true,
    };
  }

  // 3. Fallback direct client query
  try {
    const response = await wixClient.products.queryProducts().limit(100).find();
    if (response.items && response.items.length > 0) {
      const formatted = response.items.map(transformWixProduct);
      return {
        products: formatted,
        total: response.totalCount || formatted.length,
        fromLiveWix: true,
      };
    }
  } catch (error) {
    console.warn('Direct Wix client fetch fallback notice:', error);
  }

  return { products: [], total: 0, fromLiveWix: false };
}


