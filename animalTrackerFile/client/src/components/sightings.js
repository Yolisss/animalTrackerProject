import { useState, useEffect } from "react";

const Sightings = () => {
  const [sightings, setSightings] = useState([]);

  //get individuals data table
  const getSightings = async () => {
    const response = await fetch(`http://localhost:8080/sightings`);
    const data = await response.json();
    console.log(data);
    setSightings(data);
  };

  useEffect(() => {
    getSightings();
  }, []);

  //initialistate of the form will be empty
  const initialState = {
    id: "",
    nick_name: "",
    sightings_id: "",
    seen_on: "",
  };
  //will show on browser
  return (
    <div>
      <h1>Hello World 2</h1>
    </div>
  );
};

export default Sightings;
