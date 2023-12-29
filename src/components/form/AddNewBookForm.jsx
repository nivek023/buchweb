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


const AddNewBookForm = ({
  addNewBook,
  handleInputChange,
  handleAddNewBook,
  success,
  error,
}) => {

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
                  value={addNewBook.isbn}
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
                  value={addNewBook.titel.titel}
                  onChange={handleInputChange}
                  placeholder="Titel"
                  fullWidth
                />
                {console.log('addNewBook:', addNewBook)}
                <TextField
                  type="text"
                  name="untertitel"
                  value={addNewBook.titel.untertitel || undefined}
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
                  value={addNewBook.rating}
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
                  value={addNewBook.art}
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
                  value={addNewBook.datum}
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
                  value={addNewBook.preis}
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
                  value={addNewBook.rabatt}
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
                  value={addNewBook.lieferbar}
                  onChange={handleInputChange}
                  fullWidth
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
              <TableCell>Homepage:</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="homepage"
                  value={addNewBook.homepage}
                  onChange={handleInputChange}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Schlagwörter: </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="javascript"
                      checked={addNewBook.schlagwoerter.javascript}
                      onChange={handleInputChange}
                    />
                  }
                  label="JavaScript"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="typescript"
                      checked={addNewBook.schlagwoerter.typescript}
                      onChange={handleInputChange}
                    />
                  }
                  label="TypeScript"
                />
              </TableCell>
            </TableRow>
          </Table>
          <Button
            variant="contained"
            style={{ alignItems: 'center', width: 'auto' }}
            onClick={handleAddNewBook}
          >
            Buch anlegen
          </Button>
          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Grid>
      </div>
    )
  );
};

AddNewBookForm.propTypes = {
  addNewBook: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    art: PropTypes.string.isRequired,
    preis: PropTypes.string.isRequired,
    rabatt: PropTypes.string.isRequired,
    lieferbar: PropTypes.oneOf(['ja', 'nein']).isRequired,
    datum: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    schlagwoerter: PropTypes.arrayOf(PropTypes.string).isRequired,
    titel: PropTypes.shape({
      titel: PropTypes.string.isRequired,
      untertitel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddNewBook: PropTypes.func.isRequired,
  success: PropTypes.bool,
  error: PropTypes.string,
};

export default AddNewBookForm;
