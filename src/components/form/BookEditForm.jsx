import React from 'react';
import { Button,
  Checkbox, FormControlLabel, Grid, Radio, RadioGroup, Rating, TextField} from '@mui/material';
import PropTypes from 'prop-types';

const BookChangeForm = ({ book, etag }) => {
  const [editedBook, setEditedBook] = React.useState(book);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [updateError, setUpdateError] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedBook((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBtnClick = async () => {
    try {
      setErrorMessage('');
      setUpdateError(false);

      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/json',
        'If-Match': etag,
      };

      const bookDTO = {
        isbn: editedBook.isbn,
        rating: parseInt(editedBook.rating, 10),
        art: editedBook.art,
        preis: parseFloat(editedBook.preis),
        rabatt: parseFloat(editedBook.rabatt),
        lieferbar: editedBook.lieferbar,
        datum: editedBook.datum,
        homepage: editedBook.homepage,
        schlagwoerter: editedBook.schlagwoerter,
      };

      const response = await axios.put(url + request, bookDTO, { headers });

      if (response.status === 204) {
        navigate(`/details/${id}`);
      } else {
        console.error('Error occurred during PUT request:', response);
        setUpdateError(true);
      }
    } catch (error) {
      console.error('Error occurred during PUT request:', error.message);
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      setUpdateError(true);
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            name="titel"
            label="Buchtitel"
            variant="outlined"
            value={editedBook.titel.titel}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="isbn"
            label="ISBN"
            variant="outlined"
            value={editedBook.isbn}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={1}>
          <Rating
            name="editable-rating"
            value={editedBook.rating}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedBook.lieferbar}
                onChange={handleInputChange}
                color="primary"
                fullWidth
              />
            }
            label="lieferbar"
          />
        </Grid>

        <Grid item xs={12}>
          <RadioGroup
            aria-label="Radio options"
            name="radio-options"
            value={editedBook.art}
            onChange={(e) => setEditedBook({ ...editedBook, art: e.target.value })}
            row
          >
            <FormControlLabel
              value="DRUCKAUSGABE"
              control={<Radio />}
              label="Druckausgabe"
            />
            <FormControlLabel value="KINDLE" control={<Radio />} label="Kindle" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="preis"
            label="Preis"
            variant="outlined"
            value={editedBook.preis}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="rabatt"
            label="Rabatt"
            variant="outlined"
            value={editedBook.rabatt}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="datum"
            label="Datum"
            variant="outlined"
            value={editedBook.datum}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="homepage"
            label="Homepage"
            variant="outlined"
            value={editedBook.homepage}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={1} sm={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedBook.isTypeScript}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="TypeScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editedBook.isJavaScript}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="JavaScript"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleBtnClick}>
            Bearbeiten
          </Button>
        </Grid>
        {updateError && (
          <Grid item xs={12}>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

BookChangeForm.propTypes = {
  book: PropTypes.shape({}).isRequired,
  etag: PropTypes.string.isRequired,
};

export default BookChangeForm;
