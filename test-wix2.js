import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

const CLIENT_ID = '80faa1d0-d13c-46ef-969d-f915c8ba500e';
const client = createClient({
  modules: { products },
  auth: OAuthStrategy({ clientId: CLIENT_ID }),
});

async function inspect() {
  const q = client.products.queryProducts();
  console.log('q methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(q)));
  console.log('q instance keys:', Object.keys(q));

  // Let's test with includeHiddenProducts if available
  try {
    const res = await client.products.queryProducts().hasSome('visible', [true, false]).find();
    console.log('hasSome visible true/false count:', res.items?.length);
  } catch (e) {
    console.log('error hasSome visible:', e.message);
  }

  // Let's test queryProducts without any filter, or with includeHiddenProducts
  try {
    // Check if queryProducts takes options
    const res2 = await client.products.queryProducts({ includeHiddenProducts: true }).find();
    console.log('includeHiddenProducts count:', res2.items?.length);
  } catch (e) {
    console.log('error includeHiddenProducts:', e.message);
  }

  // Let's test queryProducts with numeric paging or cursors
  try {
    const res3 = await client.products.queryProducts().skip(0).limit(100).find();
    console.log('skip 0 limit 100 count:', res3.items?.length, 'totalCount:', res3.totalCount);
  } catch (e) {
    console.log('error res3:', e.message);
  }
}

inspect();
