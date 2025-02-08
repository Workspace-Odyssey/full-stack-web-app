import { useState } from 'react';
import { coworkingResultsObject } from './App'
import { reviewsObject, fetchReviewsByCoworkingSpaceId } from '../api/coworkingSpaceReviews';
import { starIconColor } from './ResultCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FaStar } from "react-icons/fa";
import Image from 'react-bootstrap/Image';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from "react-bootstrap/Button";
import "../styles/CoworkingSpaceDetails.css";

interface coworkingSpaceDetailsProps {
    currentCoworkingSpace: coworkingResultsObject|undefined,
    searchedCity: string,
    setCurrentView: React.Dispatch<React.SetStateAction<string>>
};

const CoworkingSpaceDetails:React.FC<coworkingSpaceDetailsProps> = ({ currentCoworkingSpace, searchedCity, setCurrentView }) => {

  const [reviews, setReviews] = useState<reviewsObject[]>([]);
    
  const stars: number[] = [0, 0, 0, 0, 0];

  const starColor: starIconColor = {
    orange: "#F2C265",
    grey: "a9a9a9"
  };

  const formattedRating = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  if (currentCoworkingSpace && currentCoworkingSpace.id) {
    fetchReviewsByCoworkingSpaceId (`reviews/${currentCoworkingSpace.id}`)
        .then(data => setReviews(Array.isArray(data) ? data : []))
        .catch(error => console.error('Error fetching reviews:', error))
  }

  return (
    <>
        { currentCoworkingSpace && (
            <div>
                {/* Allows for easy navigation back to the search results list */}
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => setCurrentView('results')}>{searchedCity}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{currentCoworkingSpace.name}</Breadcrumb.Item>
                </Breadcrumb>
                {currentCoworkingSpace.photo && <Image src={currentCoworkingSpace.photo} fluid rounded />}
                <h1 className='name'>{currentCoworkingSpace.name.trim()}</h1>
                <p className='address'>{currentCoworkingSpace.address.trim()}</p>
                <h3>Reviews for {currentCoworkingSpace.name}</h3>

                {/* Displays overall rating and number of reviews if available */}
                {currentCoworkingSpace.rating ?  
                    (<div className='reviews'> 
                        <p className='overall-rating'>{formattedRating.format(currentCoworkingSpace.rating)}</p>
                        <div className='stars'>
                            {stars.map((_, index) => (
                                <FaStar
                                key={index}
                                size={22}
                                color={currentCoworkingSpace.rating != undefined && currentCoworkingSpace.rating > index ? starColor.orange : starColor.grey}
                                />
                            ))}
                        </div>
                        <p className='total-reviews'>({currentCoworkingSpace.totalReviews} reviews)</p>
                    </div>)
                    : <p>No reviews</p>
                }

                <p className='post-review'>Are you a member?</p>
                <Button className="primaryOutline" >POST A REVIEW</Button>

                {/* Displays each review in detail */}
                <div className='reviews-container'>
                    <h5>Recent Reviews</h5>
                    {reviews.length > 0 && reviews.map(review => {
                        const date:string = new Date(review.datePosted).toLocaleDateString('en-US', {
                            year:'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        return (
                            <div key={review.username} className='single-review'> 
                                <div className='user-details'>
                                    <FontAwesomeIcon icon={faUser} className='user-icon'/>
                                    {review.username}
                                    <div>
                                        {stars.map((_, index) => (
                                            <FaStar
                                            key={index}
                                            size={18}
                                            color={review.rating != undefined && review.rating > index ? starColor.orange : starColor.grey}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='date'>{date}</p>
                                <p className='content'>{review.reviewText}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        )}
    </>
  )
}

export default CoworkingSpaceDetails
