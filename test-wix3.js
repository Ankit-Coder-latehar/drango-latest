import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';

const CLIENT_ID = '80faa1d0-d13c-46ef-969d-f915c8ba500e';
const client = createClient({
  modules: { products, collections },
  auth: OAuthStrategy({ clientId: CLIENT_ID }),
});

async function testVisibleFalse() {
  try {
    const res = await client.products.queryProducts().eq('visible', false).find();
    console.log('visible=false count:', res.items?.length);
    res.items?.forEach(i => console.log('Hidden product:', i.name));
  } catch (e) {
    console.log('error eq visible false:', e.message);
  }

  try {
    const res = await client.products.queryProducts().eq('visible', true).find();
    console.log('visible=true count:', res.items?.length);
  } catch (e) {
    console.log('error eq visible true:', e.message);
  }

  // Check all collections
  try {
    const cols = await client.collections.queryCollections().find();
    console.log('Found collections:', cols.items?.map(c => ({ name: c.name, id: c._id, count: c.numberOfProducts })));
    for (const col of cols.items) {
      const colProducts = await client.products.queryProducts().hasSome('collectionIds', [col._id]).find();
      console.log(`Collection ${col.name} has ${colProducts.items?.length} items`);
    }
  } catch (e) {
    console.log('cols error:', e.message);
  }
}

testVisibleFalse();
