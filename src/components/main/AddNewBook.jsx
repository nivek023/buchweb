import { useContext, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../provider/AuthProvider.jsx';
import AddNewBookForm from '../form/AddNewBookForm.jsx';

const AddNewBook = () => {
  const { cToken } = useContext(AuthContext);
  const url = '/api/rest';
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [book, setBook] = useState({
    isbn: '',
    rating: 0,
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: 'true',
    datum: '',
    homepage: '',
    titel: '',
    schlagwoerter: [],
  });

  const handleAddNewBook = async (bookDTO) => {
    console.log('handleAddNewBook called', bookDTO);

    if (!cToken) {
      throw new Error('No token available');
    }

    const headers = {
      Authorization: `Bearer ${cToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, bookDTO, {
        headers: headers,
      });

      if (response.status === 201) {
        console.log(
          'Buch wurde erfolgreich hinzugefügt. ID:',
          response.data.id,
          setFeedbackMessage('Das Buch wurde erfolgreich hinzugefügt.')
        );
        setBook(() => ({
          ...book,
          id: response.data.id,
        }));
        setBook(book);
      } else {
        console.error('Error occurred during POST request:', response);
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Buchs:', error);
      setFeedbackMessage(
        'Fehler beim Hinzufügen des Buchs, korrigieren Sie ihre Eingaben.'
      );
    }
  };

  return (
    <div>
      <h2>Neues Buch</h2>
      <AddNewBookForm
        handleAddNewBook={handleAddNewBook}
        book={book}
        feedbackMessage={feedbackMessage}
      />
    </div>
  );
};

export default AddNewBook;
