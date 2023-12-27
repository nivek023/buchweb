import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/useAuth';
import { useNavigate } from 'react-router-dom';
import AddNewBookForm from '../form/AddNewBookForm';

const AddNewBook = () => {
  const [addNewBookForm, setAddBookForm] = useState({
    isbn: '',
    titel: '',
    rating: 0,
    art: '',
    datum: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    preis: '',
    rabatt: '',
    lieferbar: 'ja',
    javascript: false,
    typescript: false,
  });

  const { cToken } = useAuth();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddNewBook = async () => {
    const newBook = {
      id: undefined,
      version: 0,
      isbn: addNewBookForm.isbn,
      titel: addNewBookForm.titel,
      rating: Number(addNewBookForm.rating),
      art: addNewBookForm.art,
      datum: addNewBookForm.datum,
      preis: addNewBookForm.preis,
      rabatt:
        addNewBookForm.rabatt === '' ? 0 : Number(addNewBookForm.rabatt) / 100,
      lieferbar: addNewBookForm.lieferbar === 'ja',
      schlagwoerter: (addNewBookForm.javascript ? ['JAVASCRIPT'] : []).concat(
        addNewBookForm.typescript ? ['TYPESCRIPT'] : []
      ),
    };

    try {
      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/hal',
      };

      const response = await axios.post('/api/rest', addNewBookForm, {
        headers,
      });

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        const bookSearchComponent = document.getElementById('search');
        if (bookSearchComponent) {
          bookSearchComponent.fetchData();
        }
        navigate('/search');
      } else {
        setSuccess(false);
        setError(`Fehler beim Hinzufügen des Buchs: ${response.statusText}`);
      }
    } catch (error) {
      setSuccess(false);
      setError(`Fehler beim Hinzufügen des Buchs: ${error.message}`);
    }

    console.log('Neues Buch:', newBook);

    setAddBookForm({
      isbn: '',
      titel: '',
      rating: 0,
      art: '',
      datum: new Date().toISOString().split('T')[0],
      preis: '',
      rabatt: '',
      lieferbar: 'ja',
      javascript: false,
      typescript: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddBookForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <AddNewBookForm
      addNewBookForm={addNewBookForm}
      handleInputChange={handleInputChange}
      handleAddNewBook={handleAddNewBook}
      success={success}
      error={error}
    />
  );
};

export default AddNewBook;
