const { Resend } = require("resend");

const sendResendEmail = async (emailOptions) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send(emailOptions);
    if (error) {
      console.error(error);
      return;
    }
    console.log("Email sent successfully via Resend", data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendResendEmail };
