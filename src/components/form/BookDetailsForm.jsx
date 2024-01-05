import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Rating, Button, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

import { formatDate, formatPreis } from './internatUtil';
import ConfirmDelete from '../dialog/ConfirmDelete.jsx';

const BookDetailsForm = ({ book, deleteBook, writeAccess }) => {
  const {
    isbn,
    rating,
    art,
    preis,
    rabatt,
    lieferbar,
    datum,
    homepage,
    schlagwoerter,
    titel: { titel },
  } = book;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { id = 'default' } = useParams();
  const bookRabattP = Math.round(rabatt * 100);
  const navigate = useNavigate();
  const gridSpacer = <Grid item xs={6} />;
  const isMobile = useMediaQuery('(max-width:400px)');
  const exists = (value) => {
    return (
      value !== null && value !== undefined && value !== '' && value !== 'null'
    );
  };
  const renderNullableValue = (value) => {
    return exists(value) ? value : 'N/A';
  };
  const handleBtenClick = () => {
    navigate(`/edit/${id}`);
  };
  const handleDeleteClick = () => {
    setDeleteConfirmation(true);
  };
  const handleDeleteConfirm = () => {
    deleteBook(id);
    setDeleteConfirmation(false);
    navigate('/search');
  };
  const handleDeleteCancel = () => {
    setDeleteConfirmation(false);
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Buchtitel: {titel}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>ISBN:</strong> {isbn}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={12}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <Rating name="read-only" value={rating} readOnly />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            {exists(lieferbar)
              ? `Buch kann ${lieferbar ? '' : 'leider nicht'} geliefert werden`
              : `Lieferstatus unbekannt`}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={5}>
          <Typography
            variant="body1"
            style={{ textAlign: 'left', marginRight: '20px' }}
          >
            <strong>Art:</strong> {renderNullableValue(art)}
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          {!isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBtenClick}
              disabled={!writeAccess}
            >
              <EditIcon />
            </Button>
          )}
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={5}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Preis:</strong> {formatPreis(preis)}€
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          {!isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteClick}
              disabled={!writeAccess}
            >
              <DeleteIcon />
            </Button>
          )}
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Rabatt:</strong>{' '}
            {exists(rabatt) ? `${bookRabattP}%` : 'N/A'}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Datum:</strong> {renderNullableValue(formatDate(datum))}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Homepage: </strong>
            {exists(homepage) ? (
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                {homepage}
              </a>
            ) : (
              'N/A'
            )}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          <Typography variant="body1" style={{ textAlign: 'left' }}>
            <strong>Schlagwörter:</strong>{' '}
            {exists(schlagwoerter[0]) ? schlagwoerter.join(', ') : 'N/A'}
          </Typography>
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          {isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBtenClick}
              disabled={!writeAccess}
            >
              <EditIcon />
            </Button>
          )}
        </Grid>
        {gridSpacer}
        <Grid item xs={6}>
          {isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteClick}
              disabled={!writeAccess}
            >
              <DeleteIcon />
            </Button>
          )}
        </Grid>
      </Grid>
      <ConfirmDelete
        open={deleteConfirmation}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

BookDetailsForm.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    art: PropTypes.string.isRequired,
    preis: PropTypes.number.isRequired,
    rabatt: PropTypes.number.isRequired,
    lieferbar: PropTypes.bool.isRequired,
    datum: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
    schlagwoerter: PropTypes.arrayOf(PropTypes.string).isRequired,
    titel: PropTypes.shape({
      titel: PropTypes.string.isRequired,
      untertitel: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
  writeAccess: PropTypes.bool.isRequired,
};
export default BookDetailsForm;
