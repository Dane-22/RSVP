# Google Sheets Setup Guide (Google Apps Script)

This guide provides detailed step-by-step instructions for setting up Google Sheets integration with the RSVP application using Google Apps Script. This method is simpler than using the Google Cloud API and requires no service account setup.

## Table of Contents
1. [Create a Google Sheet](#1-create-a-google-sheet)
2. [Add Google Apps Script](#2-add-google-apps-script)
3. [Deploy as Web App](#3-deploy-as-web-app)
4. [Configure Environment Variables](#4-configure-environment-variables)
5. [Test the Setup](#5-test-the-setup)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Create a Google Sheet

### Step 1.1: Go to Google Sheets
- Navigate to [https://sheets.google.com](https://sheets.google.com)
- Sign in with your Google account if you're not already signed in

### Step 1.2: Create a New Spreadsheet
- Click the **"+"** button or "Blank" to create a new spreadsheet
- Give it a meaningful name (e.g., "Wedding RSVP Responses")

### Step 1.3: Keep the Sheet Open
- Keep this Google Sheet open in your browser
- You'll need to add the Apps Script to it in the next step

---

## 2. Add Google Apps Script

### Step 2.1: Open Apps Script Editor
- In your Google Sheet, click **"Extensions"** in the top menu
- Select **"Apps Script"** from the dropdown
- This will open the Apps Script editor in a new tab

### Step 2.2: Delete Existing Code
- The editor may have some default code (like `function myFunction() {}`)
- Delete all existing code in the editor

### Step 2.3: Copy the Script Code
- Open the file `google-apps-script/Code.gs` in your project
- Copy all the code from that file

### Step 2.4: Paste the Script Code
- Paste the copied code into the Apps Script editor
- The code should include:
  - `doPost(e)` function to handle form submissions
  - `doGet(e)` function for testing
  - Automatic header creation
  - Error handling

### Step 2.5: Save the Script
- Click the **Save** icon (floppy disk) or press `Ctrl+S` / `Cmd+S`
- Give your project a name (e.g., "RSVP Form Handler")
- The script is now saved to your Google Sheet

---

## 3. Deploy as Web App

### Step 3.1: Open Deployment Dialog
- In the Apps Script editor, click the blue **"Deploy"** button in the top-right
- Select **"New deployment"** from the dropdown

### Step 3.2: Configure Deployment Settings
- **Select type**: Click the gear icon next to "Select type"
- Choose **"Web app"** from the list

### Step 3.3: Fill in Web App Details
- **Description**: Enter a description (e.g., "RSVP Form Web App v1")
- **Execute as**: Select **"Me"** (your email address)
- **Who has access**: Select **"Anyone"** (this is required for your Next.js app to access it)

### Step 3.4: Deploy
- Click the **"Deploy"** button
- Wait for the deployment to complete (usually 10-30 seconds)

### Step 3.5: Copy the Web App URL
- After deployment, you'll see a dialog with the web app URL
- The URL will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
- Copy this URL - you'll need it for the environment variables

### Step 3.6: Test the Web App (Optional)
- Open the copied URL in your browser
- You should see a JSON response like:
  ```json
  {
    "message": "RSVP Web App is running. Use POST to submit RSVP data.",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
  ```
- This confirms the web app is working correctly

---

## 4. Configure Environment Variables

### Step 4.1: Create .env.local File
- Navigate to your project root directory
- Create a new file named `.env.local`
- This file should be in the same directory as `package.json`

### Step 4.2: Add Environment Variable
Copy the following into your `.env.local` file and replace the placeholder:

```env
# Google Apps Script Web App URL
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Step 4.3: Fill in the Value
Replace `YOUR_SCRIPT_ID` with the actual URL you copied in Step 3.5.

**Example:**
```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxT3Xy7Z9v1W2X/exec
```

### Step 4.4: Important Security Notes
- **NEVER** commit `.env.local` to version control
- The `.gitignore` file in this project already excludes `.env.local`
- Keep your web app URL secure - anyone with the URL can send data to your sheet

---

## 5. Test the Setup

### Step 5.1: Restart Your Development Server
- If your development server is running, stop it (Ctrl+C)
- Start it again: `npm run dev`
- This ensures the new environment variables are loaded

### Step 5.2: Submit a Test RSVP
- Open your application in a browser
- Fill out the RSVP form with test data
- Submit the form

### Step 5.3: Verify Data in Google Sheet
- Go back to your Google Sheet
- You should see a new row with the test data
- The headers should be: `Timestamp`, `Name`, `Email`, `Contact`, `Attendance`, `Message`

### Step 5.4: Check for Errors
- If the submission fails, check your terminal/console for error messages
- Common issues:
  - Missing or incorrect `APPS_SCRIPT_URL`
  - Web app not deployed with "Anyone" access
  - Apps Script code has errors

---

## 6. Troubleshooting

### Issue: "Server configuration error. Missing Apps Script URL"

**Cause:** The `APPS_SCRIPT_URL` environment variable is missing or empty.

**Solution:**
1. Verify `.env.local` exists in the project root
2. Check that `APPS_SCRIPT_URL` is set correctly
3. Restart your development server after making changes

### Issue: "HTTP error! status: 401" or "HTTP error! status: 403"

**Cause:** The web app is not configured to allow public access.

**Solution:**
1. Go to the Apps Script editor
2. Click "Deploy" → "Manage deployments"
3. Edit the deployment
4. Set "Who has access" to **"Anyone"**
5. Save and redeploy

### Issue: "HTTP error! status: 404"

**Cause:** The web app URL is incorrect or the deployment was deleted.

**Solution:**
1. Verify the URL in `.env.local` matches the deployment URL
2. Check that the deployment still exists in Apps Script
3. If needed, create a new deployment and update the URL

### Issue: Data not appearing in Google Sheet

**Cause:** Multiple possible causes.

**Solution:**
1. Check the browser console for JavaScript errors
2. Check the terminal/server logs for backend errors
3. Verify the Apps Script code is saved and deployed
4. Try refreshing the Google Sheet (sometimes there's a delay)
5. Check the Apps Script execution logs (View → Executions)

### Issue: "Unknown error from Apps Script"

**Cause:** An error occurred in the Apps Script code.

**Solution:**
1. Open the Apps Script editor
2. Click "View" → "Executions" to see recent execution logs
3. Check for error messages in the logs
4. Verify the script code matches the provided `Code.gs` file

### Issue: Web app returns HTML instead of JSON

**Cause:** The web app might be redirecting to a login page or showing an error page.

**Solution:**
1. Ensure "Who has access" is set to "Anyone"
2. Check if you're logged into Google when testing
3. Try accessing the URL in an incognito/private window
4. Verify the deployment is active (not disabled)

---

## Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Apps Script Web Apps Guide](https://developers.google.com/apps-script/guides/web)

---

## Security Best Practices

1. **Never commit credentials to version control**
   - `.env.local` is already in `.gitignore`
   - Never add the web app URL to public repositories

2. **Use different deployments for different environments**
   - Create separate web apps for development and production
   - Use different Google Sheets for each environment

3. **Monitor usage**
   - Check the Apps Script execution logs regularly
   - Set up alerts for unusual activity if needed

4. **Limit access when possible**
   - For production, consider using Google Workspace domain restrictions if available
   - Regularly review who has access to your Google Sheet

---

## Summary

After completing these steps:
- ✅ You have a Google Sheet to store RSVP responses
- ✅ You have a Google Apps Script deployed as a web app
- ✅ Your application is configured with the web app URL
- ✅ RSVP submissions will be automatically saved to your Google Sheet

The application will automatically create the necessary headers (Timestamp, Name, Email, Contact, Attendance, Message) on the first successful submission.

---

## Differences from Google Cloud API Method

This Google Apps Script approach has several advantages over the Google Cloud API method:

- **Simpler setup**: No need to create a Google Cloud project, enable APIs, or manage service accounts
- **No credentials to manage**: No private keys or service account emails to configure
- **Easier to debug**: You can view execution logs directly in the Apps Script editor
- **No additional dependencies**: No need for `googleapis` or `google-auth-library` packages
- **Free**: Uses your existing Google account quota

The trade-off is that the web app URL must be set to "Anyone" access, which means anyone with the URL could potentially send data to your sheet. For most RSVP use cases, this is acceptable.
