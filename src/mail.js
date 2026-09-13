require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createOAuth2Client = () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  return oauth2Client;
};

// Gmail API expects an RFC 2822 message, base64url-encoded.
const buildRawMessage = ({ from, to, cc, bcc, subject, html }) => {
  const headers = [`From: ${from}`, `To: ${to}`];
  if (cc) headers.push(`Cc: ${cc}`);
  if (bcc) headers.push(`Bcc: ${bcc}`);
  headers.push(`Subject: ${subject}`);
  headers.push("MIME-Version: 1.0");
  headers.push("Content-Type: text/html; charset=utf-8");

  const message = headers.join("\r\n") + "\r\n\r\n" + html;

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Sends via the Gmail REST API (HTTPS) instead of SMTP, since hosts like
// Render block outbound SMTP ports and cause connection timeouts.
const sendEmail = async (emailOptions) => {
  try {
    const auth = createOAuth2Client();
    const gmail = google.gmail({ version: "v1", auth });
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: buildRawMessage(emailOptions)
      }
    });
    console.log("Email sent successfully via Gmail API");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };