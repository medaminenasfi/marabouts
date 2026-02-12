// Test API endpoints
const API_BASE_URL = 'http://localhost:8000/api';

async function testAPI() {
  console.log('🧪 Testing API endpoints...');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
    
    // Test contact forms endpoint (no auth required)
    console.log('2. Testing contact forms endpoint...');
    const formsResponse = await fetch(`${API_BASE_URL}/admin/contact-forms`);
    const formsData = await formsResponse.json();
    console.log('✅ Contact forms:', formsData.length, 'submissions');
    
    // Test login
    console.log('3. Testing login...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@marabouts.com', password: 'admin123' })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful:', loginData.user.email);
      console.log('🔑 Token:', loginData.token.substring(0, 20) + '...');
      
      // Test authenticated endpoint
      console.log('4. Testing authenticated endpoint with token...');
      const authResponse = await fetch(`${API_BASE_URL}/admin/contact-forms`, {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      const authData = await authResponse.json();
      console.log('✅ Authenticated request successful:', authData.length, 'forms');
    } else {
      console.error('❌ Login failed:', await loginResponse.text());
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAPI();
