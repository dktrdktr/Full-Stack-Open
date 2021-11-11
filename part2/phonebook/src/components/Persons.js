import React from "react";
import Name from "./Name";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Name key={person.name} name={person} />
      ))}
    </ul>
  );
};

export default Persons;
