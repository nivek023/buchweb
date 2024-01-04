import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Löschen Bestätigen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sind Sie sicher, dass Sie dieses Buch löschen wollen?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Abbruch
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Bestätigen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDelete;
