import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';

const LS_KEY = 'contacts-list';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (parsedContacts?.length) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  isDublicateName(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const dublicateName = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedName === normalizedCurrentName;
    });
    return Boolean(dublicateName);
  }

  addContact = (name, number) => {
    if (this.isDublicateName(name)) {
      console.log(name);
      return alert(`${name} is alredy in contacts`);
    }

    const contact = {
      id: 'id-' + nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(item => item.id !== id);
      return { contacts: newContact };
    });
  };

  changeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  getFilterContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  }

  render() {
    const contactsList = this.getFilterContacts();
    const { addContact, changeFilter, deleteContact } = this;

    return (
      <div className={css.box}>
        <div>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
        </div>
        <div className={css.boxContacts}>
          <h2 className={css.subtitle}>Contacts</h2>
          <Filter filter={this.state.filter} changeFilter={changeFilter} />
          <ContactList contacts={contactsList} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}
