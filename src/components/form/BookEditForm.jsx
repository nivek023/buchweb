import { Button, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, Rating, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AuthContext } from '../provider/AuthProvider.jsx';
import { formatDate } from '../form/internatUtil';

const BookChangeForm = ({ book, etag }) => {
  const { cToken } = useContext(AuthContext);
  const [editedBook, setEditedBook] = useState(book);
  const { id = 'default' } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleBtenClick = async () => {
    // Validierung für ISBN
    if (editedBook.isbn.length !== 13) {
      alert('Ungültige Eingabe für ISBN. Die ISBN muss 13 Zeichen lang sein.');
      return;
    }

    // Validierung für Rating
    const parsedRating = parseInt(editedBook.rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      alert('Ungültige Eingabe für Rating. Bitte einen Wert zwischen 1 und 5 eingeben.');
      return;
    }

    // Validierung für Zahlen in number-Feldern
    if (isNaN(Number(editedBook.rabatt))) {
      alert(`Ungültige Eingabe für Rabatt. Nur Zahlen sind erlaubt.`);
      return;
    }

    // Validierung für Zahlen in decimal-Feldern
    if (isNaN(parseFloat(editedBook.preis))) {
      alert(`Ungültige Eingabe für Preis. Nur Zahlen sind erlaubt.`);
      return;
    }

    // Validierung für Datum
    if (isNaN(Date.parse(editedBook.datum))) {
      alert('Ungültige Eingabe für Datum. Bitte ein gültiges Datum eingeben.');
      return;
    }

    // Validierung für maximales Datum
    const enteredDate = new Date(editedBook.datum);
    const today = new Date();
    if (enteredDate > today) {
      alert('Das eingegebene Datum darf nicht größer als heute sein.');
      return;
    }

    // Validierung für Datum mit der formatDate-Funktion
    const formattedDate = formatDate(editedBook.datum);
    if (formattedDate === editedBook.datum) {
      alert('Ungültige Eingabe für Datum. Bitte ein gültiges Datum eingeben.');
      return;
    }

    // Validierung für Schlagwörter
    if (/\d/.test(editedBook.schlagwoerter)) {
      alert('Schlagwörter dürfen keine Zahlen enthalten.');
      return;
    }

    // Buch aktualisieren, wenn Validierung erfolgreich ist
    try {
      const url = '/api/rest';
      const request = `/${id}`;
      if (!cToken) {
        throw new Error('No token available');
      }

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
      }
    } catch (error) {
      console.error('Error occurred during PUT request:', error.message);
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
            onChange={(e) =>
              setEditedBook({ ...editedBook, art: e.target.value })
            }
            row
          >
            <FormControlLabel
              value="DRUCKAUSGABE"
              control={<Radio />}
              label="Druckausgabe"
            />
            <FormControlLabel
              value="KINDLE"
              control={<Radio />}
              label="Kindle"
            />
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBtenClick(cToken)}
          >
            Bearbeiten
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

BookChangeForm.propTypes = {
  book: PropTypes.shape({}).isRequired,
};
export default BookChangeForm;
