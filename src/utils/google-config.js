// Data needed to connect to the Google API
export default {
  apiKey: process.env.GATSBY_GOOGLE_API_KEY,
  clientId: process.env.GATSBY_CLIENT_ID,
  discoveryDocs:
    ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: process.env.GATSBY_SPREADSHEET_ID,
  scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
};
