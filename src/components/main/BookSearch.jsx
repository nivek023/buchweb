import { Check, Close, Search, Delete } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
  const [buchData, setBuchData] = useState([]);
  const [searchIsbn, setSearchIsbn] = useState('');
  const [searchTitel, setSearchTitel] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [ratingOptions, setRatingOptions] = useState([]);
  const [isLieferbar, setIsLieferbar] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearchError(false);
    setShowTable(true);
    try {
      let apiUrl = '/api/rest';
      const searchParams = [
        { term: 'isbn', value: searchIsbn },
        { term: 'titel', value: searchTitel },
        { term: 'rating', value: selectedOption },
        { term: 'lieferbar', value: isLieferbar },
        { term: 'art', value: radioValue },
      ];
      searchParams.forEach((param) => {
        apiUrl = appendSearchTerm(apiUrl, param.term, param.value);
      });

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBuchData(
        Array.isArray(data._embedded.buecher) ? data._embedded.buecher : []
      );
      setSearchError(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchError(true);
    }
  };

  function appendSearchTerm(apiUrl, searchTerm, searchValue) {
    return searchValue
      ? `${apiUrl}${
          apiUrl.includes('?') ? '&' : '?'
        }${searchTerm}=${searchValue}`
      : apiUrl;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Failed to fetch ratings');
        }
        const data = await response.json();
        const ratings = [
          ...new Set(data._embedded.buecher.map((buch) => buch.rating)),
        ];
        setRatingOptions(ratings);
        setSearchError(false);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setSearchError(true);
      }
    };
    fetchData();
  }, []);

  const buchDataWithUniqueIsbn = buchData.map((buch) => ({
    ...buch,
    uniqueIsbn: buch.isbn,
  }));

  const navigateToDetails = (params) => {
    navigate(`/details/${params.row.uniqueIsbn}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Suchformular
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Isbn"
              variant="outlined"
              fullWidth
              value={searchIsbn}
              onChange={(e) => setSearchIsbn(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Titel"
              placeholder="Den Titel oder einen Teil davon"
              variant="outlined"
              fullWidth
              value={searchTitel}
              onChange={(e) => setSearchTitel(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                label="Rating"
              >
                {ratingOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1.4} sm={1.4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isLieferbar}
                  onChange={(e) => setIsLieferbar(e.target.checked)}
                  color="primary"
                />
              }
              label="ist Lieferbar"
            />
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              aria-label="Radio options"
              name="radio-options"
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
              row
            >
              <FormControlLabel
                value="DRUCKAUSGABE"
                control={<Radio />}
                label="Druckausgabe"
              />
              <FormControlLabel
                value="KINDLE"
                control={<Radio />}
                label="Kindle"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={1.2} sm={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Search />}
              onClick={handleSearch}
              style={{ marginBottom: '20px' }}
            >
              Suche
            </Button>
          </Grid>
        </Grid>
        {searchError ? (
          <Typography>Keine Bücher gefunden.</Typography>
        ) : showTable ? (
          <div style={{ height: 371, width: '100%' }}>
            <DataGrid
              rows={buchDataWithUniqueIsbn}
              getRowId={(row) => row.uniqueIsbn}
              onRowClick={navigateToDetails}
              columns={[
                { field: 'isbn', headerName: 'Isbn', flex: 1 },
                {
                  field: 'titel',
                  headerName: 'Titel',
                  flex: 1,
                  renderCell: (params) => params.value?.titel,
                },
                { field: 'rating', headerName: 'Rating', flex: 1 },
                {
                  field: 'lieferbar',
                  headerName: 'ist lieferbar',
                  flex: 1,
                  renderCell: (params) =>
                    params.value ? <Check /> : <Close />,
                },
                { field: 'art', headerName: 'Art', flex: 1 },
                {
                  field: 'schlagwoerter',
                  headerName: 'Schlagwörter',
                  flex: 2,
                },
                {
                  flex: 1,
                  renderCell: () => (
                    <IconButton
                      aria-label="delete"
                      onClick={(event) => {
                        event.stopPropagation();
                        // Funktion zum Löschen
                      }}
                    >
                      <Delete />
                    </IconButton>
                  ),
                },
              ]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default BookSearch;
