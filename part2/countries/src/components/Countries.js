import React from "react";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key="country.name.common">
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            {Object.values(country.languages).map((lang) => {
              return <p key={lang}>{lang}</p>;
            })}
            <img src={country.flags.png} alt="" />
          </div>
        ))}
      </div>
    );
  } else {
    return <>Not Found</>;
  }
};

export default Countries;
