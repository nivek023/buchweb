import BookEditForm from '../form/BookEditForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookEdit = () => {
  const [book, setBook] = useState(null);
  const [etag, setTag] = useState(null);

  const { id = 'default' } = useParams();

  const [formData, setFormData] = useState({
    id: id,
    isbn: '',
    rating: 0,
    art: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
  });

  const handleChange = async (bookDTO) => {
    console.log('handleAddNewBook called', bookDTO);
    const cToken = 'yourAccessToken';

    if (!cToken) {
      throw new Error('No token available');
    }

    const headers = {
      Authorization: `Bearer ${cToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.put(url, formData, {
        headers: headers,
      });

      if (response.status === 200) {
        console.log('Book updated successfully:', response.data);
        setBook(response.data);
      } else {
        console.error('Error occurred during PUT request:', response);
      }
    } catch (error) {
      console.error('Error occurred during PUT request:', error);
    }
  };

  const handleSchlagwoerterChange = (action, value) => {
    let updatedSchlagwoerter;

    if (action === 'add') {
      updatedSchlagwoerter = [...formData.schlagwoerter, value];
    } else if (action === 'delete') {
      updatedSchlagwoerter = formData.schlagwoerter.filter((schlagwort) => schlagwort !== value);
    }

    setFormData({
      ...formData,
      schlagwoerter: updatedSchlagwoerter,
    });
  };

  useEffect(() => {
    const fetchBook = async () => {
      const url = '/api/rest';
      const request = `/${id}`;
      try {
        const response = await axios.get(url + request);
        const etag = response.headers['etag'];
        setTag(etag);
        if (response.status !== 200) {
          throw new Error('BookDetails.fetchBook: Kein 200 Status-Code');
        }
        if (response.data) {
          setBook(response.data);
        } else {
          console.error('BookDetails.fetchBook: response.data is undefined');
        }
      } catch (error) {
        console.error('BookDetails.fetchBook:', error.message);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Ändern</h2>
      <BookEditForm book={book} etag={etag} />
    </div>
  );
};

export default BookEdit;
