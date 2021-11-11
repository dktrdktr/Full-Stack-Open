import React, { useState } from "react";
import Name from "./components/Name";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const namesToShow = persons.filter((x) =>
    x.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((x) => x.name.includes(newName))) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new one</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {/* {persons.map((person) => (
          <Name key={person.name} name={person} />
        ))} */}
        {namesToShow.map((person) => (
          <Name key={person.name} name={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
