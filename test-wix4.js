import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

const CLIENT_ID = '80faa1d0-d13c-46ef-969d-f915c8ba500e';
const client = createClient({
  modules: { products },
  auth: OAuthStrategy({ clientId: CLIENT_ID }),
});

async function findSiteInfo() {
  try {
    const token = await client.auth.getAuthHeaders();
    console.log('Auth headers:', token);
  } catch (e) {
    console.log('token error:', e.message);
  }
}

findSiteInfo();
