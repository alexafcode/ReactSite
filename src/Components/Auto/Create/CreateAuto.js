import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import AddIcon from "@material-ui/icons/Add";
import Rating from "material-ui-rating";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { DropzoneArea } from "material-ui-dropzone";
import helper from "../../Helpers/Helper";
import "./CreateAuto.scss";

function CreateAuto() {
  const [state, setState] = useState({
    manufacturerValue: "",
    modelValue: "",
    descValue: "",
    ratingValue: 0,
    blobImagePreview: null,
    blobImage: null
  });

  const dropFile = async image => {
    if (image[0] !== undefined) {
      // const imageName = image[0].name;
      let imageUrl = "";
      const fr = new FileReader();
      fr.readAsDataURL(image[0]);
      fr.addEventListener("load", () => {
        imageUrl = fr.result;
      });
      const config = {
        file: image[0],
        maxSize: 600
      };
      const configPreview = {
        file: image[0],
        maxSize: 400
      };
      setState({
        ...state,
        blobImage: await helper(config),
        blobImagePreview: await helper(configPreview)
      });
    } else {
      console.log("error Upload");
    }
  };

  const validFields = () => {
    console.log("state", state);
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
    const valid = validFields();
    if (valid) {
      console.log("valid");
    } else {
      // ToDo Error Label
      console.log("not Valid");
    }
  };

  return (
    <div className="create">
      <div className="create__section">
        <Input
          placeholder="Manufacturer"
          value={state.manufacturerValue}
          className="man__input"
          onChange={e =>
            setState({ ...state, manufacturerValue: e.target.value })
          }
          inputProps={{
            "aria-label": "Manufacturer"
          }}
        />
        <Input
          placeholder="Model"
          className="model__input"
          value={state.modelValue}
          onChange={e => setState({ ...state, modelValue: e.target.value })}
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
          onChange={e => setState({ ...state, descValue: e.target.value })}
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
    </div>
  );
}

CreateAuto.propTypes = {};

export default CreateAuto;
