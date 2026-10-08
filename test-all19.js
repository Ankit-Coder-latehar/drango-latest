import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

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

function detectCategory(name, description) {
  const combined = (name + ' ' + description).toLowerCase();
  if (
    combined.includes('interior') ||
    combined.includes('vent') ||
    combined.includes('cushion') ||
    combined.includes('console') ||
    combined.includes('seat') ||
    combined.includes('starlight') ||
    combined.includes('ring') ||
    combined.includes('alarm') ||
    combined.includes('dashboard') ||
    combined.includes('overhead')
  ) {
    return 'internal';
  }
  return 'external';
}

function transform(p) {
  const cleanDesc = cleanDescription(p.description);
  const mediaItems = p.media?.items || [];
  const gallery = mediaItems.map((item) => item.image?.url).filter(Boolean);
  const mainImage = p.media?.mainMedia?.image?.url || gallery[0] || '/images/grille_roxx_gold.jpg';
  const price = p.price?.discountedPrice || p.price?.price || 0;

  return {
    name: p.name,
    category: detectCategory(p.name, cleanDesc),
    price: price,
    hasImage: !!mainImage,
    imagesCount: gallery.length,
    url: mainImage,
  };
}

async function test() {
  const client = createClient({
    modules: { products },
    auth: ApiKeyStrategy({ apiKey: API_KEY, siteId: SITE_ID }),
  });
  const res = await client.products.queryProducts().limit(100).find();
  const transformed = res.items.map(transform);
  transformed.forEach((t, i) => {
    console.log(`${i + 1}. [${t.category}] ${t.name} - ₹${t.price} (Images: ${t.imagesCount})`);
  });
}

test();
