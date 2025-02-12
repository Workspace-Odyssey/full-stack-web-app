import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import "../styles/Review.css";
import { submitReview } from '../api/coworkingSpaceReviews'
import { coworkingResultsObject } from './App'
import { reviewsObject, fetchReviewsByCoworkingSpaceId } from '../api/coworkingSpaceReviews';


interface reviewProps {
    currentCoworkingSpace: coworkingResultsObject|undefined,
    setIsReviewsPage: React.Dispatch<React.SetStateAction<boolean>>,
    setReviews: React.Dispatch<React.SetStateAction<reviewsObject[]>>,
    updateCoworkingSpace: (updatedSpace: coworkingResultsObject) => void;
};

const Review: React.FC<reviewProps> = ({ currentCoworkingSpace, setIsReviewsPage, setReviews, updateCoworkingSpace }) => {

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const starColor = "#F2C265";
  const starColorEmpty = "a9a9a9";

  // Function to handle clicking a star to select the rating
  const handleStarClick = (index: number) => {
    setRating(index + 1);  // arrays are 0 indexed, this adds 1 to the rating to match star count
  };

  // handles submitting the review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { // user must select 1 star minimum to submit their rating
      setErrorMessage("Please select a rating.");
      return;
    }

    try {
      // submits the review via the reviews api
      await submitReview(`/reviews/submit/${currentCoworkingSpace?.id}`, {
        username: '',
        datePosted: new Date().toISOString(),
        reviewText,
        rating,
      });

      // Reset error and review input fields, and show success message
      setErrorMessage("");
      setRating(0);
      setReviewText("");
      setSuccessMessage('Thank you for your review!')

      // Fetch reviews again after submission
      if (currentCoworkingSpace?.id) {
        fetchReviewsByCoworkingSpaceId(`reviews/${currentCoworkingSpace.id}`)
          .then((data) => {
            setReviews(Array.isArray(data) ? data : []);  // Update reviews after submission
            const updatedCoworkingSpace = {
              ...currentCoworkingSpace,
              totalReviews: data.length,  // Update the totalReviews field
              rating: data.reduce((sum, review) => sum + review.rating, 0) / data.length,  // Recalculate the average rating
            };
            // Update the coworking space data
            updateCoworkingSpace(updatedCoworkingSpace); 
          })
          .catch((error) => console.error('Error fetching reviews:', error));
      }

    } catch (error) {
      setErrorMessage("");
      console.error('Error submitting review:', error);
    }
  };
  
  return (
    // If review submission is successful, show success message and a "Back" button
    successMessage !== '' ? 
      <>
        <h3 id='thank-you'>{successMessage}</h3>
        <Button id="back" className="primaryColor" type="button" onClick={() => setIsReviewsPage(false)}>
          Back
        </Button>
      </>
    : (
      // If review hasn't been submitted yet, display the review form
      <div>
        <h3>Post Your Review</h3>
        <Form onSubmit={handleSubmit}>

          {/* Rating input section */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='subheading'>Overall Rating</Form.Label>
              <div className="star-rating">
                  {/* Display the stars */}
                  {[...Array(5)].map((_, index) => (
                      <FaStar
                          key={index}
                          size={24} 
                          color={rating > index ? starColor : starColorEmpty}  // Color based on selection
                          onClick={() => handleStarClick(index)}  // Set rating when clicked
                          style={{ cursor: "pointer" }}  // Add pointer cursor to indicate it's clickable
                      />
              ))}
              </div>
              {/* Display error message if no rating is selected */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
          </Form.Group>

          {/* Review text input section */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='subheading'>Add a written review</Form.Label>
              <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={reviewText} 
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value)}/>
          </Form.Group>
          
          {/* Submit button for submitting the review */}
          <Button id="submit-post" className="primaryColor" type="submit">
              Submit
          </Button>
        </Form>
      </div>
    )
  );

}

export default Review
