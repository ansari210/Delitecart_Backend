const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios=require("axios");
const nodemailer = require("nodemailer");
const { verifyJWT, decodeJWT, signJWT } = require("../middleware/encrypt");
const {pass_reset_template}=require("../email_templates/pass_reset_template.js")
const { getOtpTemplate } =require( "../email_templates/otp_template.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});
const FAST2SMS_URL = "https://www.fast2sms.com/dev/bulkV2";

const get_user_profile = async (req, res) => {
  try {
   const {id} = req.user;
     
    const user = await User.findById(id).select("-password -role -otp -otp_expiry")
    console.log("decode>>>>", user);
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new Error("Please fill all fields");
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
     
    });

    const newuser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "You Have Been Register Successfully",
      data: newuser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const genrate_otp = async (req, res) => {

  try{

  
  const {name, email } = req.body;
  // const user = await User.findOne({ email });
  if (!email)
    return res
      .status(404)
      .send({ success: false, message: "Your're Not Register" });
  // email services
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  // user.otp = otp;
  // user.otp_expiry = otpExpiry;
  // await user.save();
  const htmlContent = getOtpTemplate(name, email, otp);

  await transporter.sendMail({
    from: '"DelightCart" <noreply@delightcart.com>',
    to: email,
    subject: "Your DelightCart OTP for Password Reset",
    html: htmlContent,
    attachments: [
    {
      filename: 'logo.png',        
      path: './public/logo.png',    
      cid: 'logo'                   
    }]
  });

  return res
    .status(200)
    .send({
      success: true,
      message: "OTP has been sent on your email please check",

    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verify_otp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    
    const otp_number = Number(otp);

    if (user.otp !== otp_number) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP" });
    }

    if (user.otp_expiry < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully. You can now reset your password.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
const reset_password = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

  
    const otpNumber = Number(otp);
    if (user.otp !== otpNumber)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.otp_expiry < new Date())
      return res.status(400).json({ success: false, message: "OTP has expired" });

   
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

   
    user.otp = null;
    user.otp_expiry = null;

    await user.save();
  const pass_reset_html_content = pass_reset_template(user?.name, user?.email, );

  await transporter.sendMail({
    from: '"DelightCart" <noreply@delightcart.com>',
    to: email,
    subject: "Your DelightCart OTP for Password Reset",
    html: pass_reset_html_content,
    attachments: [
    {
      filename: 'logo.png',        
      path: './public/logo.png',    
      cid: 'logo'                   
    }]
  });
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
     
    if (!user) throw new Error("User not found");

    if (!user?.password) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = {
      user: {
        id: user?._id,
        name: user?.name,
        role: user?.role,
        avatar: user?.avatar,
      },
    };

    const token = signJWT(payload);
  
    return res.status(200)
      .json({ success: true, message: "Login successful", data:token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 const mobile_otp = async (req, res) => {
   try {
     const { phone } = req.body;
     if (!phone) {
       return res
         .status(400)
         .json({ success: false, message: "Phone number is required" });
     }

     const otp = Math.floor(100000 + Math.random() * 900000).toString();

     // Prepare form-encoded body
     const payload = new URLSearchParams({
       route: "q",
       numbers: Array.isArray(phone) ? phone.join(",") : String(phone),
       message: ` Dear Ruhee, we received your DelightCart password reset request. Your OTP is ${otp}, valid for 10 mins.`,
       flash: "0",
     });

     const { data } = await axios.post(FAST2SMS_URL, payload, {
       headers: {
         authorization: process.env.FAST2SMS_API_KEY,
         "Content-Type": "application/x-www-form-urlencoded",
       },
       timeout: 15000,
     });

     if (!data.return) {
       return res.status(500).json({
         success: false,
         message: "Failed to send OTP",
         providerResponse: data,
       });
     }

     return res.status(200).json({
       success: true,
       message: "OTP sent successfully",
       otp,
       providerResponse: data,
     });
   } catch (error) {
     console.error("SMS Error:", error.response?.data || error.message);
     return res.status(500).json({
       success: false,
       message: "Something went wrong while sending OTP",
       error: error.response?.data || error.message,
     });
   }
 };

module.exports = { register, logout, login, genrate_otp,verify_otp,reset_password,mobile_otp,get_user_profile };
