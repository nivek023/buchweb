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

AddNewBookForm.propTypes = {
  addNewBookForm: PropTypes.object.isRequired, // Beispiel: Ein Objekt wird erwartet
  handleInputChange: PropTypes.func.isRequired,
  handleAddNewBook: PropTypes.func.isRequired,
  success: PropTypes.bool,
  error: PropTypes.string,
};

const AddNewBookForm = ({
  addNewBookForm,
  handleInputChange,
  handleAddNewBook,
  success,
  error,
}) => {
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
                value={addNewBookForm.isbn}
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
                value={addNewBookForm.titel}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rating:</TableCell>
            <TableCell>
              <Rating
                name="rating"
                value={addNewBookForm.rating}
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
                value={addNewBookForm.art}
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
                value={addNewBookForm.datum}
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
                value={addNewBookForm.preis}
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
                value={addNewBookForm.rabatt}
                onChange={handleInputChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lieferbar:</TableCell>
            <TableCell>
              <RadioGroup
                name="lieferbar"
                value={addNewBookForm.lieferbar}
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
                    checked={addNewBookForm.javascript}
                    onChange={handleInputChange}
                  />
                }
                label="JavaScript"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="typescript"
                    checked={addNewBookForm.typescript}
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

export default AddNewBookForm;
