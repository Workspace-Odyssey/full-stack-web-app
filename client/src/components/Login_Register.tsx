import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../styles/Login_Register.css";

interface login_signupProps {
  selectedAuth: string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  previousView: string,
  setCurrentView: React.Dispatch<React.SetStateAction<string>>
  setPreviousView: React.Dispatch<React.SetStateAction<string>>;
}

const Login_SignUp: React.FC<login_signupProps> = ({ selectedAuth, setUser, previousView, setCurrentView, setPreviousView }) => {

  const [validatedInput, setValidatedInput] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>(""); // Separate state for username
  const [emailInput, setEmailInput] = useState<string>(""); // Separate state for email
  const [passwordInput, setPasswordInput] = useState<string>("");   
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>(""); 
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);

  // Handles form input validation on form submit
  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputForm = event.currentTarget;

    // Checks all inputs if the inputs are not empty
    if (inputForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      usernameInput.length < 1 ? setUsernameError(true) : setUsernameError(false);
      emailInput.length < 1 ? setEmailError(true) : setEmailError(false); // Email validation
      passwordInput.length < 1 ? setPasswordError(true) : setPasswordError(false);
      confirmPasswordInput.length < 1 ? setConfirmPasswordError(true) : setConfirmPasswordError(false);
    }
    // Checks if the register password and confirm password inputs are valid
    else if (selectedAuth === "Register" && passwordInput !== confirmPasswordInput) {
      event.preventDefault();
      event.stopPropagation();
      setConfirmPasswordError(true);
      setValidatedInput(false);
    }
    // If all above checks have passed submit form
    else {
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
      setValidatedInput(true);
      setLoading(true);

      try {
        let response;

        if (selectedAuth === 'Register') {
          // Register request - send both username and email
          response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
            username: usernameInput, // Send the username field
            email: emailInput, // Send the email field
            password: passwordInput,
          }, { withCredentials: true });

          alert(response.data.message);
        } else if (selectedAuth === 'Login') {
          // Send either the username or email based on the user input
          const usernameOrEmail = usernameInput || emailInput;
          response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
            usernameEmail: usernameOrEmail, // Send whichever input is filled
            password: passwordInput,
          }, { withCredentials: true })

          alert(response.data.message);

          // If login is successful, set the username
          if (response.data.user) {
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("uuid", response.data.user.uuid);
            setUser(response.data.user.username);
          }

          // Return to the previous view or default to landing page
          setPreviousView('loginPage');
          setCurrentView(previousView || 'landingPage');
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error('Error during request:', error);
        alert(error.response?.data?.message || 'Something went wrong');
      }
    }
  };

  return (
    <div className="authContainer">
      <Card>
        <Card.Body>
          <Card.Title>{selectedAuth}</Card.Title>
          {/* Login/Register Form */}
          <Form noValidate validated={validatedInput} onSubmit={handleAuthSubmit}>
            {/* Username form input */}
            {selectedAuth === 'Register' && (
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  isInvalid={usernameError}
                  onChange={(event) => setUsernameInput(event.currentTarget.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Username is required
                </Form.Control.Feedback>
              </Form.Group>
            )}

            {/* Email form input */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                isInvalid={emailError}
                onChange={(event) => setEmailInput(event.currentTarget.value)}
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password form input */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                isInvalid={passwordError}
                onChange={(event) => setPasswordInput(event.currentTarget.value)}
              />
              <Form.Control.Feedback type="invalid">
                {selectedAuth === "Register" ? "Password Invalid or Doesn't Match" : "Password Invalid"}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm Password input for Register */}
            {selectedAuth === "Register" ? (
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  isInvalid={confirmPasswordError}
                  onChange={(event) => setConfirmPasswordInput(event.currentTarget.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords don't match
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}

            {/* Submit Button */}
            <Button type="submit" className="loginSignUpBtn" disabled={loading}>
              {loading ? "Please Wait" : selectedAuth}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login_SignUp;
