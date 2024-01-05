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

const AddNewBookForm = ({ book, handleAddNewBook, feedbackMessage }) => {
  const [addBook, setAddBook] = useState({ book });
  const bookDTO = {
    isbn: addBook.isbn,
    rating: parseInt(addBook.rating),
    art: addBook.art,
    preis: parseFloat(addBook.preis),
    rabatt: parseFloat(addBook.rabatt / 100),
    lieferbar: addBook.lieferbar === true,
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
                        value={addBook.isbn}
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
                        value={addBook.titel}
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
                        value={addBook.rating || 0}
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
                          value={addBook.lieferbar || ''}
                          onChange={handleInputChange}
                        >
                          <FormControlLabel
                            value="true"
                            name="lieferbar"
                            control={<Radio />}
                            label="Ja"
                          />
                          <FormControlLabel
                            value="false"
                            name="nicht lieferbar"
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
                        value={addBook.preis || ''}
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
                        value={addBook.rabatt || ''}
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

export default AddNewBookForm;
