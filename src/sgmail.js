const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser


const sendSgEmail = async (emailOptions) => {
    sgMail
  .send(emailOptions)
  .then(() => {
    console.log('Email sent successfully')
  })
  .catch((error) => {
    console.error(error)
  })
  
};


module.exports = { sendSgEmail }
