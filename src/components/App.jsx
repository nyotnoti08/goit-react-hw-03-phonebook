import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Edna Mode', number: '200-40-02' },
      { id: 'id-2', name: 'Wednesday Addams', number: '199-11-993' },
      { id: 'id-3', name: 'Wanda Maximoff', number: '645-17-79' },
      { id: 'id-4', name: 'Captain Jack Sparrow', number: '227-91-26' },
      { id: 'id-5', name: 'Steve Rogers', number: '201-14-01' },
      { id: 'id-6', name: 'Ace Ventura', number: '649-98-132' },
      { id: 'id-7', name: 'Bruce Lee', number: '998-82-123' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts !== null) {
      // If something has already been saved in localStorage, we write THIS in the state
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      // if a contact is new, set value to localStorage
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={this.setFilter} />
        <ContactList
          filterContact={this.filterContact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
