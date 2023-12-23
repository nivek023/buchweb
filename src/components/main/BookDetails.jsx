import BookDetailsForm from '../form/BookDetailsForm';

const BookDetails = () => {
  const book = {
    isbn: '978-3-897-22583-1',
    rating: 0,
    art: 'DRUCKAUSGABE',
    preis: 11.1,
    rabatt: 0.011,
    lieferbar: true,
    datum: '2022-02-01',
    homepage: 'https://acme.at',
    schlagwoerter: ['JAVASCRIPT'],
    titel: {
      titel: 'Alpha',
      untertitel: 'alpha',
    },
  };

  return (
    <div>
      <h1>Details</h1>
      <BookDetailsForm book={book} />
    </div>
  );
};

export default BookDetails;
