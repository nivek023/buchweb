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
  TableCell,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const AddNewBook = ({ book: newBook, etag }) => {
  const { cToken } = useContext(AuthContext);
  const [newBook, setBookForm] = useState(newBook);
  const { id = 'default' } = useParams();

  const navigate = useNavigate();

  console.log(newBook);
  console.log(etag);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm({
      ...newBook,
      [name]: value,
    });
  };

  const bookDTO = {
    isbn: newBook.isbn,
    rating: parseInt(newBook.rating, 10),
    art: newBook.art,
    preis: parseFloat(newBook.preis),
    rabatt: parseFloat(newBook.rabatt),
    lieferbar: newBook.lieferbar,
    datum: newBook.datum,
    homepage: newBook.homepage,
    schlagwoerter: newBook.schlagwoerter,
  };

  const handleAddNewBook = async (cToken) => {
    const url = '/api/rest';

    if (!cToken) {
      throw new Error('No token available');
    }

    const headers = {
      Authorization: `Bearer ${cToken}`,
      'Content-Type': 'application/json',
      'If-Match': etag,
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
  };

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
            <TableCell>Homepage: </TableCell>
            <TextField
              type="text"
              name="homepage"
              value={bookForm.homepage}
              onChange={handleInputChange}
            ></TextField>
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

AddNewBook.propTypes = {
  book: PropTypes.shape({}).isRequired,
};
