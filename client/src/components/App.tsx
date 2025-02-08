import { useState, useEffect } from 'react'
import "../styles/App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
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
    <Header setSearchedCity={setSearchedCity}/>
    <Container>
      <Row id="mainContainer">
        <Col xs={4}>
          <h3>☆ Ratings</h3>
          <Filter resultsLength={searchResults.length} searchResults={searchResults} setSearchResults={setSearchResults}/>
        </Col>
        <Col xs={5}>
        {searchResults.length < 1 ? 
          <div id="noResults">
            <TbMoodSad size={100}/>
            <h3>No Results Found</h3>
          </div> :
          <>
            <h3>Coworking Spaces in {searchedCity}</h3>
            <div className="resultsHeader">
              <i className="bi bi-geo-alt-fill"></i>
              <p>{searchResults.length} Results</p>
            </div>
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
