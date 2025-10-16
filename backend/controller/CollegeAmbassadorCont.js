const CollegeAmbassador = require("../models/CollegeAmbassadorModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendEmail } = require("../utils/sendEmail");
const { generateAmbassadorWelcomeEmail, generateCompanyAmbassadorNotificationEmail } = require("../utils/emailTemplates");

// Register new college ambassador
exports.registerAmbassador = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    emailId,
    phoneNumber,
    collegeName,
    collegeCity,
    collegeCityPincode,
    courseYear
  } = req.body;

  // Check if ambassador already exists
  const existingAmbassador = await CollegeAmbassador.findOne({
    $or: [
      { emailId: emailId },
      { phoneNumber: phoneNumber }
    ]
  });

  if (existingAmbassador) {
    return next(new ErrorHander("Ambassador with this email or phone number already exists", 400));
  }

  const ambassador = await CollegeAmbassador.create({
    name,
    emailId,
    phoneNumber,
    collegeName,
    collegeCity,
    collegeCityPincode,
    courseYear
  });

  // Send welcome email to ambassador
  // try {
  //   const ambassadorDetails = {
  //     name,
  //     emailId,
  //     phoneNumber,
  //     collegeName,
  //     collegeCity,
  //     courseYear,
  //     ambassadorId: ambassador.ambassadorId
  //   };
    
  //   const welcomeEmailTemplate = generateAmbassadorWelcomeEmail(ambassadorDetails);
    
  //   await sendEmail({
  //     email: emailId,
  //     subject: welcomeEmailTemplate.subject,
  //     message: welcomeEmailTemplate.text,
  //     html: welcomeEmailTemplate.html
  //   });
  // } catch (emailError) {
  //   console.error("Failed to send welcome email:", emailError);
  //   // Don't fail registration if email fails
  // }

  // Send notification email to company
  try {
    const companyNotificationDetails = {
      name,
      emailId,
      phoneNumber,
      collegeName,
      collegeCity,
      collegeCityPincode,
      courseYear,
      ambassadorId: ambassador.ambassadorId,
      createdAt: ambassador.createdAt
    };
    
    const companyNotificationTemplate = generateCompanyAmbassadorNotificationEmail(companyNotificationDetails);
    
    await sendEmail({
      email: process.env.COMPANY_EMAIL,
      subject: companyNotificationTemplate.subject,
      message: companyNotificationTemplate.text,
      html: companyNotificationTemplate.html
    });
  } catch (emailError) {
    console.error("Failed to send company notification email:", emailError);
    // Don't fail registration if email fails
  }

  res.status(201).json({
    success: true,
    ambassador,
    message: "Ambassador registered successfully"
  });
});

// Get all ambassadors
exports.getAllAmbassadors = catchAsyncErrors(async (req, res, next) => {
  const ambassadors = await CollegeAmbassador.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: ambassadors.length,
    ambassadors
  });
});

// Get single ambassador by ID
exports.getSingleAmbassador = catchAsyncErrors(async (req, res, next) => {
  const ambassador = await CollegeAmbassador.findById(req.params.id);
  
  if (!ambassador) {
    return next(new ErrorHander("Ambassador not found", 404));
  }
  
  res.status(200).json({
    success: true,
    ambassador
  });
});

// Get ambassador by email
exports.getAmbassadorByEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.params;
  
  const ambassador = await CollegeAmbassador.findOne({ emailId: email });
  
  if (!ambassador) {
    return next(new ErrorHander("Ambassador not found", 404));
  }
  
  res.status(200).json({
    success: true,
    ambassador
  });
});

// Get ambassadors by city
exports.getAmbassadorsByCity = catchAsyncErrors(async (req, res, next) => {
  const { city } = req.params;
  
  const ambassadors = await CollegeAmbassador.findByCity(city);
  
  res.status(200).json({
    success: true,
    count: ambassadors.length,
    ambassadors
  });
});

// Get ambassadors by college
exports.getAmbassadorsByCollege = catchAsyncErrors(async (req, res, next) => {
  const { collegeName } = req.params;
  
  const ambassadors = await CollegeAmbassador.findByCollege(collegeName);
  
  res.status(200).json({
    success: true,
    count: ambassadors.length,
    ambassadors
  });
});

// Update ambassador
exports.updateAmbassador = catchAsyncErrors(async (req, res, next) => {
  const ambassador = await CollegeAmbassador.findById(req.params.id);
  
  if (!ambassador) {
    return next(new ErrorHander("Ambassador not found", 404));
  }
  
  const updatedAmbassador = await CollegeAmbassador.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );
  
  res.status(200).json({
    success: true,
    ambassador: updatedAmbassador
  });
});

// Update ambassador status
exports.updateAmbassadorStatus = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  
  const ambassador = await CollegeAmbassador.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );
  
  if (!ambassador) {
    return next(new ErrorHander("Ambassador not found", 404));
  }
  
  res.status(200).json({
    success: true,
    ambassador
  });
});


// Delete ambassador
exports.deleteAmbassador = catchAsyncErrors(async (req, res, next) => {
  const ambassador = await CollegeAmbassador.findById(req.params.id);
  
  if (!ambassador) {
    return next(new ErrorHander("Ambassador not found", 404));
  }
  
  await ambassador.remove();
  
  res.status(200).json({
    success: true,
    message: "Ambassador deleted successfully"
  });
});

// Get ambassador statistics
exports.getAmbassadorStats = catchAsyncErrors(async (req, res, next) => {
  const totalAmbassadors = await CollegeAmbassador.countDocuments();
  const activeAmbassadors = await CollegeAmbassador.countDocuments({ status: "Active" });
  
  const cityStats = await CollegeAmbassador.aggregate([
    { $group: { _id: "$collegeCity", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  
  const collegeStats = await CollegeAmbassador.aggregate([
    { $group: { _id: "$collegeName", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  
  res.status(200).json({
    success: true,
    stats: {
      totalAmbassadors,
      activeAmbassadors,
      topCities: cityStats,
      topColleges: collegeStats
    }
  });
});

// Search ambassadors
exports.searchAmbassadors = catchAsyncErrors(async (req, res, next) => {
  const { query } = req.query;
  
  if (!query) {
    return next(new ErrorHander("Search query is required", 400));
  }
  
  const ambassadors = await CollegeAmbassador.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { emailId: { $regex: query, $options: "i" } },
      { collegeName: { $regex: query, $options: "i" } },
      { collegeCity: { $regex: query, $options: "i" } },
      { ambassadorId: { $regex: query, $options: "i" } }
    ]
  }).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: ambassadors.length,
    ambassadors
  });
});

