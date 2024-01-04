import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import AddNewBookForm from '../form/AddNewBookForm';
import { number } from 'prop-types';

const AddNewBook = () => {
  const { cToken } = useContext(AuthContext);
  const url = '/api/rest';
  const [book, setBook] = useState({
    id: undefined,
    isbn: '',
    rating: 0,
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: true,
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
          response.data.id
        );
        setBook(() => ({
          ...book,
          id: response.data.id
        }));
      } else {
        console.error('Error occurred during POST request:', response);
      }
    } catch (error) {
      console.error('Error occurred during POST request:', error);
    }

    console.log('handle', book)
  };

  return (
    <div>
      <h2>Neues Buch</h2>
      <AddNewBookForm handleAddNewBook={handleAddNewBook} book={book} />
    </div>
  );
};

export default AddNewBook;
