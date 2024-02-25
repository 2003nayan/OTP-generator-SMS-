const express = require("express");
const app = express();
const { Vonage } = require("@vonage/server-sdk");
const crypto = require("crypto");

app.use(express.json());

const vonage = new Vonage({
  apiKey: "dc86788a",
  apiSecret: "nJyL3iO4YCAGzNDl",
});

app.post("/send-otp", async (req, res) => {
  const to = req.body.phoneNumber;
  const from = "Vonage APIs";

  // Generate a secure OTP (using crypto library for illustration)
  const otp = crypto.randomInt(100000, 999999).toString().padStart(6, "0");

  const text = `Your OTP is: ${otp}`;

  try {
    await vonage.sms.send({ to, from, text });
    console.log("Message sent successfully");
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.log("There was an error sending the messages.");
    console.error(err);
    res.status(500).json({ error: "Error sending OTP" });
  }
});

app.listen(5000, () => console.log("Listening on port 5000"));
