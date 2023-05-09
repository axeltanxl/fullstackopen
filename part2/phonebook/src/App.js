import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = (props) => {
    return (
        <div>
            filter shown with<input value={props.filter} onChange={props.handler}></input>
        </div>
    )
}

const PersonForm = (props)=> {
    return (
        <form>
            <div>
                name: <input value={props.name} onChange={props.nameHandler}/>
            </div>
            <div>
                number: <input value={props.number} onChange={props.numberHandler}/>
            </div>
            <div>
                <button type="submit" onClick={props.contact}>add</button>
            </div>
        </form>
    )
}

const Persons = (props) => {
    return (
        <div>
            {props.persons.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={()=> props.deleteContact(person.id)}>delete</button></div>)}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const[newFilter, setNewFilter] = useState('')
    const [confirmMessage, setConfirmMessage] = useState(null)
    const[errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addContact = (event) => {
        event.preventDefault()
        const newPerson = {name: newName, number: newNumber};
        const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(existingPerson.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
                        setConfirmMessage(`Successfully changed number for ${newName}`)
                        setTimeout(() => {
                            setConfirmMessage(null)
                        }, 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${newName} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(person => person.id !== existingPerson.id))
                    })
            }
        }
        else {
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setConfirmMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setConfirmMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const handleName = (event) => {
        setNewName(event.target.value)
    }

    const handleNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const deleteContact = (id) => {
        const personName = persons.find(person => person.id === id).name
        if (window.confirm(`Delete ${personName}?`)) {
            personService
                .remove(id)
            setPersons(persons.filter(person => person.id !== id))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={confirmMessage} type='confirmation'/>
            <Notification message={errorMessage} type='error'/>
            <Filter filter={newFilter} handler={handleFilter}></Filter>
            <h2>Add a new</h2>
            <PersonForm name={newName} nameHandler={handleName} number={newNumber} numberHandler={handleNumber} contact={addContact}></PersonForm>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deleteContact={deleteContact}></Persons>
        </div>
    )
}

export default App