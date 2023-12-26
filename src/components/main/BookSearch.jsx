import { Search, Delete } from '@mui/icons-material';
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
import { DataGrid, deDE } from '@mui/x-data-grid';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Box from '@mui/material/Box';

const BookSearch = () => {
  const [buchData, setBuchData] = useState([]);
  const [searchIsbn, setSearchIsbn] = useState('');
  const [searchTitel, setSearchTitel] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [ratingOptions, setRatingOptions] = useState([]);
  const [isJavaScript, setIsJavaScript] = useState(false);
  const [isTypeScript, setIsTypeScript] = useState(false);

  const [radioValue, setRadioValue] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { cToken } = useContext(AuthContext);

  const navigate = useNavigate();

  function getIdFromLinks(_links) {
    let selfLink = null;

    if (_links !== undefined) {
      const { self } = _links;
      if (self !== undefined) {
        selfLink = self.href;
      }
    }

    let id = 'N/A';
    if (selfLink !== null) {
      const lastSlash = selfLink.lastIndexOf('/');
      id = selfLink.slice(lastSlash + 1);
    }

    return id;
  }

  const handleSearch = async () => {
    setSearchError(false);
    setShowTable(true);
    try {
      let apiUrl = '/api/rest';
      const searchParams = [
        { term: 'isbn', value: searchIsbn },
        { term: 'titel', value: searchTitel },
        { term: 'rating', value: selectedOption },
        { term: 'javascript', value: isJavaScript },
        { term: 'typescript', value: isTypeScript },
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
        const response = await fetch('/api/rest');
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

  const buchDataWithUniqueId = buchData.map((buch) => ({
    ...buch,
    uniqueIsbn: buch.isbn,
    id: getIdFromLinks(buch._links),
  }));

  console.log(buchDataWithUniqueId);

  const navigateToDetails = (params) => {
    navigate(`/details/${params.row.id}`);
  };

  const handleDeleteRow = async (id, cToken) => {
    try {
      if (!cToken) {
        throw new Error('No token available');
      }

      const headers = {
        Authorization: `Bearer ${cToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`/api/rest/${id}`, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      const updatedRows = buchDataWithUniqueId.filter((row) => row.id !== id);
      setBuchData(updatedRows);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
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
              style={{ marginBottom: '20px' }}
            >
              {ratingOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isTypeScript}
                onChange={(e) => setIsTypeScript(e.target.checked)}
                color="primary"
              />
            }
            label="TypeScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isJavaScript}
                onChange={(e) => setIsJavaScript(e.target.checked)}
                color="primary"
              />
            }
            label="JavaScript"
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
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={deDE.components.MuiDataGrid.defaultProps.localeText}
            rows={buchDataWithUniqueId}
            getRowId={(row) => row.id}
            onRowClick={navigateToDetails}
            columns={[
              {
                field: 'id',
                headerName: 'Id',
                width: 100,
              },
              {
                field: 'isbn',
                headerName: 'Isbn',
                width: 180,
              },
              {
                field: 'titel',
                headerName: 'Titel',
                renderCell: (params) => params.value?.titel,
                width: 150,
              },
              {
                field: 'rating',
                headerName: 'Rating',
                width: 150,
              },
              {
                field: 'art',
                headerName: 'Art',
                width: 190,
              },
              {
                field: 'schlagwoerter',
                headerName: 'Schlagwörter',
                width: 260,
              },
              {
                field: 'actions',
                headerName: 'Aktionen',
                width: 150,
                renderCell: (params) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="search">
                      <Search />
                    </IconButton>
                    {cToken && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          aria-label="delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteRow(params.row.id, cToken);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    )}
                  </div>
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
        </Box>
      ) : null}
    </div>
  );
};

export default BookSearch;
