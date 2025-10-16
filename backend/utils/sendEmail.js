const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message, // Support HTML emails
  };

  await transporter.sendMail(mailOptions);
};

// Enhanced function to send confirmation emails
const sendConfirmationEmails = async (orderDetails, userDetails) => {
  const { generateUserOrderConfirmationEmail, generateCompanyOrderNotificationEmail } = require('./emailTemplates');
  
  try {
    // Send confirmation email to user
    const userEmailTemplate = generateUserOrderConfirmationEmail(userDetails.name, orderDetails);
    await sendEmail({
      email: userDetails.email,
      subject: userEmailTemplate.subject,
      message: userEmailTemplate.text,
      html: userEmailTemplate.html
    });

    // Send notification email to company
    const companyEmailTemplate = generateCompanyOrderNotificationEmail(orderDetails, userDetails);
    await sendEmail({
      email: process.env.COMPANY_EMAIL,
      subject: companyEmailTemplate.subject,
      message: companyEmailTemplate.text,
      html: companyEmailTemplate.html
    });

    return { success: true, message: 'Confirmation emails sent successfully' };
  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    throw new Error('Failed to send confirmation emails');
  }
};

module.exports = { sendEmail, sendConfirmationEmails };