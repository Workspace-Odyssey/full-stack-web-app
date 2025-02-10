import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Header.css";

type HeaderProps = {
  setSearchedCity: React.Dispatch<React.SetStateAction<string>>
  setSelectedAuth: React.Dispatch<React.SetStateAction<string>>
  setCurrentView: React.Dispatch<React.SetStateAction<string>>
};

const Header: React.FC<HeaderProps> = ({ setSearchedCity, setSelectedAuth, setCurrentView }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Logo + App Name */}
        <Navbar.Brand href="#home" onClick={() => setCurrentView('landingPage')}>
          <img
            alt=""
            src=""
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Workspace-Odyssey
        </Navbar.Brand>
        {/* Search Bar */}
        <Form>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onKeyDown={
                  (event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      setSearchedCity((event.target as HTMLInputElement).value)
                      setCurrentView('resultsPage')
                    }
                  }
                }
              />
            </Col>
          </Row>
        </Form>
        {/* Auth Buttons */}
        <Row>
          <Col xs="auto">
            <Button id="Login" className="primaryColor" onClick={(event) => {
              setSelectedAuth(event.currentTarget.id);
              setCurrentView('loginPage');
            }}>Login</Button>
          </Col>
          <Col>
            <Button id="Register" className="primaryOutline" onClick={(event) => {
              setSelectedAuth(event.currentTarget.id);
              setCurrentView('loginPage');
            }}>Register</Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
export default Header;
