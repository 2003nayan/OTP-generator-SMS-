const express = require("express"); // Imports Express.js as a variable "express"
const app = express(); // Creates an instance `app` variable is an Express application object
const cors = require("cors"); // Imports the CORS (Cross-Origin Resource Sharing), & it is used for cross-origin requests

app.use(express.json()); // A tool that helps your server understand and work with JSON data.
app.use(cors()); // It allows cross-origin requests from any origin.
require("dotenv").config(); // Loads environment variables from .env file

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}); // The set of code you provided is configuring middleware in an Express.js application to handle Cross-Origin Resource Sharing (CORS). CORS is a security feature implemented by web browsers that restricts webpages from making requests to a different domain than the one that served the original webpage.

const { Vonage } = require("@vonage/server-sdk"); // Used to interact with Vonage API

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
}); // Environment variables obtained from .env file

const from = "Vonage APIs"; // Sender name

async function sendSMS(phoneNumber, otp) {
  const to = `91${phoneNumber}`;
  const text = `OTP is ${otp}`;
  try {
    await vonage.sms.send({ to, from, text });
    console.log("Message sent successfully");
  } catch (err) {
    console.log("There was an error sending the messages.");
    console.error(err);
  }
} // Self-explanatory stuff

app.post("/send-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Assuming phoneNumber and otp are present in the request body
  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .json({ error: "Invalid request. Missing phoneNumber or otp." });
  } // If phoneNumber & otp are missing, return with error code 400. 

  sendSMS(phoneNumber, otp); // Calling sendSMS function with parameters = phoneNumber & otp

  // Respond with a success message
  res.status(200).json({ success: true, message: "OTP sent successfully." }); // Return with code 200 as successful. 
});

app.listen(5000, () => console.log("Server Started at port 5000"));
