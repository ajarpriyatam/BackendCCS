const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendEmail } = require("../utils/sendEmail");
const { generateContactMessageEmail} = require("../utils/emailTemplates");

// Send contact message
exports.sendContactMessage = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    message
  } = req.body;

  // Send email to company
  try {
    const contactDetails = {
      name,
      email,
      phone,
      message
    };
    
    const contactEmailTemplate = generateContactMessageEmail(contactDetails);
    
    await sendEmail({
      email: process.env.COMPANY_EMAIL,
      subject: contactEmailTemplate.subject,
      message: contactEmailTemplate.text,
      html: contactEmailTemplate.html
    });
  } catch (emailError) {
    console.error("Failed to send contact message email:", emailError);
    // Don't fail the request if email fails
  }

  res.status(201).json({
    success: true,
    message: "Your message has been sent successfully! We'll get back to you soon."
  });
});
