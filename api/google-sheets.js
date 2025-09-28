import { google } from 'googleapis';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Parse service account from environment variable
    const serviceAccountJson = process.env.GOOGLE_API_SERVICES;
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_API_SERVICES environment variable not set');
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const { action, sheetId, sheetName, data, rowIndex } = req.body;

    switch (action) {
      case 'read':
        const readResult = await sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: `${sheetName}!A:Z`,
        });
        res.status(200).json({
          success: true,
          values: readResult.data.values || []
        });
        break;

      case 'append':
        const appendResult = await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: `${sheetName}!A:Z`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [data]
          }
        });
        res.status(200).json({
          success: true,
          message: 'Data appended successfully',
          result: appendResult.data
        });
        break;

      case 'update':
        const updateResult = await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `${sheetName}!A${rowIndex}:Z${rowIndex}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [data]
          }
        });
        res.status(200).json({
          success: true,
          message: 'Data updated successfully',
          result: updateResult.data
        });
        break;

      case 'delete':
        // For delete, we need to use batchUpdate to delete the row
        const deleteResult = await sheets.spreadsheets.batchUpdate({
          spreadsheetId: sheetId,
          requestBody: {
            requests: [{
              deleteDimension: {
                range: {
                  sheetId: 0, // Assuming we're working with the first sheet
                  dimension: 'ROWS',
                  startIndex: rowIndex - 1,
                  endIndex: rowIndex
                }
              }
            }]
          }
        });
        res.status(200).json({
          success: true,
          message: 'Row deleted successfully',
          result: deleteResult.data
        });
        break;

      default:
        res.status(400).json({
          success: false,
          error: 'Invalid action'
        });
    }

  } catch (error) {
    console.error('Google Sheets API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
