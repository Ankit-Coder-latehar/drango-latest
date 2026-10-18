import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import fs from 'fs';
import path from 'path';

const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjgwY2E0NjQ2LWFiM2ItNDg0Mi1hZGQ1LWU2YjY0OTFhMmE5MVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjliOTAxYTMwLWJmZWMtNDQyOS04MmFlLWIzMjNhZTRiNmRiOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJhOWExMTczMC1hMzM5LTQzZWYtOGUzMy1lOGFmNmExYTVhODVcIn19IiwiaWF0IjoxNzg2MDI5MjM4fQ.BJU9QX4r9mmhdTl9ZAUXlbyh58ZpZPtgDJdP3RjYPm93vK2o3mRz1la-IzKLcjjkdrJivpqzJ3c4eps9-IxlsP_NNonO5Nuua0LPfn-y3sI2l6BTY2wYISmwcIKQ_nu7URnQnb5u7HsTM0lsfp1gwPQM6--AELk6OZfNHRLrlfeevrmVVBXJmDqwDeq69GKD4C0-RmF03GvQdvbqXu-2G5pZ5-_IVvBjbEiA3i_XVg42Dsu_9oPp-YXHreTt11VkbC_kZphW6sdBjbiRlUDRQdtCMfZM1R9lKIvdMD6hcvTk0wxDXbRq_pCoFpEnubUXcK3YRDpLfuXwmgx6nV-JhQ';
const SITE_ID = '48175f20-74b6-489d-a9c4-c1379039422d';

function cleanDescription(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSpecs(cleanText, name) {
  if (!cleanText) return ['Genuine OEM Fitment', 'High-Grade Custom Finish'];
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

function detectCarId(name, description) {
  const combined = (name + ' ' + description).toLowerCase();
  if (combined.includes('alarm stopper') || combined.includes('universal')) return 'all';
  if ((combined.includes('roxx') && (combined.includes('3 door') || combined.includes('3door'))) || (combined.includes('thar') && combined.includes('roxx'))) return 'all';
  if (combined.includes('roxx')) return 'thar-roxx';
  if (combined.includes('3door') || combined.includes('3 door')) return 'thar-3d';
  return 'all';
}

function detectCategory(name, description) {
  const n = (name || '').toLowerCase();
  const d = (description || '').toLowerCase();

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

function transform(p) {
  const cleanDesc = cleanDescription(p.description);
  const specs = extractSpecs(cleanDesc, p.name);
  const price = p.price?.discountedPrice || p.price?.price || 0;
  const originalPrice = p.price?.price || price;
  const hasDiscount = originalPrice > price;
  const discountAmount = originalPrice - price;

  const mediaItems = p.media?.items || [];
  const gallery = mediaItems.map((item) => item.image?.url).filter(Boolean);
  const mainImage = p.media?.mainMedia?.image?.url || gallery[0] || '/images/grille_roxx_gold.jpg';

  let badge = null;
  if (hasDiscount) {
    badge = `SAVE ₹${discountAmount.toLocaleString('en-IN')}`;
  } else if (p.ribbons && p.ribbons.length > 0) {
    const ribbonText = p.ribbons[0].text;
    if (ribbonText && !ribbonText.toLowerCase().includes('wix')) {
      badge = ribbonText;
    }
  } else if (p.name.toLowerCase().includes('kit')) {
    badge = 'MAHARAJA PACK';
  }

  if (badge && badge.toLowerCase().includes('wix')) {
    badge = null;
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
    wixProductUrl: p.productPageUrl?.base ? `${p.productPageUrl.base}${p.productPageUrl.path}` : null,
    options: rawOptions,
    colors: colors,
    versions: versions,
    carTypes: carTypes,
  };
}

async function saveSnapshot() {
  const client = createClient({
    modules: { products },
    auth: ApiKeyStrategy({ apiKey: API_KEY, siteId: SITE_ID }),
  });
  const res = await client.products.queryProducts().limit(100).find();
  const transformed = res.items.map(transform);
  fs.writeFileSync('./src/data/wixProductsSnapshot.json', JSON.stringify(transformed, null, 2), 'utf-8');
  console.log('Saved', transformed.length, 'products with colors & options to src/data/wixProductsSnapshot.json');
}

saveSnapshot();

