export default async function handler(request, response) {
  // 1. Enable CORS (Cross-Origin Resource Sharing)
  // This allows your HTML file to talk to this API even if they are on different subdomains (sometimes relevant)
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request for CORS
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // 2. Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = request.body;
    
    // --- DATABASE STORAGE LOGIC HERE ---
    // For now, we will just log to the Vercel Function Logs.
    // To persist this, you would connect to Supabase, Firebase, or Vercel KV here.
    
    console.log("📝 NEW ANALYTICS EVENT:");
    console.log(JSON.stringify(data, null, 2));

    // Example of what you would do with a database:
    // await db.collection('analytics').add(data);

    return response.status(200).json({ success: true, message: 'Event tracked' });

  } catch (error) {
    console.error("Tracking Error:", error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
