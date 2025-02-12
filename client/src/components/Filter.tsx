import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../styles/Filter.css";
import { coworkingResultsObject } from "./App";

interface filterProps {
  resultsLength: number;
  searchResults: coworkingResultsObject[]; // returns an array populated with the results of the coworking space
  setSearchResults: React.Dispatch<
    React.SetStateAction<coworkingResultsObject[]>
  >;
}

const Filter: React.FC<filterProps> = ({
  resultsLength,
  searchResults,
  setSearchResults,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>();

  useEffect(() => {
    function sortSearchResultsByRating(order: string) {
      // sorts list by rating
      const sorted = [...searchResults].sort((a, b) => {
        const ratingA = a.rating || 0;
        console.log(ratingA);
        const ratingB = b.rating || 0;

        // Sorting based on the 'order' parameter
        if (order === "desc") {
          return ratingB - ratingA;
        } else if (order === "asc") {
          return ratingA - ratingB;
        }
        return 0;
      });
      return sorted;
    }

    function sortSearchResultsByDistance(order: string) {
      // sorts list by distance from station
      const sorted = [...searchResults].sort((a, b) => {
        const distanceA = a.stationDistance || 0;
        const distanceB = b.stationDistance || 0;

        if (order === "closestToStation") {
          console.log(`Sorting by distance - closest...`);
          return distanceA - distanceB; // closest first
        } else if (order === "farthestFromStation") {
          console.log(`Sorting by distance - farthest...`);
          return distanceB - distanceA; // farthest first
        }
        return 0;
      });
      return sorted;
    }

    function sortSearchResultsByQuantity(order: string) {
      // sorts results by number of ratings total
      const sorted = [...searchResults].sort((a, b)  => {
        const quantityA = a.totalReviews || 0;
        const quantityB = b.totalReviews || 0;

        if (order === "mostRated") {
          console.log(`Sorting by most number of ratings...`)
          return quantityB - quantityA
        }
        return 0;
      });
      return sorted;
    }

    // Check the selected filter and apply sorting

    switch (true) {
      case selectedFilter === "lowToHigh":
        setSearchResults(sortSearchResultsByRating("asc")); // sorts 'ratings' search results highest to lowest
        break;
      case selectedFilter === "highToLow":
        setSearchResults(sortSearchResultsByRating("desc")); // sorts 'ratings' search results lowest to highest
        break;
      case selectedFilter === "closestToStation":
        setSearchResults(sortSearchResultsByDistance("closestToStation")); // sorts 'distance' search results closest to furthest
        break;
      case selectedFilter === "farthestFromStation":
        setSearchResults(sortSearchResultsByDistance("farthestFromStation")); // sorts 'distance' search results farthest to closest
        break;
      case selectedFilter === "mostRated":
        setSearchResults(sortSearchResultsByQuantity('mostRated'));
        break;
    }
  }, [selectedFilter]);

  return (
    <div className="ratingsFilter w-50 p-3">
      <Form name="sortRadioList">
        <Form.Check
          name="sortFilter"
          label="Highest Rated"
          type={"radio"}
          id={"highToLow"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
        <Form.Check
          name="sortFilter"
          label="Lowest Rated"
          type={"radio"}
          id={"lowToHigh"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
        <Form.Check
          name="sortFilter"
          label="Closest to Station"
          type={"radio"}
          id={"closestToStation"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
        <Form.Check
          name="sortFilter"
          label="Furthest from Station"
          type={"radio"}
          id={"farthestFromStation"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
        <Form.Check
          name="sortFilter"
          label="Most Rated"
          type={"radio"}
          id={"mostRated"}
          className="filter-radio"
          disabled={resultsLength < 1 ? true : false}
          onChange={(event) => setSelectedFilter(event.target.id)}
        />
      </Form>
    </div>
  );
};

export default Filter;
