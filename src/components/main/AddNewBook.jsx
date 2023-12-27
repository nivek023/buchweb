import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Rating,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { styled } from '@mui/system';

const AddNewBook = () => {
  const [bookForm, setBookForm] = useState({
    isbn: '',
    titel: '',
    rating: 0,
    art: '',
    datum: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    preis: '',
    rabatt: '',
    lieferbar: 'ja',
    javascript: false,
    typescript: false,
  });

  const { cToken } = useAuth();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddNewBook = async () => {
    const newBook = {
      id: undefined,
      version: 0,
      isbn: bookForm.isbn,
      titel: bookForm.titel,
      rating: Number(bookForm.rating),
      art: bookForm.art,
      datum: bookForm.datum,
      preis: bookForm.preis,
      rabatt: bookForm.rabatt === '' ? 0 : Number(bookForm.rabatt) / 100,
      lieferbar: bookForm.lieferbar === 'ja',
      schlagwoerter: (bookForm.javascript ? ['JAVASCRIPT'] : []).concat(
        bookForm.typescript ? ['TYPESCRIPT'] : []
      ),
    };

    try {
      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/hal',
      };

      const response = await axios.post('/api/rest', bookForm, { headers });

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        const bookSearchComponent = document.getElementById('search');
        if (bookSearchComponent) {
          bookSearchComponent.fetchData();
        }
        navigate('/search');
      } else {
        setSuccess(false);
        setError(`Fehler beim Hinzufügen des Buchs: ${response.statusText}`);
      }
    } catch (error) {
      setSuccess(false);
      setError(`Fehler beim Hinzufügen des Buchs: ${error.message}`);
    }

    console.log('Neues Buch:', newBook);

    setBookForm({
      isbn: '',
      titel: '',
      rating: 0,
      art: '',
      datum: new Date().toISOString().split('T')[0],
      preis: '',
      rabatt: '',
      lieferbar: 'ja',
      javascript: false,
      typescript: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const Table = styled('table')({
    width: '100%',
    display: 'relative',
    flexDirection: 'column',
  });

  const TableRow = styled('tr')({
    display: 'flex',
    flexDirection: 'row',
  });

  const TableCell = styled('td')({
    border: '5px solid #ddd',
    padding: '8px',
    flex: 1,
  });

  return (
    <div>
      <Grid container spacing={2}>
        <Table className="table-addBook">
          <TableRow>
            <TableCell>ISBN:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="isbn"
                value={bookForm.isbn}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Titel:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="titel"
                value={bookForm.titel}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rating:</TableCell>
            <TableCell>
              <Rating
                name="rating"
                value={bookForm.rating}
                onChange={(event, newValue) =>
                  handleInputChange({
                    target: { name: 'rating', value: newValue },
                  })
                }
                icon={<BookIcon />}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Art:</TableCell>
            <TableCell>
              <Select
                name="art"
                value={bookForm.art}
                onChange={handleInputChange}
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
                value={bookForm.datum}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Preis:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="preis"
                value={bookForm.preis}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rabatt:</TableCell>
            <TableCell>
              <TextField
                type="text"
                name="rabatt"
                value={bookForm.rabatt}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lieferbar:</TableCell>
            <TableCell>
              <RadioGroup
                name="lieferbar"
                value={bookForm.lieferbar}
                onChange={handleInputChange}
              >
                <FormControlLabel value="ja" control={<Radio />} label="Ja" />
                <FormControlLabel
                  value="nein"
                  control={<Radio />}
                  label="Nein"
                />
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Schlagwörter:</TableCell>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    name="javascript"
                    checked={bookForm.javascript}
                    onChange={handleInputChange}
                  />
                }
                label="JavaScript"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="typescript"
                    checked={bookForm.typescript}
                    onChange={handleInputChange}
                  />
                }
                label="TypeScript"
              />
            </TableCell>
          </TableRow>
        </Table>
      </Grid>
      <Grid>
        <Button variant="contained" onClick={handleAddNewBook}>
          Buch anlegen
        </Button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Grid>
    </div>
  );
};

export default AddNewBook;
