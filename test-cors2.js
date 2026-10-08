const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjgwY2E0NjQ2LWFiM2ItNDg0Mi1hZGQ1LWU2YjY0OTFhMmE5MVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjliOTAxYTMwLWJmZWMtNDQyOS04MmFlLWIzMjNhZTRiNmRiOVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJhOWExMTczMC1hMzM5LTQzZWYtOGUzMy1lOGFmNmExYTVhODVcIn19IiwiaWF0IjoxNzg2MDI5MjM4fQ.BJU9QX4r9mmhdTl9ZAUXlbyh58ZpZPtgDJdP3RjYPm93vK2o3mRz1la-IzKLcjjkdrJivpqzJ3c4eps9-IxlsP_NNonO5Nuua0LPfn-y3sI2l6BTY2wYISmwcIKQ_nu7URnQnb5u7HsTM0lsfp1gwPQM6--AELk6OZfNHRLrlfeevrmVVBXJmDqwDeq69GKD4C0-RmF03GvQdvbqXu-2G5pZ5-_IVvBjbEiA3i_XVg42Dsu_9oPp-YXHreTt11VkbC_kZphW6sdBjbiRlUDRQdtCMfZM1R9lKIvdMD6hcvTk0wxDXbRq_pCoFpEnubUXcK3YRDpLfuXwmgx6nV-JhQ';
const SITE_ID = '48175f20-74b6-489d-a9c4-c1379039422d';
const url = 'https://www.wixapis.com/stores-reader/v1/products/query-platformized?.r=eyJxdWVyeSI6eyJmaWx0ZXIiOnt9LCJwYWdpbmciOnsibGltaXQiOjEwMCwib2Zmc2V0IjowfX19';

async function test() {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
      'wix-site-id': SITE_ID,
      'Origin': 'http://localhost:5173',
    },
  });
  console.log('GET status:', res.status);
  console.log('GET Allow-Origin:', res.headers.get('access-control-allow-origin'));
  const data = await res.json();
  console.log('Products:', data.products?.length);
}

test();
