import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const nameId = nanoid();
  const phoneId = nanoid();

  const [contacts, setContacts] = useState({
    name: '',
    number: '',
  });

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setContacts({
      ...contacts,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ ...contacts });
    setContacts({ name: '', number: '' });
  };

  const { name, number } = contacts;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        id={nameId}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
      />

      <label htmlFor={phoneId}>Number</label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        id={phoneId}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
      />

      <button type="submit">Add contact</button>
    </form>
  );
};
