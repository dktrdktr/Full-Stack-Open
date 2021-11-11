import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const countriesToShow = countries.filter((x) =>
    x.name.common.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      {console.log("render")}
      <h2>Country Finder</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Countries</h2>
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
