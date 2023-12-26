import { Grid, Typography, Rating, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

const BookDetailsForm = ({ book }) => {
  const bookRabattP = Math.round(book.rabatt * 100);
  const { id = 'default' } = useParams();
  const navigate = useNavigate();
  const gridSpacer = <Grid item xs={6}/>;
  const handleBtenClick = () => {
    navigate(`/edit/${id}`);
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
          <Button variant="contained" color="primary" onClick={handleBtenClick}>
            Bearbeiten
          </Button>
        </Grid>
        <Grid item xs={5}/>
        <Grid item xs={5}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Preis:</strong> {book.preis}€
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary">
            Löschen
          </Button>
        </Grid>
        <Grid item xs={5}/>
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Rabatt:</strong> {bookRabattP} %
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Datum:</strong> {book.datum}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Homepage:</strong> {book.homepage}
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
    preis: PropTypes.string.isRequired,
    rabatt: PropTypes.string.isRequired,
    lieferbar: PropTypes.oneOf(['ja', 'nein']).isRequired,
    datum: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    schlagwoerter: PropTypes.arrayOf(PropTypes.string).isRequired,
    titel: PropTypes.shape({
      titel: PropTypes.string.isRequired,
      untertitel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
