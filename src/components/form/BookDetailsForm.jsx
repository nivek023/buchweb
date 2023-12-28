import { Grid, Typography, Rating, Button } from '@mui/material';
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
  const handleBtenClick = () => {
    navigate(`/edit/${id}`);
  };
  const handleDeleteClick = () => {
    deleteBook(id);
    navigate('/');
  }
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
            Buch kann {book.lieferbar ? '' : 'leider nicht'} geliefert werden
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={5}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Art:</strong> {book.art}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleBtenClick} disabled={!writeAccess}>
            <EditIcon />
          </Button>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={5}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Preis:</strong> {formatPreis(book.preis)}€
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleDeleteClick} disabled={!writeAccess}>
            <DeleteIcon/>
          </Button>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Rabatt:</strong> {bookRabattP}%
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Datum:</strong> {formatDate(book.datum)}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Homepage: </strong> 
            <a href={book.homepage} target="_blank" rel="noopener noreferrer">
            {book.homepage} 
            </a>
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Schlagwörter:</strong> {book.schlagwoerter.join(', ')}
          </Typography>
        </Grid>
        {gridSpacer}
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
