import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const otp = generateOtp();

    try {
      // Make a POST request to your backend API
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (response.ok) {
        alert(`OTP sent successfully to: ${phoneNumber}`); // Use formatted number
      } else {
        const data = await response.json();
        setErrorMessage(
          data.error || "Error sending OTP. Please try again later."
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Error sending OTP. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <Title>OTP Generator</Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            Enter your phone number:
            <br />
            <br />
            <Input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="e.g., 123-456-7890"
              maxLength="10"
              required
              disabled={isSubmitting}
            />
          </Label>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </SubmitButton>
        </Form>
      </FormContainer>
    </AppContainer>
  );
}

export default App;
/************************************************************************************ */
/************************************************************************************ */
/************************************************************************************ */
/************************************************************************************ */
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #3498db, #8e44ad);
  color: black;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  padding: 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;
