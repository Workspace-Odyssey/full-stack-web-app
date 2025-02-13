import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../assets/DESKio_Logo.png';
import '../styles/Header.css';

type HeaderProps = {
  setSearchedCity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedAuth: React.Dispatch<React.SetStateAction<string>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setPreviousView: React.Dispatch<React.SetStateAction<string>>;
  currentView: string;
};

const Header: React.FC<HeaderProps> = ({
  setSearchedCity,
  setSelectedAuth,
  setCurrentView,
  user,
  setUser,
  setPreviousView,
  currentView,
}) => {
  // Handles user logout by clearing localStorage and resetting user state
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser('');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Logo + App Name */}
        <Navbar.Brand
          className="brand-title"
          href="#home"
          onClick={() => setCurrentView('landingPage')}
        >
          <img
            alt="img"
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top graphic"
          />
          DESKio
        </Navbar.Brand>
        {/* Search Bar */}
        <Form>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    setSearchedCity((event.target as HTMLInputElement).value);
                    setCurrentView('resultsPage');
                  }
                }}
              />
            </Col>
          </Row>
        </Form>

        {/* Auth Buttons or User Greeting */}
        <Row>
          <Col className="logged-in" xs="auto">
            {user ? (
              // Display username and a Logout button if logged in
              <>
                <span className="user-callout">Hi, {user}!</span>
                <Button className="primaryColor" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              // Show Login button if not logged in
              <Button
                id="Login"
                className="primaryColor"
                onClick={(event) => {
                  setSelectedAuth(event.currentTarget.id);
                  setPreviousView(currentView);
                  setCurrentView('loginPage');
                }}
              >
                Login
              </Button>
            )}
          </Col>
          <Col>
            {!user && (
              // Show Register button if user is not logged in
              <Button
                id="Register"
                className="primaryOutline"
                onClick={(event) => {
                  setSelectedAuth(event.currentTarget.id);
                  setPreviousView(currentView);
                  setCurrentView('loginPage');
                }}
              >
                Register
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};
export default Header;
