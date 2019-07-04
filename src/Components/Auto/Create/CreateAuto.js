import React, { useState, useRef, useEffect } from "react";
import Input from "@material-ui/core/Input";
import AddIcon from "@material-ui/icons/Add";
import Rating from "material-ui-rating";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import "./CreateAuto.scss";

function CreateAuto() {
  const [state, setState] = useState({
    manufacturerValue: "",
    modelValue: "",
    descValue: "",
    ratingValue: 0,
    imagePrev: null,
    image: null
  });

  return (
    <div className="create">
      <div className="create__section">
        <Input
          placeholder="Manufacturer"
          value={state.manufacturerValue}
          className="man__input"
          onChange={e => setState({...state, manufacturerValue: e.target.value})}
          inputProps={{
            "aria-label": "Manufacturer"
          }}
        />
        <Input
          placeholder="Model"
          className="model__input"
          value={state.modelValue}
          onChange={e => setState({...state, modelValue: e.target.value})}
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
          onChange={e => setState({...state, descValue: e.target.value})}
          className="desc__input"
          inputProps={{
            "aria-label": "Model"
          }}
        />
        <div className="rating">
        <Rating
          value={state.ratingValue}
          max={5}
          onChange={value => setState({...state, ratingValue: value})}
        />
        </div>
      </div>
    </div>
  );
}

CreateAuto.propTypes = {};

export default CreateAuto;
