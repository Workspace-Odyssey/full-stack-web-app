import "../styles/ResultCard.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import { FaTrain } from "react-icons/fa";

interface ResultCardProps {
  photo: string,
  title: string,
  rating: number,
  totalReviews: number,
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
  
  // Array needed to loop through for correct stars amount.
  const stars: number[] = [0, 0, 0, 0, 0];

  // Colors to use for stars Icon
  const starColor: starIconColor = {
    orange: "#F2C265",
    grey: "a9a9a9"
  };

  return (
    <Card className="cardContainer">
      <Row>
        <Col>
        {/* Coworking space Image */}
          <Card.Img id="cardThumbnail" variant="top" src={photo} />
        </Col>
        <Col>
        {/* Card Body for all content */}
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <div className="cardContent">
              {/* Correctly display and shade the star icon based on the rating passed in */}
              {stars.map((_, index) => (
                <FaStar
                  key={index}
                  size={24}
                  color={rating > index ? starColor.orange : starColor.grey}
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
          <Button className="cardViewBtn primaryColor">View</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ResultCard;
