import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styles/LandingPage.css';

type LandingProps = {
  setSearchedCity: React.Dispatch<React.SetStateAction<string>>
}

const LandingPage: React.FC<LandingProps> = ({setSearchedCity}) => {
    return (<>
    <Card>
      <Card.Img variant="top" src="/src/assets/coworkingBackground.jpg" className="coworking"/>
      <Card.ImgOverlay>
        <div className="allItems">
         <h1>Where would you like to work?</h1>
         <Card.Body>
           <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search by city"
                  className="mr-sm-2"
                  style={{width: '32rem'}}
                  // The same approach as in Header.tsx
                  onKeyDown={
                    (event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        setSearchedCity((event.target as HTMLInputElement).value)
                      }
                    }
                  }
                />
              </Col>
            </Row>
           </Form>
          </Card.Body>
           <h3>The Code Chrysalis's Largest Coworking Space Marketplace</h3>
        </div>
      </Card.ImgOverlay>
    </Card>
   </>  
    );
};
export default LandingPage;