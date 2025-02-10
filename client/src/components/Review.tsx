import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import "../styles/Review.css";
import { submitReview } from '../api/coworkingSpaceReviews'
import { coworkingResultsObject } from './App'

interface reviewProps {
    currentCoworkingSpace: coworkingResultsObject|undefined,
};

const Review: React.FC<reviewProps> = ({ currentCoworkingSpace }) => {

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const starColor = "#F2C265";
  const starColorEmpty = "a9a9a9";

  // Function to handle clicking a star to select the rating
  const handleStarClick = (index: number) => {
    setRating(index + 1);  // index starts from 0, so +1 to match star count (1-5)
  };

  // Function to submit the review to the back-end
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }

    try {
      await submitReview(`/reviews/submit/${currentCoworkingSpace?.id}`, {
        username: '',
        datePosted: new Date().toISOString(),
        reviewText,
        rating,
      });
      setErrorMessage("");
      setRating(0);
      setReviewText("");
    } catch (error) {
      setErrorMessage("");
      console.error('Error submitting review:', error);
    }
  };
  
  return (
    <div>
      <h3>Post Your Review</h3>
      <Form onSubmit={handleSubmit}>
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className='subheading'>Add a written review</Form.Label>
            <Form.Control 
                as="textarea" 
                rows={3} 
                value={reviewText} 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value)}/>
        </Form.Group>

        <Button id="submit-post" className="primaryColor" type="submit">
            Submit
        </Button>
      </Form>
    </div>
  );

}

export default Review
