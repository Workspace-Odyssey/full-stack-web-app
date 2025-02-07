import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../styles/Filter.css";


interface filterProps {
  resultsLength: number 
};
const Filter: React.FC<filterProps> = ({ resultsLength }) => {

  const [selectedFilter, setSelectedFilter] = useState<string>();

  //added this block for now to run build
  useEffect(() => {
    console.log(selectedFilter);
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
