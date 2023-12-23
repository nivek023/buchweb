import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const BookDetailsForm = ({ book }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Titel: {book.titel.titel}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">ISBN: {book.isbn}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Rating: {book.rating}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Art: {book.art}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Preis: {book.preis}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Rabatt: {book.rabatt}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Lieferbar: {book.lieferbar ? 'Ja' : 'Nein'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Datum: {book.datum}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Homepage: {book.homepage}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Schlagwörter: {book.schlagwoerter.join(', ')}
          </Typography>
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
