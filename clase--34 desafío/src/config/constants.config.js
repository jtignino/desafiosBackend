import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    privateKey: process.env.PRIVATE_KEY,
    nodemailerPass: process.env.NODEMAILER_PASS,
    twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    smsNumberTo: process.env.SMS_NUMBER_TO,
    nodeEnv: process.env.NODE_ENV
}