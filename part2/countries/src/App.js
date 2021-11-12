import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import CountryView from "./components/CountryView";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setShowCountry(
      countriesToShow.length === 1 ? { ...countriesToShow[0] } : {}
    );
  }, [countriesToShow]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
      )
    );
  };

  const renderCountries = () => {
    return (
      <>
        {countriesToShow.map((country) => {
          return (
            <p key={country.name.common}>
              {country.name.common}
              <button onClick={() => setShowCountry(country)}>show</button>
            </p>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <h2>Country Finder</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Countries</h2>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        renderCountries()
      )}
      <CountryView country={showCountry} />
    </div>
  );
};

export default App;
