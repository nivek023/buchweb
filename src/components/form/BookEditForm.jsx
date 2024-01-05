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
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { AuthContext } from '../provider/AuthProvider.jsx';

const BookChangeForm = ({ book, etag }) => {
  const { cToken } = useContext(AuthContext);
  const [editedBook, setEditedBook] = useState(book);
  const [formValid, setFormValid] = useState(true);
  const [isbnValidation, setIsbnValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [preisValidation, setPreisValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [rabattValidation, setRabattValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [datumValidation, setDatumValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [homepageValidation, setHomepageValidation] = useState({
    isValid: true,
    errorMessage: '',
  });

  const { id = 'default' } = useParams();
  const navigate = useNavigate();

  const validateISBN = (isbn) => {
    const isbnRegex = /\d{3}-\d-\d{3}-\d{5}-\d$/u;
    return isbnRegex.test(isbn);
  };

  const validatePreis = (preis) => {
    const preisRegex =/^\d+(\.\d{1,2})?$/;
    return preisRegex.test(preis);
  };

  const validateRabatt = (rabatt) => {
    const isRabatt = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
    return isRabatt.test(rabatt);
  };

  const validateDatum = (datum) => {
    const isDatum = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    return isDatum.test(datum);
  };

  const validateHomepage = (homepage) => {
    const isHomepage =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.(com|de|net)$/;
    return isHomepage.test(homepage);
  };

  useEffect(() => {
    setFormValid(
      isbnValidation.isValid &&
        preisValidation.isValid &&
        rabattValidation.isValid &&
        datumValidation.isValid &&
        homepageValidation.isValid
    );
  }, [
    isbnValidation.isValid,
    preisValidation.isValid,
    rabattValidation.isValid,
    datumValidation.isValid,
    homepageValidation.isValid,
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'typescript' || name === 'javascript') {
      let schlagwoerter = editedBook.schlagwoerter;
      if (name === 'javascript') {
        if (checked) {
          schlagwoerter.push('JAVASCRIPT');
        } else {
          schlagwoerter = schlagwoerter.filter((item) => item !== 'JAVASCRIPT');
        }
      }
      if (name === 'typescript') {
        if (checked) {
          schlagwoerter.push('TYPESCRIPT');
        } else {
          schlagwoerter = schlagwoerter.filter((item) => item !== 'TYPESCRIPT');
        }
      }
      console.log(schlagwoerter);

      setEditedBook({
        ...editedBook,
        schlagwoerter: schlagwoerter,
      });
    } else {
      setEditedBook({
        ...editedBook,
        [name]: value,
      });
    }


    if (name === 'isbn') {
      const isValidISBN = validateISBN(value);
      setIsbnValidation({
        isValid: isValidISBN,
        errorMessage: isValidISBN ? '' : 'Muss eine gültige ISBN sein',
      });
    }

    if (name === 'preis') {
      const isValidPreis = validatePreis(value);
      setPreisValidation({
        isValid: isValidPreis,
        errorMessage: isValidPreis ? '' : 'Ungültiges Betragsformat',
      });
    }

    if (name === 'rabatt') {
      const isValidRabatt = validateRabatt(value);
      setRabattValidation({
        isValid: isValidRabatt,
        errorMessage: isValidRabatt
          ? ''
          : 'Muss ein gültiger Rabatt sein (z.B. 0.10)',
      });
    }

    if (name === 'datum') {
      const isValidDatum = validateDatum(value);
      setDatumValidation({
        isValid: isValidDatum,
        errorMessage: isValidDatum
          ? ''
          : 'Muss ein gültiges Datum sein (YYYY-MM-DD)',
      });
    }

    if (name === 'homepage') {
      const isValidHomepage = validateHomepage(value);
      setHomepageValidation({
        isValid: isValidHomepage,
        errorMessage: isValidHomepage
          ? ''
          : 'Muss ein gültige Homepage-URL sein (https://beispiel.com) ',
      });
    }
  };

  const handleBtenClick = async () => {
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
            disabled
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
            error={!isbnValidation.isValid}
            helperText={isbnValidation.errorMessage}
            fullWidth
          />
        </Grid>
        <Grid item xs={1}>
          <span>
            <Rating
              name="rating"
              value={parseInt(editedBook.rating, 10) || 0}
              onChange={handleInputChange}
            />
          </span>
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Checkbox
                name="lieferbar"
                checked={editedBook.lieferbar}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, lieferbar: e.target.checked })
                }
                color="primary"
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
            error={!preisValidation.isValid}
            helperText={preisValidation.errorMessage}
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
            error={!rabattValidation.isValid}
            helperText={rabattValidation.errorMessage}
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
            error={!datumValidation.isValid}
            helperText={datumValidation.errorMessage}
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
            error={!homepageValidation.isValid}
            helperText={homepageValidation.errorMessage}
          />
        </Grid>
        <Grid item xs={1} sm={1}>
          <FormControlLabel
            control={
              <Checkbox
                name="typescript"
                checked={
                  editedBook.schlagwoerter.includes('TYPESCRIPT') ? true : false
                }
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="TypeScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="javascript"
                checked={
                  editedBook.schlagwoerter.includes('JAVASCRIPT') ? true : false
                }
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
            disabled={!formValid}
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
  etag: PropTypes.string.isRequired,
};

export default BookChangeForm;
