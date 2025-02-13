import { useState, useEffect } from 'react';
import '../styles/ResultCard.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import { FaTrain } from 'react-icons/fa';
import fetchPhotoByPhotoReference from '../api/coworkingPhoto';
import axios from 'axios';
import { AxiosError } from 'axios';
import { coworkingResultsObject } from './App';

interface ResultCardProps {
  photo?: string;
  name: string;
  rating?: number;
  totalReviews?: number;
  nearestStation: string;
  stationDistance: number;
  id?: string;
  address: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setCurrentCoworkingSpace: React.Dispatch<
    React.SetStateAction<coworkingResultsObject | undefined>
  >;
}

export interface starIconColor {
  orange: string;
  grey: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  photo,
  name,
  rating,
  totalReviews,
  nearestStation,
  stationDistance,
  id,
  address,
  setCurrentView,
  setCurrentCoworkingSpace,
}) => {
  // Array needed to loop through for correct stars amount.
  const stars: number[] = [0, 0, 0, 0, 0];

  // Colors to use for stars Icon
  const starColor: starIconColor = {
    orange: '#F2C265',
    grey: 'a9a9a9',
  };

  //States
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  //Effects
  useEffect(() => {
    if (photo) {
      fetchPhotoByPhotoReference(
        `coworking_spaces/photo?photo_reference=${photo}`
      )
        .then((url: string) => setPhotoUrl(url))
        .catch((error: AxiosError) =>
          console.error(
            'Error fetching photo: ',
            error.response?.data || error.message
          )
        );
    }
  }, [photo]);

  return (
    <Card className="cardContainer">
      <Row>
        <Col>
          {/* Coworking space Image */}
          <Card.Img id="cardThumbnail" variant="top" src={photoUrl} />
        </Col>
        <Col>
          {/* Card Body for all content */}
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <div className="cardContent">
              {/* Correctly display and shade the star icon based on the rating passed in */}
              {stars.map((_, index) => (
                <FaStar
                  key={index}
                  size={24}
                  color={
                    rating != undefined && rating > index
                      ? starColor.orange
                      : starColor.grey
                  }
                />
              ))}
              {/* Display the total reviews the coworking space has */}
              <Card.Text>{`(${
                totalReviews == undefined ? 0 : totalReviews
              })`}</Card.Text>
            </div>
            <div className="cardContent">
              <div id="trainIcon">
                <FaTrain />
              </div>
              {/* Display the station info for the passed in station*/}
              <Card.Text>
                {nearestStation} {stationDistance} m
              </Card.Text>
            </div>
          </Card.Body>
          <Button
            className="cardViewBtn primaryColor"
            onClick={async () => {
              setCurrentView('detailsPage');

              setCurrentCoworkingSpace({
                photo: photoUrl,
                name,
                rating,
                totalReviews,
                nearestStation,
                stationDistance,
                id,
                address,
              });
            }}
          >
            View
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ResultCard;
