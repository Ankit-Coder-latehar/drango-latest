import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';

const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjgwY2E0NjQ2LWFiM2ItNDg0Mi1hZGQ1LWU2YjY0OTFhMmE5MVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjliOTAxYTMwLWJmZWMtNDQyOS04MmFlLWIzMjNhZTRiNmRiOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJhOWExMTczMC1hMzM5LTQzZWYtOGUzMy1lOGFmNmExYTVhODVcIn19IiwiaWF0IjoxNzg2MDI5MjM4fQ.BJU9QX4r9mmhdTl9ZAUXlbyh58ZpZPtgDJdP3RjYPm93vK2o3mRz1la-IzKLcjjkdrJivpqzJ3c4eps9-IxlsP_NNonO5Nuua0LPfn-y3sI2l6BTY2wYISmwcIKQ_nu7URnQnb5u7HsTM0lsfp1gwPQM6--AELk6OZfNHRLrlfeevrmVVBXJmDqwDeq69GKD4C0-RmF03GvQdvbqXu-2G5pZ5-_IVvBjbEiA3i_XVg42Dsu_9oPp-YXHreTt11VkbC_kZphW6sdBjbiRlUDRQdtCMfZM1R9lKIvdMD6hcvTk0wxDXbRq_pCoFpEnubUXcK3YRDpLfuXwmgx6nV-JhQ';
const CLIENT_ID = '80faa1d0-d13c-46ef-969d-f915c8ba500e';

async function testApiKey() {
  console.log('--- Testing ApiKeyStrategy ---');
  try {
    const client = createClient({
      modules: { products, collections },
      auth: ApiKeyStrategy({
        apiKey: API_KEY,
        siteId: 'a9a11730-a339-43ef-8e33-e8af6a1a5a85',
      }),
    });
    const res = await client.products.queryProducts().limit(100).find();
    console.log('ApiKey items count:', res.items ? res.items.length : 0);
    if (res.items) {
      res.items.forEach((item, index) => {
        console.log(`${index + 1}: ${item.name} (visible: ${item.visible})`);
      });
    }
  } catch (err) {
    console.error('ApiKey error:', err.message);
  }
}

async function testOAuthOptions() {
  console.log('--- Testing OAuth with various query options ---');
  try {
    const client = createClient({
      modules: { products, collections },
      auth: OAuthStrategy({ clientId: CLIENT_ID }),
    });

    // Let's check collections
    const colRes = await client.collections.queryCollections().find();
    console.log('Collections count:', colRes.items?.length);
    colRes.items?.forEach(c => console.log('Collection:', c.name, c._id, c.numberOfProducts));

    // Try query with no filters vs includeHiddenProducts if any
    const q = client.products.queryProducts();
    console.log('Available query builder methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(q)));

  } catch (err) {
    console.error('OAuth query error:', err.message);
  }
}

async function run() {
  await testApiKey();
  await testOAuthOptions();
}

run();
