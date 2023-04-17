import "dotenv/config.js";

const ENV = {
  MONGOURL: process.env.MONGOURL,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  ROUTE: process.env.ROUTE,
  NODEMAILER_MAIL: process.env.NODEMAILER_MAIL,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  TWILIO_AUTHTOKEN: process.env.TWILIO_AUTHTOKEN,
  TWILIO_ACCOUNTSID: process.env.TWILIO_ACCOUNTSID,
  MODE: process.env.MODE
  
};

export default ENV;