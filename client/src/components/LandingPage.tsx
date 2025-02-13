import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import '../styles/LandingPage.css';

type LandingProps = {
  setSearchedCity: React.Dispatch<React.SetStateAction<string>>
  setCurrentView: React.Dispatch<React.SetStateAction<string>>
}

type CoworkingSpace = {
  uuid: string;
  name: string;
  location: string;
  reviews: Array<{
    username: string;
    rating: number;
    reviewText: string;
  }>;
}

const LandingPage: React.FC<LandingProps> = ({ setSearchedCity, setCurrentView }) => {
  const [randomCoworkingSpaces, setRandomCoworkingSpaces] = useState<CoworkingSpace[]>([]);

  useEffect(() => {
    const fetchRandomCoworkingSpaces = async () => {
      try {
        const response = await axios.get('/coworking_spaces/random');
        if (Array.isArray(response.data)) {
          setRandomCoworkingSpaces(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching random coworking spaces:', error);
        console.log('Response:', error.response);
      }
    };

    fetchRandomCoworkingSpaces();
  }, []);

  return (
    <>
      <Card>
        <Card.Img variant="top" src="/src/assets/coworkingBackground.jpg" className="coworking" />
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
                      style={{ width: '32rem' }}
                      onKeyDown={
                        (event: React.KeyboardEvent<HTMLInputElement>) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            setSearchedCity((event.target as HTMLInputElement).value)
                            setCurrentView('resultsPage');
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
      <div className="random-coworking-spaces">
        <h2>Explore Coworking Spaces</h2>
        <Row>
          {randomCoworkingSpaces.map(space => (
            <Col key={space.uuid} xs={12} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{space.name}</Card.Title>
                  <Card.Text>{space.location}</Card.Text>
                  <h5>Reviews:</h5>
                  {space.reviews.map((review, index) => (
                    <div key={index}>
                      <p><strong>{review.username}</strong>: {review.reviewText}</p>
                      <p>Rating: {review.rating}</p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default LandingPage;