import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';

const LS_KEY = 'contacts-list';

const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');

  const [contactsList, setContactsList] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? phoneContacts;
  });

  //хук, который позволяет при первом рендере не записывать в local storage снова данные, которые из него получили
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem(LS_KEY, JSON.stringify(contactsList));
    }
  }, [contactsList]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const isDublicateName = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const dublicateName = contactsList.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedName === normalizedCurrentName;
    });
    return Boolean(dublicateName);
  };

  const addContact = data => {
    if (isDublicateName(data)) {
      return alert(`${data.name} is alredy in contacts`);
    }
    setContactsList(prevContactsList => {
      const newContact = {
        id: 'id-' + nanoid(),
        ...data,
      };
      return [...prevContactsList, newContact];
    });
  };

  const deleteContact = id => {
    setContactsList(prevContactsList =>
      prevContactsList.filter(item => item.id !== id)
    );
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilterContacts = () => {
    if (!filter) {
      return contactsList;
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contactsList.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  };

  const itemContacts = getFilterContacts();

  return (
    <div className={css.box}>
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </div>
      <div className={css.boxContacts}>
        <h2 className={css.subtitle}>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList contacts={itemContacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
};
