import {
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Rating,
  Button,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { useContext } from 'react';

// eslint-disable-next-line react/prop-types
const AddNewBookForm = ({success, error}) => {
  const [addBookForm, setAddBookForm] = useState({
    id: undefined,
    isbn: '',
    rating: 0,
    art: '' || undefined,
    preis: '' || undefined,
    rabatt: '' || undefined,
    lieferbar: true || false,
    datum: new Date().toISOString().split('T')[0] | undefined,
    homepage: '' || undefined,
    titel: {
      titel: '',
      untertitel: '',
    },
    schlagwoerter: [],
  });
  const { cToken } = useContext(AuthContext);
  const url = '/api/rest';

  console.log(addBookForm);

  const handleAddNewBook = async () => {
    if (!cToken) {
      throw new Error('No token available');
    }

    const headers = {
      Authorization: `Bearer ${cToken}`,
      'Content-Type': 'application/json',
    };

    const bookDTO = {
      isbn: addBookForm.isbn,
      rating: parseInt(addBookForm.rating),
      art: addBookForm.art,
      preis: parseFloat(addBookForm.preis),
      rabatt: parseFloat(addBookForm.rabatt),
      lieferbar: addBookForm.lieferbar === true,
      datum: addBookForm.datum,
      homepage: addBookForm.homepage,
      schlagwoerter: (addBookForm.javascript ? ['JAVASCRIPT'] : []).concat(
        addBookForm.typescript ? ['TYPESCRIPT'] : []
      ),
      titel:
        typeof addBookForm.titel === 'object'
          ? addBookForm.titel
          : { titel: addBookForm.titel },
    };
    delete addBookForm.id;

    try {
      const response = await axios.post(url, bookDTO, {
        headers: headers,
      });

      if (response.status === 201) {
        console.success(
          'Buch wurde erfolgreich hinzugefügt. ID:',
          response.data.id
        );

        setAddBookForm({ ...addBookForm, id: response.data.id });
      } else {
        console.error('Error occurred during POST request:', response);
      }
    } catch (error) {
      console.error('Error occurred during POST request:', error.message);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    const transformedValue =
      name === 'datum' ? new Date(value).toISOString().split('T')[0] : value;

    setAddBookForm(() => ({
      ...addBookForm,
      [name]: transformedValue,
    }));
  };

  const handleRatingChange = (newValue) => {
    setAddBookForm(() => ({
      ...addBookForm,
      rating: newValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddBookForm(() => ({
      ...addBookForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Table>
          <TableRow>
            <TableCell>ISBN:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="isbn"
                value={addBookForm.isbn}
                onChange={handleInputChange}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Titel:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="titel"
                value={addBookForm.titel.titel}
                onChange={handleInputChange}
                placeholder="Titel"
                fullWidth
              />
              {console.log('addBook:', addBookForm)}
              <TextField
                type="text"
                name="untertitel"
                value={addBookForm.titel.untertitel || undefined}
                onChange={handleInputChange}
                placeholder="Untertitel"
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rating:</TableCell>
            <TableCell>
              <Rating
                name="rating"
                value={addBookForm.rating}
                onChange={(event, newValue) => handleRatingChange(newValue)}
                icon={<BookIcon />}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Art:</TableCell>
            <TableCell>
              <Select
                name="art"
                value={addBookForm.art || ''}
                onChange={(e) =>
                  setAddBookForm({ ...addBookForm, art: e.target.value })
                }
                fullWidth
              >
                <MenuItem value="KINDLE">Kindle</MenuItem>
                <MenuItem value="DRUCKAUSGABE">Druckausgabe</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Datum:</TableCell>
            <TableCell>
              <TextField
                type="date"
                name="datum"
                value={addBookForm.datum}
                onChange={handleDateChange}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Preis:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="preis"
                value={addBookForm.preis}
                onChange={handleInputChange}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rabatt:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="rabatt"
                value={addBookForm.rabatt}
                onChange={handleInputChange}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lieferbar:</TableCell>
            <TableCell>
              <RadioGroup
                name="lieferbar"
                value={addBookForm.lieferbar}
                onChange={handleInputChange}
                fullWidth
              >
                <FormControlLabel value={true} control={<Radio />} label="Ja" />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Nein"
                />
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Homepage:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="homepage"
                value={addBookForm.homepage}
                onChange={handleInputChange}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Schlagwörter: </TableCell>
            <TableCell>
              <Grid item xs={1} sm={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={addBookForm.isJavascript}
                      value={'javascript'}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="TypeScript"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={addBookForm.isTypescript}
                      value={'typescript'}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="JavaScript"
                />
              </Grid>
            </TableCell>
          </TableRow>
        </Table>
        <Button
          variant="contained"
          style={{ alignItems: 'center', width: 'auto' }}
          onClick={() => handleAddNewBook()}
        >
          Buch anlegen
        </Button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Grid>
    </div>
  );
};
const Table = styled('table')({
  width: '75%',
  display: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
  flexWrap: 'wrap',
});

const TableRow = styled('tr')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
});

const TableCell = styled('td')({
  border: '5px solid #ddd',
  padding: '8px',
  flex: 3,
  width: 'auto',
  height: 'auto',
  minWidth: '50%',
});

AddNewBookForm.propTypes = {
  addNewBook: PropTypes.shape({}).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddNewBook: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  success: PropTypes.bool,
  error: PropTypes.string,
};

export default AddNewBookForm;
