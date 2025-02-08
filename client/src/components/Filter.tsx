import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../styles/Filter.css";
import { coworkingResultsObject } from './App'

interface filterProps {
  resultsLength: number,
  searchResults: coworkingResultsObject[],
  setSearchResults: React.Dispatch<React.SetStateAction<coworkingResultsObject[]>>
};

const Filter: React.FC<filterProps> = ({ resultsLength, searchResults, setSearchResults }) => {

  const [selectedFilter, setSelectedFilter] = useState<string>();

  useEffect(() => {
    function sortSearchResultsByRating(order:string) {
      const sorted = [...searchResults].sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;

        // Sorting based on the 'order' parameter
        if (order === 'desc') {
          return ratingB - ratingA; 
        } else if (order === 'asc') {
          return ratingA - ratingB;
        } 
        return 0;
      });
      return sorted;
    };

    // Check the selected filter and apply sorting
    if (selectedFilter === 'lowToHigh') {
      setSearchResults(sortSearchResultsByRating('asc'));
    } else if (selectedFilter === 'highToLow') {
      setSearchResults(sortSearchResultsByRating('desc'));
    }  
  }, [selectedFilter])

  return (
    <div className="ratingsFilter w-50 p-3">
      <Form>
        <Form.Check
          name="ratingFilter"
          label="Highest to Lowest"
          type={"radio"}
          id={"highToLow"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
        <Form.Check
          name="ratingFilter"
          label="Lowest to Highest"
          type={"radio"}
          id={"lowToHigh"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
      </Form>
    </div>
  );
}

export default Filter;
