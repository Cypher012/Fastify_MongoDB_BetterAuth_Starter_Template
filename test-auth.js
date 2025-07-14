// Simple test script to debug authentication
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:8000';

async function testAuth() {
  try {
    console.log('Testing authentication flow...\n');

    // 1. First, try to create a review without authentication
    console.log('1. Testing createReview without auth...');
    try {
      const response = await fetch(`${BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: '507f1f77bcf86cd799439011', // Example MongoDB ObjectId
          rating: 5,
          comment: 'Great book!',
        }),
      });

      const result = await response.text();
      console.log('Status:', response.status);
      console.log('Response:', result);
    } catch (error) {
      console.log('Error:', error.message);
    }

    console.log('\n2. Testing auth endpoints...');

    // 2. Check if auth endpoints are accessible
    try {
      const response = await fetch(`${BASE_URL}/api/auth/session`);
      console.log('Auth session status:', response.status);
      const result = await response.text();
      console.log('Auth session response:', result);
    } catch (error) {
      console.log('Auth session error:', error.message);
    }

    console.log('\n3. Testing with cookies...');

    // 3. Test with a cookie (you'll need to get this from browser after login)
    try {
      const response = await fetch(`${BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'your-session-cookie-here', // Replace with actual cookie
        },
        body: JSON.stringify({
          bookId: '507f1f77bcf86cd799439011',
          rating: 5,
          comment: 'Great book!',
        }),
      });

      const result = await response.text();
      console.log('Status with cookie:', response.status);
      console.log('Response with cookie:', result);
    } catch (error) {
      console.log('Error with cookie:', error.message);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAuth();
