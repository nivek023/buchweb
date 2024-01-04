import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BookDetailsForm from '../form/BookDetailsForm.jsx';
import { useAuth } from '../provider/useAuth.js';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id = 'default' } = useParams();
  const { cToken, writeAccess } = useAuth();
  useEffect(() => {
    const fetchBook = async () => {
      const url = '/api/rest';
      const request = `?id=${id}`;
      try {
        const response = await axios.get(url + request);
        if (response.status !== 200) {
          throw new Error('BookDetails.fetchBook: Kein 200 Status-Code');
        }
        if (response.data) {
          setBook(response.data._embedded.buecher[0]);
        } else {
          console.error('BookDetails.fetchBook: resopnse.data ist undefiniert');
        }
      } catch (error) {
        console.error('BookDetails.fetchBook:', error.message);
      }
    };
    fetchBook();
  }, [id]);

  const deleteBook = (id) => {
    const headers = {
      Authorization: `Bearer ${cToken}`,
      'Content-Type': 'application/hal',
    };
    console.log(`BookDetails.deleteBook token: ${cToken}`);
    const url = '/api/rest/';
    const request = `${id}`;
    axios
      .delete(url + request, { headers })
      .then((response) => {
        if (response.status !== 204) {
          throw new Error('BookDetails.deleteBook: Kein 204 Status-Code');
        }
        setBook(null);
      })
      .catch((error) => {
        console.error('BookDetails.deleteBook:', error.message);
      });
  };

  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Details</h2>
      <BookDetailsForm
        book={book}
        deleteBook={deleteBook}
        writeAccess={writeAccess}
      />
    </div>
  );
};

export default BookDetails;
