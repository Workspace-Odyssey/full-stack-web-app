import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { starIconColor } from './ResultCard';
import { FaStar } from 'react-icons/fa';
import '../styles/LandingPage.css';
import heroImg01 from '../assets/coworkingBackground.jpg';

type LandingProps = {
  setSearchedCity: React.Dispatch<React.SetStateAction<string>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
};

type CoworkingSpace = {
  uuid: string;
  name: string;
  location: string;
  reviews: Array<{
    username: string;
    rating: number;
    reviewText: string;
  }>;
};

const LandingPage: React.FC<LandingProps> = ({
  setSearchedCity,
  setCurrentView,
}) => {
  const url: string =
    import.meta.env.MODE === 'development' ? 'http://localhost:8080' : '';

  const stars: number[] = [0, 0, 0, 0, 0];

  const starColor: starIconColor = {
    orange: '#F2C265',
    grey: '#a9a9a9',
  };

  const [randomCoworkingSpaces, setRandomCoworkingSpaces] = useState<
    CoworkingSpace[]
  >([]);

  useEffect(() => {
    const fetchRandomCoworkingSpaces = async () => {
      try {
        const response = await axios.get(`${url}/coworking_spaces/random`);
        if (Array.isArray(response.data)) {
          setRandomCoworkingSpaces(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching random coworking spaces:', error);
        if ((error as any).response) {
          console.log('Response:', (error as any).response.data);
        } else {
          console.log('Error:', (error as Error).message);
        }
      }
    };
    fetchRandomCoworkingSpaces();
  }, []);

  return (
    <>
      <Card>
        <Card.Img variant="top" src={heroImg01} className="coworking" />
        <Card.ImgOverlay>
          <div className="allItems">
            <h1 style={{ textAlign: 'left' }}>
              Where would you like to work
              <span className="deskio-green">?</span>
            </h1>
            <Card.Body>
              <Form>
                <Row style={{ marginLeft: '-22px' }}>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search by city"
                      className="mr-sm-2"
                      style={{ width: '32rem', border: '2.5px solid #00eca2' }}
                      onKeyDown={(
                        event: React.KeyboardEvent<HTMLInputElement>
                      ) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          setSearchedCity(
                            (event.target as HTMLInputElement).value
                          );
                          setCurrentView('resultsPage');
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
            <h3 style={{ textAlign: 'left' }}>
              Japan's Largest Co-Working Space Marketplace
              <span className="deskio-green">!</span>
            </h3>
          </div>
        </Card.ImgOverlay>
      </Card>
      <div className="random-coworking-spaces">
        <h2 className="explore-title">Explore Coworking Spaces</h2>
        <Row>
          {randomCoworkingSpaces.map((space) => (
            <Col key={space.uuid} xs={12} md={6} lg={4}>
              <Card className="review-card-outer">
                <Card.Body className="review-card">
                  <Card.Title className="random-space-title">
                    {space.name}
                  </Card.Title>
                  <Card.Text className="random-space-location">
                    {space.location}
                  </Card.Text>
                  <div className="review-card-content">
                    <h5>Reviews</h5>
                    {space.reviews.map((review, index) => (
                      <div className="random-space-details" key={index}>
                        <p className="random-space-username">
                          {review.username}
                        </p>
                        <p className="random-space-text">{review.reviewText}</p>
                        {stars.map((_, index) => (
                          <FaStar
                            key={index}
                            size={18}
                            color={
                              review.rating != undefined &&
                              review.rating > index
                                ? starColor.orange
                                : starColor.grey
                            }
                          />
                        ))}
                      </div>
                    ))}
                  </div>
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
