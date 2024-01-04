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
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AddNewBookForm = ({ book, handleAddNewBook }) => {
  const [bookForm, setAddBookForm] = useState({ book });
  const bookDTO = {
    id: bookForm.id,
    isbn: bookForm.isbn,
    rating: parseInt(bookForm.rating),
    art: bookForm.art,
    preis: parseFloat(bookForm.preis),
    rabatt: parseFloat(bookForm.rabatt/100),
    lieferbar: bookForm.lieferbar === true,
    datum: bookForm.datum,
    homepage: bookForm.homepage,
    schlagwoerter: (bookForm.javascript ? ['JAVASCRIPT'] : []).concat(
      bookForm.typescript ? ['TYPESCRIPT'] : []
    ),
    titel: {
      titel: bookForm.titel,
    },
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    const transformedValue =
      name === 'datum' ? new Date(value).toISOString().split('T')[0] : value;

    setAddBookForm(() => ({
      ...bookForm,
      [name]: transformedValue,
    }));
  };

  const handleRatingChange = (newValue) => {
    setAddBookForm(() => ({
      ...bookForm,
      rating: newValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setAddBookForm(() => ({
        ...bookForm,
        [name]: checked,
      }));
    } else if (type === 'radio') {
      setAddBookForm(() => ({
        ...bookForm,
        [name]: value === 'true',
      }));
    } else {
      setAddBookForm(() => ({
        ...bookForm,
        [name]: value,
      }));
    }
  };

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
                        type="text"
                        name="isbn"
                        value={bookForm.isbn}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Titel:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        name="titel"
                        value={bookForm.titel}
                        onChange={handleInputChange}
                        placeholder="Titel"
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rating:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <Rating
                        name="rating"
                        value={bookForm.rating}
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
                      <FormControl fullWidth>
                        <Select
                          labelId="art-label"
                          name="art"
                          value={bookForm.art}
                          onChange={(e) =>
                            setAddBookForm({
                              ...bookForm,
                              art: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="KINDLE">Kindle</MenuItem>
                          <MenuItem value="DRUCKAUSGABE">Druckausgabe</MenuItem>
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
                        value={bookForm.datum}
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
                          value={bookForm.lieferbar}
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
                        value={bookForm.homepage}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Preis:</TableCell>
                  <TableCell>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        name="preis"
                        value={bookForm.preis}
                        onChange={handleInputChange}
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
                        value={bookForm.rabatt}
                        onChange={handleInputChange}
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
                            checked={bookForm.isJavascript}
                            onChange={handleInputChange}
                            name="isJavascript"
                            color="primary"
                          />
                        }
                        label="TypeScript"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={bookForm.isTypescript}
                            onChange={handleInputChange}
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
          >
            Buch anlegen
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddNewBookForm;
