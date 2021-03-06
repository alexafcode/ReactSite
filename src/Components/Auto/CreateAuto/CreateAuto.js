import React, { useState } from "react";
import { connect } from "react-redux";
import Input from "@material-ui/core/Input";
import AddIcon from "@material-ui/icons/Add";
import Rating from "material-ui-rating";
import Loading from "../../Layouts/Loading";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from "material-ui-dropzone";
import { resizeImage } from "../../../helpers/helpers-image";
import { uploadAuto } from "../../../store/auto/actions";
import "./CreateAuto.scss";

function CreateAuto(props) {
  const { uploadAuto, error, errorMessage, loading } = props;
  const [state, setState] = useState({
    manufacturerValue: "",
    modelValue: "",
    descValue: "",
    ratingValue: 0,
    blobImagePreview: null,
    blobImage: null,
    imageName: ""
  });

  const dropFile = async image => {
    if (image[0] !== undefined) {
      const fr = new FileReader();
      fr.readAsDataURL(image[0]);
      const config = {
        file: image[0],
        maxSize: 700
      };
      const configPreview = {
        file: image[0],
        maxSize: 500
      };
      setState({
        ...state,
        blobImage: await resizeImage(config),
        blobImagePreview: await resizeImage(configPreview),
        imageName: image[0].name
      });
    } else {
      console.log("error Upload");
    }
  };

  const validFields = () => {
    if (
      state.manufacturerValue !== "" &&
      state.modelValue !== "" &&
      state.descValue !== "" &&
      state.blobImage &&
      state.blobImagePreview
    ) {
      return true;
    }
  };

  const uploadCar = () => {
    if (validFields()) {
      // ToDo Spinner
      uploadAuto(state);
    } else {
      // ToDo Error Label
      console.log("not Valid");
    }
  };

  const errorTextField = error && (
    <TextField
      error
      id="standard-error"
      label="Error"
      value={errorMessage ? errorMessage : ""}
      margin="normal"
      InputProps={{
        readOnly: true
      }}
    />
  );

  return (
    <div className="create">
      {errorTextField}
      <div className="create__section">
        <Input
          placeholder="Manufacturer"
          value={state.manufacturerValue}
          className="input"
          onChange={({ target }) =>
            setState({ ...state, manufacturerValue: target.value })
          }
          inputProps={{
            "aria-label": "Manufacturer"
          }}
        />
        <Input
          placeholder="Model"
          className="model__input"
          value={state.modelValue}
          onChange={({ target }) =>
            setState({ ...state, modelValue: target.value })
          }
          inputProps={{
            "aria-label": "Model"
          }}
        />
        <Input
          placeholder="Description"
          multiline
          rows={2}
          rowsMax={10}
          value={state.descValue}
          onChange={({ target }) =>
            setState({ ...state, descValue: target.value })
          }
          className="desc__input"
          inputProps={{
            "aria-label": "Model"
          }}
        />
        <div className="rating">
          <Rating
            value={state.ratingValue}
            max={5}
            onChange={value => setState({ ...state, ratingValue: value })}
          />
        </div>
        <div className="loader">
          <DropzoneArea
            onChange={dropFile}
            showPreviews={true}
            showPreviewsInDropzone={false}
            maxFileSize={5000000}
            filesLimit={1}
          />
        </div>
        <Fab color="primary" aria-label="Add" onClick={uploadCar}>
          <AddIcon />
        </Fab>
      </div>
      {loading && <Loading />}
    </div>
  );
}

CreateAuto.propTypes = {
  loading: PropTypes.bool.isRequired,
  uploadAuto: PropTypes.func.isRequired
};

const mapStateToProps = ({ AutoReducers }) => {
  return {
    loading: AutoReducers.loading
  };
};
const mapDispatchToProps = {
  uploadAuto
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuto);
