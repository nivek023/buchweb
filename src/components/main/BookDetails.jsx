import BookDetailsForm from '../form/BookDetailsForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id = 'default' } = useParams();

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

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Details</h2>
      <BookDetailsForm book={book} />
    </div>
  );
};

export default BookDetails;
