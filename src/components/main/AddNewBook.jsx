import { useState } from 'react'

import {
  TextField,
  Checkbox, 
  FormControlLabel,
  Button, 
  Grid,
  Table, 
  TableBody, 
  TableContainer,
  TableCell, 
  TableRow,
  Radio, 
  RadioGroup,
  Select,
  MenuItem, 
  Rating
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

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
  })

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
    }

    try {
      let apiUrl = '/api/rest'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      })

      const data = await response.json();
      setBookForm(
        Array.isArray(data._embedded.buecher) ? data._embedded.buecher : []
      );

      if (response.ok) {
        console.log('Buch erfolgreich hinzugefügt')
      } else {
        console.error('Fehler beim Hinzufügen des Buchs:', response.statusText)
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Buchs:', error)
    }

    console.log('Neues Buch:', newBook)

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
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div>
      <Grid container spacing={3}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
            <Grid item xs={12} sm={12}>
              <TableCell>ISBN:</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="isbn"
                  value={bookForm.isbn}
                  onChange={handleInputChange}
                />
              </TableCell>
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
              <TableCell>Titel:</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="titel"
                  value={bookForm.titel}
                  onChange={handleInputChange}
                />
              </TableCell>
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
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
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
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
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
              <TableCell>Datum:</TableCell>
              <TableCell>
                <TextField
                  type="date"
                  name="datum"
                  value={bookForm.datum}
                  onChange={handleInputChange}
                />
              </TableCell>
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
              <TableCell>Preis:</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="preis"
                  value={bookForm.preis}
                  onChange={handleInputChange}
                />
              </TableCell>
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
              <TableCell>Rabatt:</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="rabatt"
                  value={bookForm.rabatt}
                  onChange={handleInputChange}
                />
              </TableCell>
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
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
              </Grid>
            </TableRow>
            <TableRow>
            <Grid item xs={12} sm={12}>
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
            </Grid>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid>
      <Button variant="contained" onClick={handleAddNewBook}>
        Buch anlegen
      </Button>
      </Grid>
      </Grid>
    </div>
  )
}

export default AddNewBook
