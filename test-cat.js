import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjgwY2E0NjQ2LWFiM2ItNDg0Mi1hZGQ1LWU2YjY0OTFhMmE5MVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjliOTAxYTMwLWJmZWMtNDQyOS04MmFlLWIzMjNhZTRiNmRiOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJhOWExMTczMC1hMzM5LTQzZWYtOGUzMy1lOGFmNmExYTVhODVcIn19IiwiaWF0IjoxNzg2MDI5MjM4fQ.BJU9QX4r9mmhdTl9ZAUXlbyh58ZpZPtgDJdP3RjYPm93vK2o3mRz1la-IzKLcjjkdrJivpqzJ3c4eps9-IxlsP_NNonO5Nuua0LPfn-y3sI2l6BTY2wYISmwcIKQ_nu7URnQnb5u7HsTM0lsfp1gwPQM6--AELk6OZfNHRLrlfeevrmVVBXJmDqwDeq69GKD4C0-RmF03GvQdvbqXu-2G5pZ5-_IVvBjbEiA3i_XVg42Dsu_9oPp-YXHreTt11VkbC_kZphW6sdBjbiRlUDRQdtCMfZM1R9lKIvdMD6hcvTk0wxDXbRq_pCoFpEnubUXcK3YRDpLfuXwmgx6nV-JhQ';
const SITE_ID = '48175f20-74b6-489d-a9c4-c1379039422d';

function detectCategory(name, description) {
  const n = name.toLowerCase();
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

async function testCat() {
  const client = createClient({
    modules: { products },
    auth: ApiKeyStrategy({ apiKey: API_KEY, siteId: SITE_ID }),
  });
  const res = await client.products.queryProducts().limit(100).find();
  res.items.forEach((p, idx) => {
    const cat = detectCategory(p.name, p.description);
    console.log(`${idx + 1}. [${cat.toUpperCase().padEnd(8)}] ${p.name}`);
  });
}

testCat();
