const express = require("express");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
var email;
var new_Otp;

// body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//static folder
app.use("/public", express.static(path.join(__dirname, "public")));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "caiphus305@gmail.com",
    pass: "wufnxcbfslohmrtv",
  },
});

app.get("/", function () {
  console.log("OTP Server running successfuly");
});

generateOtp = () => {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);

  return otp;
};

setInterval(function () {
  new_Otp = generateOtp();
}, 10000);



app.post("/send", function (req, res) {
  email = req.body.email;

  // send mail with defined transport object
  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      new_Otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("otp");
  });
});


app.post("/send", function (req, res) {
    email = req.body.email;
  
    // send mail with defined transport object
    var mailOptions = {
      to: req.body.email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        new_Otp +
        "</h1>", // html body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });


  app.post("/sendEmail", function (req, res) {
    email = req.body.email;
  
    // send mail with defined transport object
    var mailOptions = {
      to: req.body.email, // Recepient Email go here 
      subject: "Otp for registration is: ", // Email subject go here
      html:  //Email body under Html make use Html template 
        "<h3>OTP for account verification is </h3>" +    
        "<h1 style='font-weight:bold;'>" +
        new_Otp +
        "</h1>", // html body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });

app.post("/verify", function (req, res) {
  if (req.body.otp == new_Otp) {
    res.send({ msg: "You has been successfully registered"});
  } else {
    res.json( { msg: "otp is incorrect" });
  }
});

app.post("/resend", function (req, res) {
  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      new_Otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.render("otp", { msg: "otp has been sent" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});
