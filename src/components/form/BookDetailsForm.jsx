import { Grid, Typography, Rating, Button, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, formatPreis } from './internatUtil';

const BookDetailsForm = ({ book, deleteBook, writeAccess }) => {
  const bookRabattP = Math.round(book.rabatt * 100);
  const { id = 'default' } = useParams();
  const navigate = useNavigate();
  const gridSpacer = <Grid item xs={6} />;
  const isMobile = useMediaQuery('(max-width:400px)');
  const exists = (value) => {
    return value !== null && value !== undefined && value !== '' && value !== 'null';
  };
  const renderNullableValue = (value) => {
    console.log(value);
    return exists(value) ? value : 'N/A';
  };
  const handleBtenClick = () => {
    navigate(`/edit/${id}`);
  };
  const handleDeleteClick = () => {
    deleteBook(id);
    navigate('/');
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Buchtitel: {book.titel.titel}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>ISBN:</strong> {book.isbn}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={12}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <Rating name="read-only" value={book.rating} readOnly />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            {exists(book.lieferbar)
              ? `Buch kann ${
                  book.lieferbar ? '' : 'leider nicht'
                } geliefert werden`
              : `Lieferstatus unbekannt`}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={5}>
          <Typography
            variant="body1"
            style={{ textAlign: 'left', marginRight: '20px' }}
          >
            <strong>Art:</strong> {renderNullableValue(book.art)}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          {!isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBtenClick}
              disabled={!writeAccess}
            >
              <EditIcon />
            </Button>
          )}
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={5}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Preis:</strong> {formatPreis(book.preis)}€
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          {!isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteClick}
              disabled={!writeAccess}
            >
              <DeleteIcon />
            </Button>
          )}
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Rabatt:</strong>{' '}
            {exists(book.rabatt) ? `${bookRabattP}%` : 'N/A'}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Datum:</strong>{' '}
            {renderNullableValue(formatDate(book.datum))}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Homepage: </strong>
            {exists(book.homepage) ? (
              <a href={book.homepage} target="_blank" rel="noopener noreferrer">
                {book.homepage}
              </a>
            ) : (
              'N/A'
            )}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Schlagwörter:</strong>{' '}
            {exists(book.schlagwoerter[0]) ? book.schlagwoerter.join(', ') : 'N/A'}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          {isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBtenClick}
              disabled={!writeAccess}
            >
              <EditIcon />
            </Button>
          )}
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          {isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteClick}
              disabled={!writeAccess}
            >
              <DeleteIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default BookDetailsForm;

BookDetailsForm.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    art: PropTypes.string.isRequired,
    preis: PropTypes.number.isRequired,
    rabatt: PropTypes.number.isRequired,
    lieferbar: PropTypes.bool.isRequired,
    datum: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    schlagwoerter: PropTypes.arrayOf(PropTypes.string).isRequired,
    titel: PropTypes.shape({
      titel: PropTypes.string.isRequired,
      untertitel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
  writeAccess: PropTypes.bool.isRequired,
};
