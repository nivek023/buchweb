import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
// eslint-disable-next-line react/prop-types
const BookChangeForm = ({ book, etag }) => {
  const { cToken } = useContext(AuthContext);
  const [editedBook, setEditedBook] = useState(book);
  const { id = 'default' } = useParams();

  const navigate = useNavigate();

  console.log(book);
  console.log(etag);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleBtenClick = async (cToken) => {
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

    try {
      const response = await axios.put(url + request, bookDTO, {
        headers: headers,
      });

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        navigate(`/edit/${id}`);
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
            label="Prais"
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

export default BookChangeForm;

BookChangeForm.propTypes = {
  book: PropTypes.shape({}).isRequired,
};
