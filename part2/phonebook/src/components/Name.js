import React from "react";

const Name = ({ person, handlePersonDelete }) => {
  const handleDelete = (e) => {
    handlePersonDelete(person);
  };

  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

export default Name;
