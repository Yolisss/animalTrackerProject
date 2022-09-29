import { useState, useEffect } from "react";

const Individuals = () => {
  const [individuals, setIndividuals] = useState([]);

  //get individuals data table
  const getIndividuals = async () => {
    const response = await fetch(`http://localhost:8080/individuals`);
    const data = await response.json();
    console.log(data);
    setIndividuals(data);
  };

  useEffect(() => {
    getIndividuals();
  }, []);

  //initialistate of the form will be empty
  const initialState = {
    id: "",
    nick_name: "",
    individuals_id: "",
    seen_on: "",
  };
  //will show on browser
  return (
    <div>
      <h1>Hello World 3</h1>
    </div>
  );
};

export default Individuals;
