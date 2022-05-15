const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const { User } = require('../../../models/Users/otp/userModel');
const { Otp } = require('../../../models/Users/otp/otpModel');
const qs = require('qs');
const dotenv = require('dotenv')
var nodemailer = require('nodemailer');


module.exports.signUp = async (req, res) => {
   

 const sendNewMail=(otp,email)=>{

    let transporter = nodemailer.createTransport({
       host: process.env.HOST,
       port: 587,
       secure: false,
       requireTLS: true,
       auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD
       }
    });
    
    let mailOptions = {
       from: "DEVSTAX",
       to: email,
       subject: 'KYC Verification',
       html : `<div>
       <h1>Your KYC Partners</h1>
       <p>Your KYC is verified successfully <span style="color:red; font-weight:bolder">${OTP}</span></p>
    </div>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error.message);
       }
       console.log('success');
    });
    
 }

    const user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send("User already registered!");
    const OTP = otpGenerator.generate(6, {
        digits: true, alphabets: false, upperCase: false, specialChars: false
    });
    const email = req.body.email;
    console.log(OTP)
    // const send = async () => {
    //     const sms = await axios({
    //         method: 'post',
    //         url: 'http://api.gupshup.io/sms/v1/message/ae82e5fd-021a-41d2-a4b0-bdffc7e2536d#',
    //         data: qs.stringify({
    //             destination: email,
    //           source: 'GSDSMS',
    //           message:`Hi ${OTP}, thanks for opting in to receive SMS updates from GS Digital (Gupshup)!`
    
    //         }),
    
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "api_key":"alburg6dhqtoxe5hil2b3nvmhutntesh",
    //         "Authorization":"alburg6dhqtoxe5hil2b3nvmhutntesh",    
    //     }
    // })
    // }
    // send()
    sendNewMail(OTP,email)
     const otp = new Otp({ email: email, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    return res.status(200).send("Otp send successfully!");
}
module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        email: req.body.email
    });
    if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.email === req.body.email && validUser) {
        const user = new User(_.pick(req.body, ["email"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            email: rightOtpFind.email
        });
        return res.status(200).send({
            message: "User Registration Successfull!",
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
}