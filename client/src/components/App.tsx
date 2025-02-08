import { useState, useEffect } from 'react'
import "../styles/App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
// import Login_Register from "./Login_Register";
import Filter from "./Filter";
import ResultCard from './ResultCard';
import { TbMoodSad } from "react-icons/tb";
import fetchNearbyCoworkingSpaces from '../api/coworkingSpaces';

interface coworkingResultsObject {
  photo?: string,
  name: string,
  rating?: number,
  totalReviews?: number,
  station: string,
  stationDistance: number
}; 

function App() {

  //States
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<coworkingResultsObject[]>([]);

  //Effects
  useEffect(() => {
    if (searchedCity) {
      fetchNearbyCoworkingSpaces(`coworking_spaces/nearby?location=${searchedCity}`)
        .then(data => setSearchResults(Array.isArray(data) ? data : []))
        .catch(error => console.error('Error fetching data:', error))
    }
  }, [searchedCity])

  return (
    <>
    {/* Search Bar values are set in state from setSearchCity function */}
    <Header setSearchedCity={setSearchedCity} setSelectedAuth={setSelectedAuth}/>
    <Container>
      {/* <Login_Register selectedAuth={selectedAuth}/> */}
      <Row id="mainContainer">
        <Col xs={4}>
          <h3>☆ Ratings</h3>
          <Filter resultsLength={searchResults.length} searchResults={searchResults} setSearchResults={setSearchResults}/>
        </Col>
        <Col xs={5}>
        {/* If no data is set in searchResults state, "no Results" message is displayed to the user */}
        {searchResults.length < 1 ? 
          <div id="noResults">
            <TbMoodSad size={100}/>
            <h3>No Results Found</h3>
          </div> :
          <>
          {/* If data has been set in the search results state, display the data in a card to the user */}
            <h3>Coworking Spaces in {searchedCity}</h3>
            <div className="resultsHeader">
              <i className="bi bi-geo-alt-fill"></i>
              <p>{searchResults.length} Results</p>
            </div>
            {/* Loop over the search results array, passing all the values from the current object to create a new ResultCard component for each object*/}
            <div className="searchResultsContainer">
              {searchResults.length > 0 && searchResults.map((location) => <ResultCard key={location.name} photo={location.photo} title={location.name} rating={location.rating} totalReviews={location.totalReviews} nearestStation={location.station} stationDistance={location.stationDistance}/>)}
          </div>
          </>
          }
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default App
