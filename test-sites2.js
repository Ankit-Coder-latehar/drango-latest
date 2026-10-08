import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjgwY2E0NjQ2LWFiM2ItNDg0Mi1hZGQ1LWU2YjY0OTFhMmE5MVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjliOTAxYTMwLWJmZWMtNDQyOS04MmFlLWIzMjNhZTRiNmRiOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJhOWExMTczMC1hMzM5LTQzZWYtOGUzMy1lOGFmNmExYTVhODVcIn19IiwiaWF0IjoxNzg2MDI5MjM4fQ.BJU9QX4r9mmhdTl9ZAUXlbyh58ZpZPtgDJdP3RjYPm93vK2o3mRz1la-IzKLcjjkdrJivpqzJ3c4eps9-IxlsP_NNonO5Nuua0LPfn-y3sI2l6BTY2wYISmwcIKQ_nu7URnQnb5u7HsTM0lsfp1gwPQM6--AELk6OZfNHRLrlfeevrmVVBXJmDqwDeq69GKD4C0-RmF03GvQdvbqXu-2G5pZ5-_IVvBjbEiA3i_XVg42Dsu_9oPp-YXHreTt11VkbC_kZphW6sdBjbiRlUDRQdtCMfZM1R9lKIvdMD6hcvTk0wxDXbRq_pCoFpEnubUXcK3YRDpLfuXwmgx6nV-JhQ';

const testSites = [
  { name: 'Drango (www.drango.in)', id: '48175f20-74b6-489d-a9c4-c1379039422d' },
  { name: 'Thar Car Modificatio', id: 'b9be94a8-77ee-4b61-82a4-1ecfe05d5466' },
  { name: 'Original metaSite fb3fe4f3', id: 'fb3fe4f3-3ec4-4ba5-bb87-e2edd7e12399' },
];

async function check() {
  for (const s of testSites) {
    console.log(`\n=== Testing site ${s.name} (${s.id}) ===`);
    try {
      const client = createClient({
        modules: { products },
        auth: ApiKeyStrategy({
          apiKey: API_KEY,
          siteId: s.id,
        }),
      });
      const res = await client.products.queryProducts().limit(100).find();
      console.log(`Total products: ${res.totalCount}, items: ${res.items?.length}`);
      res.items?.forEach((p, idx) => console.log(`  ${idx + 1}: ${p.name}`));
    } catch (e) {
      console.log(`Error on ${s.name}:`, e.message);
    }
  }
}

check();
