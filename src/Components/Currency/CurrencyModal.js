import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function CurrencyModal(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle>Current Exchange Rate</DialogTitle>
        <DialogContent>
          {props.currencies.map((c, index) => (
            <DialogContentText key={index}>
              <u>{c.name}</u>
              <br />
              <b>{c.value} Рублей</b>
              <br /> за {c.nominal} {c.nominal == 1 ? "единицу" : "единиц"}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CurrencyModal.propTypes = {
  currencies: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default CurrencyModal;
