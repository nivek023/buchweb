import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Rating,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  validateISBN,
  validatePreis,
  validateRabatt,
  validateHomepage,
  validateTitle,
} from './inputValidator';

const AddNewBookForm = ({ book, handleAddNewBook, feedbackMessage }) => {
  const [isbnValidation, setIsbnValidation] = useState({
    isValid: true,
    errorMessage: '',
  });

  const [titleValidation, setTitleValidation] = useState({
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
  const [homepageValidation, setHomepageValidation] = useState({
    isValid: true,
    errorMessage: '',
  });
  const [formValid, setFormValid] = useState(true);
  const [addBook, setAddBook] = useState({ book });
  const bookDTO = {
    isbn: addBook.isbn,
    rating: parseInt(addBook.rating),
    art: addBook.art,
    preis: parseFloat(addBook.preis),
    rabatt: parseFloat(addBook.rabatt),
    lieferbar: addBook.lieferbar === 'true' ? true : false,
    datum: addBook.datum,
    homepage: addBook.homepage,
    schlagwoerter: (addBook.javascript ? ['JAVASCRIPT'] : []).concat(
      addBook.typescript ? ['TYPESCRIPT'] : []
    ),
    titel: {
      titel: addBook.titel,
    },
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    const transformedValue =
      name === 'datum' ? new Date(value).toISOString().split('T')[0] : value;

    setAddBook(() => ({
      ...addBook,
      [name]: transformedValue,
    }));
  };

  const handleRatingChange = (newValue) => {
    setAddBook(() => ({
      ...addBook,
      rating: newValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAddBook({
      ...addBook,
      [name]: value,
    });

    if (name === 'isbn') {
      const isValidISBN = validateISBN(value);
      setIsbnValidation({
        isValid: isValidISBN,
        errorMessage: isValidISBN ? '' : 'Muss eine gültige ISBN sein',
      });
    }

    if (name === 'titel') {
      const isValidTitle = validateTitle(value);
      setTitleValidation({
        isValid: isValidTitle,
        errorMessage: isValidTitle ? '' : 'Der Titel darf nicht leer sein',
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

  useEffect(() => {
    setFormValid(
      isbnValidation.isValid &&
        titleValidation &&
        preisValidation.isValid &&
        rabattValidation.isValid &&
        homepageValidation.isValid
    );
  }, [
    isbnValidation.isValid,
    titleValidation,
    preisValidation.isValid,
    rabattValidation.isValid,
    homepageValidation.isValid,
  ]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Paper>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>ISBN:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        required
                        type="text"
                        name="isbn"
                        value={addBook.isbn || ''}
                        onChange={handleInputChange}
                        label="Required"
                        error={!isbnValidation.isValid}
                        helperText={isbnValidation.errorMessage}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Titel:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        required
                        type="text"
                        name="titel"
                        value={addBook.titel || ''}
                        onChange={handleInputChange}
                        label="Required"
                        error={!titleValidation.isValid}
                        helperText={titleValidation.errorMessage}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rating:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <Rating
                        required
                        type="rating"
                        name="rating"
                        value={addBook.rating || 0}
                        label="Required"
                        onChange={(event, newValue) =>
                          handleRatingChange(newValue)
                        }
                        icon={<BookIcon />}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Art:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <FormControl>
                        <Select
                          labelId="art-label"
                          name="art"
                          value={addBook.art || ''}
                          onChange={(e) =>
                            setAddBook({
                              ...addBook,
                              art: e.target.value,
                            })
                          }
                        >
                          <MenuItem
                            name="kindle"
                            value="KINDLE"
                            onChange={handleInputChange}
                          >
                            Kindle
                          </MenuItem>
                          <MenuItem
                            name="druckausgabe"
                            value="DRUCKAUSGABE"
                            onChange={handleInputChange}
                          >
                            Druckausgabe
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Datum:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        type="date"
                        name="datum"
                        value={addBook.datum || ''}
                        onChange={handleDateChange}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lieferbar:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <FormControl>
                        <RadioGroup
                          name="lieferbar"
                          value={addBook.lieferbar}
                          onChange={handleInputChange}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Ja"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Nein"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Homepage:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        name="homepage"
                        value={addBook.homepage || ''}
                        onChange={handleInputChange}
                        error={!homepageValidation.isValid}
                        helperText={homepageValidation.errorMessage}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Preis:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        required
                        type="text"
                        name="preis"
                        value={addBook.preis || ''}
                        onChange={handleInputChange}
                        label="Required"
                        error={!preisValidation.isValid}
                        helperText={preisValidation.errorMessage}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Rabatt:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        name="rabatt"
                        value={addBook.rabatt || ''}
                        onChange={handleInputChange}
                        error={!rabattValidation.isValid}
                        helperText={rabattValidation.errorMessage}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Schlagwörter:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={addBook.schlagwoerter}
                            value={['TYPESCRIPT']}
                            onChange={handleInputChange}
                            name="typescript"
                            color="primary"
                          />
                        }
                        label="TypeScript"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={addBook.schlagwoerter}
                            value={['JAVASCRIPT']}
                            onChange={handleInputChange}
                            name="javascript"
                            color="primary"
                          />
                        }
                        label="JavaScript"
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ alignItems: 'center', width: 'auto' }}
            onClick={() => handleAddNewBook(bookDTO)}
            disabled={!formValid}
          >
            Buch anlegen
          </Button>
          {feedbackMessage && (
            <div
              style={{
                marginTop: '10px',
                color: feedbackMessage.includes('erfolgreich')
                  ? 'green'
                  : 'red',
              }}
            >
              {feedbackMessage}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

AddNewBookForm.propTypes = {
  book: PropTypes.object.isRequired,
  handleAddNewBook: PropTypes.func.isRequired,
  feedbackMessage: PropTypes.string,
};

export default AddNewBookForm;
