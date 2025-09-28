import { google } from 'googleapis';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Check environment variables
    const credsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_API_SERVICES;
    
    if (!credsJson) {
      return res.status(500).json({
        success: false,
        error: 'No environment variable found',
        details: {
          GOOGLE_SERVICE_ACCOUNT_JSON: !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
          GOOGLE_API_SERVICES: !!process.env.GOOGLE_API_SERVICES
        }
      });
    }

    // Parse JSON
    let creds;
    try {
      creds = JSON.parse(credsJson);
    } catch (parseError) {
      return res.status(500).json({
        success: false,
        error: 'Invalid JSON format',
        details: parseError.message
      });
    }

    // Test JWT authentication
    try {
      const jwt = new google.auth.JWT(
        creds.client_email,
        null,
        creds.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      await jwt.authorize();
      
      return res.status(200).json({
        success: true,
        message: 'JWT authentication successful',
        details: {
          type: creds.type,
          project_id: creds.project_id,
          client_email: creds.client_email,
          has_private_key: !!creds.private_key
        }
      });
    } catch (jwtError) {
      // Try GoogleAuth as fallback
      try {
        const googleAuth = new google.auth.GoogleAuth({
          credentials: creds,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        
        const auth = await googleAuth.getClient();
        
        return res.status(200).json({
          success: true,
          message: 'GoogleAuth authentication successful',
          details: {
            type: creds.type,
            project_id: creds.project_id,
            client_email: creds.client_email,
            has_private_key: !!creds.private_key
          }
        });
      } catch (googleAuthError) {
        return res.status(500).json({
          success: false,
          error: 'Both authentication methods failed',
          details: {
            jwtError: jwtError.message,
            googleAuthError: googleAuthError.message
          }
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Unexpected error',
      details: error.message
    });
  }
}
