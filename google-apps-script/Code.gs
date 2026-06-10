// Google Apps Script for handling RSVP form submissions
// Deploy this as a web app to receive POST requests from your Next.js app

function doPost(e) {
  try {
    // Parse the request body
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Define headers (will be created if they don't exist)
    const headers = ["Timestamp", "Name", "Email", "Contact", "Attendance", "Message"];
    
    // Check if headers exist, if not create them
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.appendRow(headers);
    } else {
      const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      const headersMatch = headers.every((header, index) => header === firstRow[index]);
      if (!headersMatch) {
        sheet.insertRows(1);
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }
    
    // Format attendance value
    const attendance = data.attendance === "yes" ? "Yes, Attending" : "No, Regretfully Decline";
    
    // Create the row data
    const rowData = [
      new Date().toISOString(),
      data.name.trim(),
      data.email.trim().toLowerCase(),
      data.contact.trim(),
      attendance,
      data.message.trim()
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error for debugging
    console.error("Error in doPost:", error);
    
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Add a doGet function for testing
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      message: "RSVP Web App is running. Use POST to submit RSVP data.",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
