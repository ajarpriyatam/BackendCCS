const mongoose = require("mongoose");
const validator = require("validator");

const collegeAmbassadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Ambassador Name"],
    maxLength: [50, "Name cannot exceed 50 characters"],
    minLength: [2, "Name should have more than 2 characters"],
    trim: true
  },
  emailId: {
    type: String,
    required: [true, "Please Enter Email ID"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email ID"],
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, "Please Enter Phone Number"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: "Please Enter a valid 10-digit Indian phone number"
    },
    trim: true
  },
  collegeName: {
    type: String,
    required: [true, "Please Enter College Name"],
    maxLength: [100, "College name cannot exceed 100 characters"],
    trim: true
  },
  collegeCity: {
    type: String,
    required: [true, "Please Enter College City"],
    maxLength: [50, "City name cannot exceed 50 characters"],
    trim: true
  },
  collegeCityPincode: {
    type: String,
    required: [true, "Please Enter College City Pincode"],
    validate: {
      validator: function(v) {
        return /^[1-9][0-9]{5}$/.test(v);
      },
      message: "Please Enter a valid 6-digit pincode"
    },
    trim: true
  },
  courseYear: {
    type: String,
    required: [true, "Please Enter Course Year"],
    enum: {
      values: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate", "Post Graduate"],
      message: "Please Enter a valid course year"
    }
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  ambassadorId: {
    type: String,
    unique: true,
    default: function() {
      return "AMB" + Date.now().toString().slice(-6);
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
collegeAmbassadorSchema.index({ emailId: 1 });
collegeAmbassadorSchema.index({ phoneNumber: 1 });
collegeAmbassadorSchema.index({ collegeName: 1 });
collegeAmbassadorSchema.index({ collegeCity: 1 });
collegeAmbassadorSchema.index({ status: 1 });

// Pre-save middleware to update lastActiveDate
collegeAmbassadorSchema.pre('save', function(next) {
  this.lastActiveDate = new Date();
  next();
});

// Instance method to get full college address
collegeAmbassadorSchema.methods.getFullCollegeAddress = function() {
  return `${this.collegeName}, ${this.collegeCity} - ${this.collegeCityPincode}`;
};


// Static method to find ambassadors by city
collegeAmbassadorSchema.statics.findByCity = function(city) {
  return this.find({ collegeCity: new RegExp(city, 'i'), status: 'Active' });
};

// Static method to find ambassadors by college
collegeAmbassadorSchema.statics.findByCollege = function(collegeName) {
  return this.find({ collegeName: new RegExp(collegeName, 'i'), status: 'Active' });
};

module.exports = mongoose.model("CollegeAmbassador", collegeAmbassadorSchema);

