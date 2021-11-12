import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const CountryView = ({
  country: { name, capital, population, flags, languages },
}) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
    return () => setWeather({});
  }, [capital]);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h2>Languages</h2>
      {Object.values(languages).map((lang) => {
        return <p key={lang}>{lang}</p>;
      })}
      <img src={flags.png} alt="" />
      <h2>{`Weather in ${capital}`}</h2>
      <p>
        <strong>Temperature</strong>: {weather.temperature} celsius
      </p>
      <img src={weather.weather_icons} alt="" />
      <p>
        <strong>Wind</strong>: {weather.wind_speed} km/h direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

export default CountryView;
