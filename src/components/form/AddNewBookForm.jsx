import {
  TextField,
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
import { useContext, useState } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';


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
const AddNewBookForm = () => {
  const { cToken } = useContext(AuthContext);
  const [editedBook, setEditedBook] = useState({
    isbn: '978-0-007-00644-1',
    rating: 0,
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: 'ja',
    datum: new Date().toISOString().split('T')[0],
    homepage: '',
    titel: {
      titel: 'hallo',
      untertitel: 'welt',
    },
    schlagwoerter: 
      ['JAVASCRIPT']
    ,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };
  const handleBtenClick = async () => {
    const url = '/api/rest';

    if (!cToken) {
      throw new Error('No token available');
    }

    const headers = {
      Authorization: `Bearer ${cToken}`,
      'Content-Type': 'application/json',
    };

    const bookDTO = {
      isbn: editedBook.isbn,
      rating: parseInt(editedBook.rating, 10),
      art: editedBook.art,
      preis: parseFloat(editedBook.preis),
      rabatt: parseFloat(editedBook.rabatt),
      lieferbar: (editedBook.lieferbar === true),
      datum: editedBook.datum,
      homepage: editedBook.homepage,
      schlagwoerter: editedBook.schlagwoerter,
      titel: editedBook.titel,
    };

    try {
      const response = await axios.post(url, bookDTO, {
        headers: headers,
      });

      if (response.status === 204) {
        return;
      } else {
        console.error('Error occurred during PUT request:', response);
      }
    } catch (error) {
      console.error('Error occurred during PUT request:', error.message);
    }
  };


  return (
    (
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
                  value={editedBook.isbn}
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
                  value={editedBook.titel.titel}
                  onChange={handleInputChange}
                  placeholder="Titel"
                  fullWidth
                />
                <TextField
                  type="text"
                  name="untertitel"
                  value={editedBook.titel.untertitel || undefined}
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
                  value={editedBook.rating}
                  onChange={handleInputChange}
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
                  value={editedBook.art}
                  onChange={handleInputChange}
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
                  value={editedBook.datum}
                  onChange={handleInputChange}
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
                  value={editedBook.preis}
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
                  value={editedBook.rabatt}
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
                  value={editedBook.lieferbar}
                  onChange={handleInputChange}
                  fullWidth
                >
                  <FormControlLabel value="true" control={<Radio />} label="Ja" />
                  <FormControlLabel
                    value="false"
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
                  value={editedBook.homepage}
                  onChange={handleInputChange}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Schlagwörter: </TableCell>
            </TableRow>
          </Table>
          <Button
      variant="contained"
      style={{ alignItems: 'center', width: 'auto' }}
      onClick={handleBtenClick}
    >
      Buch anlegen
    </Button>
        </Grid>
      </div>
    )
  );
};

export default AddNewBookForm;
