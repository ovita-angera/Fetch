import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
 console.log(`Dialog open: ${open}`);

 return (
    <Dialog open={open}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this file?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          console.log("Cancel button clicked");
          onClose();
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          console.log("Confirm button clicked");
          onConfirm();
        }} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
 );
};

ConfirmationDialog.propTypes = {
 open: PropTypes.bool.isRequired,
 onClose: PropTypes.func.isRequired,
 onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
