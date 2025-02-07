import { useState, useEffect } from 'react';
import "../styles/ResultCard.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import { FaTrain } from "react-icons/fa";
import fetchPhotoByPhotoReference from '../api/coworkingPhoto';
import { AxiosError } from 'axios';

interface ResultCardProps {
  photo?: string,
  title: string,
  rating?: number,
  totalReviews?: number,
  nearestStation: string,
  stationDistance: number
};

interface starIconColor {
  orange: string;
  grey: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  photo,
  title,
  rating,
  totalReviews,
  nearestStation,
  stationDistance,
}) => {
  const stars: number[] = [0, 0, 0, 0, 0];

  const starColor: starIconColor = {
    orange: "#F2C265",
    grey: "a9a9a9"
  };

  //States
  const [photoUrl, setPhotoUrl] = useState<string|undefined>(undefined);

  //Effects
  useEffect(() => {
    if (photo) {
      fetchPhotoByPhotoReference(`coworking_spaces/photo?photo_reference=${photo}`)
        .then((url:string) => setPhotoUrl(url))
        .catch((error: AxiosError) => console.error('Error fetching photo: ', error.response?.data || error.message));
    }
  }, [photo]);

  return (
    <Card className="cardContainer">
      <Row>
        <Col>
          <Card.Img id="cardThumbnail" variant="top" src={photoUrl} />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <div className="cardContent">
              {stars.map((_, index) => (
                <FaStar
                  key={index}
                  size={24}
                  color={rating != undefined && rating > index ? starColor.orange : starColor.grey}
                />
              ))}
              <Card.Text>{`(${
                totalReviews == undefined ? 0 : totalReviews
              })`}</Card.Text>
            </div>
            <div className="cardContent">
              <div id="trainIcon">
                <FaTrain />
              </div>
              <Card.Text>
                {nearestStation} {stationDistance} m
              </Card.Text>
            </div>
          </Card.Body>
          <Button className="cardViewBtn primaryColor">View</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ResultCard;
