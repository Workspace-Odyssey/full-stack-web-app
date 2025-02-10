import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Login_Register.css";

interface login_signupProps {
  selectedAuth: string;
}

const Login_SignUp: React.FC<login_signupProps> = ({ selectedAuth }) => {

    const [validatedInput, setvalidatedInput] = useState<boolean>(false);
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");   
    const [confirmPasswordInput, setconfirmPasswordInput] = useState<string>(""); 
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(false);

    // Handles form input validation on form submit
    const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        const inputForm = event.currentTarget;

        // Checks all inputs if the inputs are not empty
        if (inputForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            usernameInput.length < 1 ? setUsernameError(true) : setUsernameError(false);
            passwordInput.length < 1 ? setPasswordError(true) : setPasswordError(false);
            confirmPasswordInput.length < 1 ? setConfirmPasswordError(true) : setConfirmPasswordError(false);
          }
          // Checks if the register password and confirm password inputs are valid 
          else if (selectedAuth === "Register" && passwordInput != confirmPasswordInput) {
          event.preventDefault();
          event.stopPropagation();
          setConfirmPasswordError(true);
          setvalidatedInput(false);
        }
        // If all above checks have passed submit form
        else {
          setUsernameError(false);
          setPasswordError(false);
          setConfirmPasswordError(false);
          setvalidatedInput(true);
          setLoading(true);
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
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" placeholder="Username" 
                isInvalid={usernameError}
                onChange={(event) => setUsernameInput(event.currentTarget.value)}
              />
              <Form.Control.Feedback type="invalid">
                Username Invalid
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password form input */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" 
                isInvalid={passwordError}
                onChange={(event) => setPasswordInput(event.currentTarget.value)}
                 />
              <Form.Control.Feedback type="invalid">
                {selectedAuth === "Register" ? "Password Invalid or Doesn't Match" : "Password Invalid"}
               </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm Password input */}
            {selectedAuth === "Register" ? (
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type="password" placeholder="Confirm Password"
                  isInvalid={confirmPasswordError}
                  onChange={(event) => setconfirmPasswordInput(event.currentTarget.value)}
                  />
                <Form.Control.Feedback type="invalid">
                Passwords Don't Match
               </Form.Control.Feedback>
              </Form.Group>
            ) : null}
            {/* Submit Button */}
            <Button type="submit" className="loginSignUpBtn"
            disabled={loading}
            >{loading ? "Please Wait" : selectedAuth}</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login_SignUp;
