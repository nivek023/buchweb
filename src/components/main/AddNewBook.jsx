import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/useAuth';
import { useNavigate } from 'react-router-dom';

const AddNewBook = () => {
  const [bookForm, setBookForm] = useState({
    isbn: '',
    titel: '',
    rating: 0,
    art: '',
    datum: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    preis: '',
    rabatt: '',
    lieferbar: 'ja',
    homepage: '',
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
      isbn: bookForm.isbn,
      titel: bookForm.titel,
      rating: Number(bookForm.rating),
      art: bookForm.art,
      datum: bookForm.datum,
      preis: bookForm.preis,
      rabatt: bookForm.rabatt === '' ? 0 : Number(bookForm.rabatt) / 100,
      lieferbar: bookForm.lieferbar === 'ja',
      homepage: bookForm.homepage,
      schlagwoerter: (bookForm.javascript ? ['JAVASCRIPT'] : []).concat(
        bookForm.typescript ? ['TYPESCRIPT'] : []
      ),
    };

    try {
      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/hal',
      };

      const response = await axios.post('/api/rest', newBook, { headers });

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

    setBookForm({
      isbn: '',
      titel: '',
      rating: 0,
      art: '',
      datum: new Date().toISOString().split('T')[0],
      preis: '',
      rabatt: '',
      lieferbar: 'ja',
      homepage: '', 
      javascript: false,
      typescript: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


return (
  <div>
    <AddNewBook book={book} etag={etag} />
  </div>
);
};

export default AddNewBook;
