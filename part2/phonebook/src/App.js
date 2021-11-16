import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/names";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
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
            setMessage([`Updated ${returnedPerson.name}`, "success"]);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((err) => {
            setMessage([
              `${persons[matchedNameIndex].name} was already removed from server`,
              "error",
            ]);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      personService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage([`Added ${returnedPerson.name}`, "success"]);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
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
  const handlePersonDelete = (person) => {
    personService
      .deleteEntry(person.id)
      .then((response) => {
        setPersons(persons.filter((x) => x.id !== person.id));
        setMessage([`${person.name} has been successfully deleted`, "success"]);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((err) => {
        setMessage([`${person.name} is not in the database`, "error"]);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };

  return (
    <div>
      <Notification message={message} />
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
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
