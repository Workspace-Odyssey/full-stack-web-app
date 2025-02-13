import { useEffect, useState } from 'react';
import { coworkingResultsObject } from './App';
import {
  reviewsObject,
  fetchReviewsByCoworkingSpaceId,
} from '../api/coworkingSpaceReviews';
import { starIconColor } from './ResultCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  FaCouch,
  FaStar,
  FaWifi,
  FaDollarSign,
  FaHeadphones,
} from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import '../styles/CoworkingSpaceDetails.css';
import Review from './Review';

interface coworkingSpaceDetailsProps {
  currentCoworkingSpace: coworkingResultsObject | undefined;
  searchedCity: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setPreviousView: React.Dispatch<React.SetStateAction<string>>;
  user: string | null;
  previousView: string;
  setCurrentCoworkingSpace: React.Dispatch<
    React.SetStateAction<coworkingResultsObject | undefined>
  >;
}

const CoworkingSpaceDetails: React.FC<coworkingSpaceDetailsProps> = ({
  currentCoworkingSpace,
  searchedCity,
  setCurrentView,
  setPreviousView,
  user,
  previousView,
  setCurrentCoworkingSpace,
}) => {
  const [isReviewsPage, setIsReviewsPage] = useState<boolean>(false);
  const [reviews, setReviews] = useState<reviewsObject[]>([]);

  useEffect(() => {
    // Fetch reviews whenever the coworking space is updated
    if (currentCoworkingSpace && currentCoworkingSpace.id) {
      fetchReviewsByCoworkingSpaceId(`reviews/${currentCoworkingSpace.id}`)
        .then((data) => setReviews(Array.isArray(data) ? data : []))
        .catch((error) => console.error('Error fetching reviews:', error));
    }
  }, [currentCoworkingSpace]);

  // If the previous view was the login page, show the review page
  useEffect(() => {
    if (previousView === 'loginPage') {
      setIsReviewsPage(true);
    }
  }, [previousView]);

  const stars: number[] = [0, 0, 0, 0, 0];

  const starColor: starIconColor = {
    orange: '#F2C265',
    grey: 'a9a9a9',
  };

  // Formatter for the rating to always display 2 decimal places
  const formattedRating = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Update the current coworking space in the parent component
  const updateCoworkingSpace = (updatedSpace: coworkingResultsObject) => {
    setCurrentCoworkingSpace(updatedSpace);
  };

  return (
    <Container>
      {currentCoworkingSpace && (
        <div>
          {/* Allows for easy navigation back to the search results */}
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => setCurrentView('resultsPage')}>
              {searchedCity}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {currentCoworkingSpace.name}
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Display coworking space photo if available*/}
          {currentCoworkingSpace.photo && (
            <Image
              src={currentCoworkingSpace.photo}
              fluid
              rounded
              className="img-fluid" // ensures photo display is responsive
              style={{ maxWidth: '600px', height: 'auto' }}
            />
          )}

          {/* Display coworking space name and address */}
          <h1 className="name">{currentCoworkingSpace.name.trim()}</h1>
          <p className="address">{currentCoworkingSpace.address.trim()}</p>

          {/* If user is on the reviews page, render the review component */}
          {isReviewsPage ? (
            <Review
              currentCoworkingSpace={currentCoworkingSpace}
              setIsReviewsPage={setIsReviewsPage}
              setReviews={setReviews}
              updateCoworkingSpace={updateCoworkingSpace}
            />
          ) : (
            <>
              {/* Show reviews section */}
              <h3>Reviews for {currentCoworkingSpace.name}</h3>

              {/* Render overall rating and star icons if available */}
              {
                currentCoworkingSpace.rating ? (
                  <div className="reviews">
                    <p className="overall-rating">
                      {formattedRating.format(currentCoworkingSpace.rating)}
                    </p>
                    <div className="stars">
                      {/* Map over stars array to display individual star icons */}
                      {stars.map((_, index) => (
                        <FaStar
                          key={index}
                          size={22}
                          color={
                            currentCoworkingSpace.rating != undefined &&
                            currentCoworkingSpace.rating > index
                              ? starColor.orange
                              : starColor.grey
                          }
                        />
                      ))}
                    </div>
                    <p className="total-reviews">
                      ({currentCoworkingSpace.totalReviews} reviews)
                    </p>
                  </div>
                ) : (
                  <p>No reviews</p>
                ) // If no rating, show "No reviews"
              }

              {/* Render button to allow the user to post a review */}
              <p className="post-review">Are you a member?</p>
              <Button
                className="primaryOutline post-review-button"
                onClick={() => {
                  console.log(user);
                  if (user) {
                    setIsReviewsPage(true); // Show reviews page if user is logged in
                  } else {
                    setPreviousView('detailsPage'); // Store the current view (before login)
                    setCurrentView('loginPage');
                  }
                }}
              >
                POST A REVIEW
              </Button>

              {/* Display recent reviews */}
              {reviews.length > 0 && (
                <div className="reviews-container">
                  <h5>Recent Reviews</h5>
                  {/* Map over reviews and display each one */}
                  {reviews.length > 0 &&
                    reviews.map((review) => {
                      console.log(review);

                      const date: string = new Date(
                        review.datePosted
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                      return (
                        <div key={review.username} className="single-review">
                          <div className="user-details">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="user-icon"
                            />
                            {review.username}
                            <div>
                              {/* Map over stars to display the user's rating for the review */}
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
                          </div>
                          <p className="date">{date}</p>
                          <p className="content">{review.reviewText}</p>
                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Details</Accordion.Header>
                              <Accordion.Body>
                                {review.netRating && review.netRating > 0 ? (
                                  <>
                                    <h6>Internet Rating</h6>
                                    <div className="rating">
                                      {stars.map((_, index) => (
                                        <FaWifi
                                          className="rating-icon"
                                          key={index}
                                          size={18}
                                          color={
                                            review.netRating != undefined &&
                                            review.netRating > index
                                              ? starColor.orange
                                              : starColor.grey
                                          }
                                        />
                                      ))}
                                    </div>
                                  </>
                                ) : null}
                                {review.comfortRating &&
                                review.comfortRating > 0 ? (
                                  <>
                                    <h6>Comfort Rating</h6>
                                    <div className="rating">
                                      {stars.map((_, index) => (
                                        <FaCouch
                                          className="rating-icon"
                                          key={index}
                                          size={18}
                                          color={
                                            review.comfortRating != undefined &&
                                            review.comfortRating > index
                                              ? starColor.orange
                                              : starColor.grey
                                          }
                                        />
                                      ))}
                                    </div>
                                  </>
                                ) : null}
                                {review.noiseRating &&
                                review.noiseRating > 0 ? (
                                  <>
                                    <h6>Noise Rating</h6>
                                    <div className="rating">
                                      {stars.map((_, index) => (
                                        <FaHeadphones
                                          className="rating-icon"
                                          key={index}
                                          size={18}
                                          color={
                                            review.noiseRating != undefined &&
                                            review.noiseRating > index
                                              ? starColor.orange
                                              : starColor.grey
                                          }
                                        />
                                      ))}
                                    </div>
                                  </>
                                ) : null}
                                {review.costRating && review.costRating > 0 ? (
                                  <>
                                    <h6>Price Rating</h6>
                                    <div className="rating">
                                      {stars.map((_, index) => (
                                        <FaDollarSign
                                          className="rating-icon"
                                          key={index}
                                          size={18}
                                          color={
                                            review.costRating != undefined &&
                                            review.costRating > index
                                              ? starColor.orange
                                              : starColor.grey
                                          }
                                        />
                                      ))}
                                    </div>
                                  </>
                                ) : null}
                                <h5>Amenities</h5>
                                <div className="amenities">
                                  {review.hasPrivateRooms ? (
                                    <p>
                                      Private rooms:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareCheck}
                                        color="green"
                                      />
                                    </p>
                                  ) : (
                                    <p>
                                      Private rooms:{' '}
                                      <FontAwesomeIcon icon={faSquareXmark} />
                                    </p>
                                  )}
                                  {review.hasCafe ? (
                                    <p>
                                      Cafe:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareCheck}
                                        color="green"
                                      />
                                    </p>
                                  ) : (
                                    <p>
                                      Cafe:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareXmark}
                                        color="red"
                                      />
                                    </p>
                                  )}
                                  {review.hasParking ? (
                                    <p>
                                      Parking:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareCheck}
                                        color="green"
                                      />
                                    </p>
                                  ) : (
                                    <p>
                                      Parking:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareXmark}
                                        color="red"
                                      />
                                    </p>
                                  )}
                                  {review.hasAircon ? (
                                    <p>
                                      Aircon:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareCheck}
                                        color="green"
                                      />
                                    </p>
                                  ) : (
                                    <p>
                                      Aircon:{' '}
                                      <FontAwesomeIcon
                                        icon={faSquareXmark}
                                        color="red"
                                      />
                                    </p>
                                  )}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default CoworkingSpaceDetails;
