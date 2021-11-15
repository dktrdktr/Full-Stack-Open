import React from "react";
import Name from "./Name";

const Persons = ({ personsToShow, handlePersonDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Name
          key={person.name}
          person={person}
          handlePersonDelete={handlePersonDelete}
        />
      ))}
    </ul>
  );
};

export default Persons;
