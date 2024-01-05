
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BookEditForm from '../form/BookEditForm.jsx';

const BookEdit = () => {
  const [book, setBook] = useState(null);
  const [etag, setTag] = useState(null);

  const { id = 'default' } = useParams();

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
