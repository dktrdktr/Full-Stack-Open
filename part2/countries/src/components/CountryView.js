import React from "react";

const CountryView = ({ country }) => {
  if (Object.keys(country).length === 0) {
    return <></>;
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        {Object.values(country.languages).map((lang) => {
          return <p key={lang}>{lang}</p>;
        })}
        <img src={country.flags.png} alt="" />
      </div>
    );
  }
};

export default CountryView;
