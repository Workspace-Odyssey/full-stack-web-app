import { useState, useEffect } from 'react'
import "../styles/App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import Login_Register from "./Login_Register";
import Filter from "./Filter";
import ResultCard from './ResultCard';
import CoworkingSpaceDetails from './CoworkingSpaceDetails';
import { FaSadTear } from 'react-icons/fa';
import fetchNearbyCoworkingSpaces from '../api/coworkingSpaces';
import LandingPage from './LandingPage';
import Spinner from 'react-bootstrap/Spinner'; 


// Coworking Result Object Structure
export interface coworkingResultsObject {
  photo?: string,
  name: string,
  rating?: number,
  totalReviews?: number,
  nearestStation: string,
  stationDistance: number,
  id?: string,
  address: string,
}; 

function App() {

  //States variables
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<coworkingResultsObject[]>([]);
  const [selectedAuth, setSelectedAuth] = useState<string>("Login");
  const [currentView, setCurrentView] = useState<string>('landingPage');
  const [previousView, setPreviousView] = useState<string>('');
  const [currentCoworkingSpace, setCurrentCoworkingSpace] = useState<coworkingResultsObject|undefined>(undefined)
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Effect to fetch coworking spaces when searched city is updated
  useEffect(() => {
    if (searchedCity) {
      setLoading(true);
      fetchNearbyCoworkingSpaces(`coworking_spaces/nearby?location=${searchedCity}`)
        .then(data => {
          setSearchResults(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false); 
        })
    }
  }, [searchedCity])

  // Effect to load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  return (
    <>
    {/* Header component that holds the search bar and authentication button */}
    <Header 
      setSearchedCity={setSearchedCity} 
      setSelectedAuth={setSelectedAuth} 
      setCurrentView={setCurrentView} 
      user={user} 
      setUser={setUser}
      setPreviousView={setPreviousView}
      currentView={currentView}
    />
      
      { 
        // Conditional rendering based on current view state:
        currentView === 'landingPage' ? <LandingPage setSearchedCity={setSearchedCity} setCurrentView={setCurrentView}/> :
        
        currentView === 'detailsPage' ? <CoworkingSpaceDetails 
          currentCoworkingSpace={currentCoworkingSpace} 
          searchedCity={searchedCity} 
          setCurrentView={setCurrentView} 
          setPreviousView={setPreviousView} 
          user={user} 
          previousView={previousView} 
          setCurrentCoworkingSpace={setCurrentCoworkingSpace}/> : 
        
        currentView === 'loginPage' ? <Login_Register 
          selectedAuth={selectedAuth} 
          setUser={setUser} 
          previousView={previousView} 
          setCurrentView={setCurrentView} 
          setPreviousView={setPreviousView}/> : 

        // Main results page when current view is not 'landingPage', 'detailsPage', or 'loginPage'
        (
          <Container>
            <Row id="mainContainer">
              <Col xs={4}>
                <h3>☆ Ratings</h3>
                <Filter resultsLength={searchResults.length} searchResults={searchResults} setSearchResults={setSearchResults}/>
              </Col>
              <Col xs={7}>
                {loading ? (  // Show loading spinner if data is being fetched
                  <div id="loadingContainer">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading...</p>
                  </div>
                ) : searchResults.length < 1 ? ( // If no results, show "No Results Found" message
                  <div id="noResults">
                    <FaSadTear size={100}/>
                    <h3>No Results Found</h3>
                  </div> 
                ) : ( // If results are available, display them
                  <>
                    <h3>Coworking Spaces in {searchedCity}</h3>
                    <div className="resultsHeader">
                      <i className="bi bi-geo-alt-fill"></i>
                      <p>{searchResults.length} Results</p>
                    </div>
                    {/* Loop over the search results array, passing all the values from the current object to create a new ResultCard component for each object*/}
                    <div className="searchResultsContainer">
                      {searchResults.length > 0 && searchResults.map((location) => {
                        return <ResultCard 
                          key={location.name} 
                          photo={location.photo} 
                          name={location.name} 
                          rating={location.rating} 
                          totalReviews={location.totalReviews} 
                          nearestStation={location.nearestStation} 
                          stationDistance={location.stationDistance}
                          id={location.id} 
                          address={location.address}
                          setCurrentView={setCurrentView} 
                          setCurrentCoworkingSpace={setCurrentCoworkingSpace}/>
                      })}
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        )
      }
    </>
  )
}

export default App
