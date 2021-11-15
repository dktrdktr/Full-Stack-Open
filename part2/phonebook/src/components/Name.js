import React from "react";
// import personService from "../services/names";

const Name = ({ person, handlePersonDelete }) => {
  const handleDelete = (e) => {
    handlePersonDelete(parseInt(e.target.value));
  };

  return (
    <li>
      {person.name} {person.number}{" "}
      <button value={person.id} onClick={handleDelete}>
        delete
      </button>
    </li>
  );
};

export default Name;
