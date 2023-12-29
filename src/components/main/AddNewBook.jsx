import { useContext, useState } from 'react';
import axios from 'axios';
import AddNewBookForm from '../form/AddNewBookForm';
import { AuthContext } from '../provider/AuthProvider';

const AddNewBook = () => {
  const [addNewBook, setAddNewBook] = useState({
    isbn: '',
    rating: 0,
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: 'ja',
    datum: new Date().toISOString().split('T')[0],
    homepage: '',
    titel: {
      titel: '',
      untertitel: '' | undefined,
    },
    schlagwoerter: {
      javascript: '',
      typescript: '',
    },
  });

  const { cToken } = useContext(AuthContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleAddNewBook = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post('/api/rest', addNewBook, {
        headers,
      });

      if (!addNewBook.isbn || !addNewBook.titel.titel) {
        setSuccess(false);
        setError('Bitte fülle alle erforderlichen Felder aus.');
        return;
      }

      console.log('Server Response:', response);
      if (response.status !== 201) {
        setSuccess(false);
        setError(`Fehler beim Hinzufügen des Buchs: ${response.statusText}`);
      } else if (response.data) {
        setSuccess(true);
        setError(false);
      }
    } catch (error) {
      setSuccess(false);
      setError(`Fehler beim Hinzufügen des Buchs: ${error.message}`);
    }

    console.log('Neues Buch:', addNewBook);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddNewBook ({
      ...addNewBook,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  console.log('Neues Buch erstellt: ' , AddNewBookForm)

  return (
    <div>
      <AddNewBookForm
        addNewBook={addNewBook}
        handleInputChange={handleInputChange}
        handleAddNewBook={handleAddNewBook}
        success={success}
        error={error}
      />
    </div>
  );
};

export default AddNewBook;
