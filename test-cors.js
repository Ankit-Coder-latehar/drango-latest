const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjgwY2E0NjQ2LWFiM2ItNDg0Mi1hZGQ1LWU2YjY0OTFhMmE5MVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjliOTAxYTMwLWJmZWMtNDQyOS04MmFlLWIzMjNhZTRiNmRiOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJhOWExMTczMC1hMzM5LTQzZWYtOGUzMy1lOGFmNmExYTVhODVcIn19IiwiaWF0IjoxNzg2MDI5MjM4fQ.BJU9QX4r9mmhdTl9ZAUXlbyh58ZpZPtgDJdP3RjYPm93vK2o3mRz1la-IzKLcjjkdrJivpqzJ3c4eps9-IxlsP_NNonO5Nuua0LPfn-y3sI2l6BTY2wYISmwcIKQ_nu7URnQnb5u7HsTM0lsfp1gwPQM6--AELk6OZfNHRLrlfeevrmVVBXJmDqwDeq69GKD4C0-RmF03GvQdvbqXu-2G5pZ5-_IVvBjbEiA3i_XVg42Dsu_9oPp-YXHreTt11VkbC_kZphW6sdBjbiRlUDRQdtCMfZM1R9lKIvdMD6hcvTk0wxDXbRq_pCoFpEnubUXcK3YRDpLfuXwmgx6nV-JhQ';
const SITE_ID = '48175f20-74b6-489d-a9c4-c1379039422d';

async function testCors() {
  try {
    // OPTIONS preflight
    const optRes = await fetch('https://www.wixapis.com/stores/v1/products/query', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'authorization,wix-site-id,content-type',
      },
    });
    console.log('OPTIONS status:', optRes.status);
    console.log('Access-Control-Allow-Origin:', optRes.headers.get('access-control-allow-origin'));
    console.log('Access-Control-Allow-Headers:', optRes.headers.get('access-control-allow-headers'));

    // Actual POST request
    const postRes = await fetch('https://www.wixapis.com/stores/v1/products/query', {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'wix-site-id': SITE_ID,
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173',
      },
      body: JSON.stringify({ query: { paging: { limit: 100 } } }),
    });
    console.log('POST status:', postRes.status);
    console.log('POST Allow-Origin:', postRes.headers.get('access-control-allow-origin'));
    const data = await postRes.json();
    console.log('Products fetched via REST:', data.products?.length, 'total:', data.totalResults);
  } catch (e) {
    console.error('Error:', e);
  }
}

testCors();
