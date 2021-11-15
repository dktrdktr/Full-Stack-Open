import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/names";

const App = () => {
  // ** State Variables **
  const [persons, setPersons] = useState([]);
  // User input
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  // Fetch data from the server after the initial render
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Event handler for adding a new contact to the phonebook
  const addName = (event) => {
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    event.preventDefault();
    // if (persons.some((x) => x.name.includes(newName))) {
    if (persons.some((x) => x.name.toLowerCase() === newName.toLowerCase())) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      let matchedNameIndex = persons.findIndex(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (result) {
        personService
          .update(persons[matchedNameIndex].id, nameObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? nameObject : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      //Add the data to the server and set the state variables
      personService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Event handlers for the user input
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  // Filter the person list based on the search query
  const namesToShow = persons.filter((x) =>
    x.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  // Event handler for deleting an entry (called from the Name component within Persons component)
  const handlePersonDelete = (personid) => {
    personService
      .deleteEntry(personid)
      .then((response) => {
        setPersons(persons.filter((x) => x.id !== personid));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new one</h2>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={namesToShow}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
