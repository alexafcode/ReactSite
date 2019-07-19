import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DropzoneArea } from "material-ui-dropzone";
import { resizeImage } from "../Helpers/Helper";
import { updateUserProfile, loadFavCars } from "../../store/register/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import history from "../../history";
import "./PersonalCabinet.scss";

const PersonalCabinet = props => {
  const [state, setState] = useState({
    disabled: true,
    blobImage: null,
    imageName: null,
    changePhoto: false,
    displayName: props.user ? props.user.displayName : ""
  });

  const stylus = {
    media: {
      backgroundImage: `url(${
        props.user.photoURL
          ? props.user.photoURL
          : "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/128x128/plain/user.png"
      })`
    }
  };

  const dropFile = async image => {
    if (image[0] !== undefined) {
      const fr = new FileReader();
      fr.readAsDataURL(image[0]);
      const config = {
        file: image[0],
        maxSize: 150
      };
      setState({
        ...state,
        blobImage: await resizeImage(config),
        imageName: image[0].name,
        changePhoto: true
      });
    } else {
      console.error("error Upload");
    }
  };

  const saveProfile = () => {
    props.updateUserProfile(
      props.user.email,
      state.displayName,
      state.blobImage,
      state.changePhoto
    );
  };
  useEffect(() => {
    props.loadFavCars(props.user.email);
  }, []);

  return (
    <div className="cabinet">
      <div className="cabinet__media">
        <div className="image" style={stylus.media} />
        {!state.disabled && (
          <div className="loader">
            <DropzoneArea
              onChange={dropFile}
              className="dropzone"
              showPreviews={true}
              showPreviewsInDropzone={false}
              maxFileSize={5000000}
              filesLimit={1}
            />
          </div>
        )}
      </div>
      <div className="cabinet__text">
        {!state.disabled && (
          <TextField
            disabled={state.disabled}
            label="Display Name"
            margin="normal"
            value={state.displayName}
            onChange={e => setState({ ...state, displayName: e.target.value })}
          />
        )}
        <TextField
          disabled
          label="Email"
          margin="normal"
          value={props.user.email}
        />
        <div className="button__container">
          {state.disabled && (
            <Button
              variant="contained"
              color="primary"
              className="button__change"
              onClick={() => setState({ ...state, disabled: !state.disabled })}
            >
              Изменить
            </Button>
          )}
          {!state.disabled && (
            <div className="button__submit">
              <Button
                variant="contained"
                color="primary"
                className="button__save"
                onClick={() => saveProfile()}
              >
                Сохранить
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="button__cancel"
                onClick={() =>
                  setState({ ...state, disabled: !state.disabled })
                }
              >
                Отмена
              </Button>
            </div>
          )}
        </div>
        {props.loading && <LinearProgress />}
        <div className="favorite">
          {props.favariteCars &&
            props.favariteCars.map((el, index) => (
              // <li key={index} onClick={() => history.push(`/auto/${el.id}`)}>
              <li key={index}>{el.name}</li>
            ))}
        </div>
      </div>
    </div>
  );
};

PersonalCabinet.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  favariteCars: PropTypes.array
};

const mapStateToProps = state => {
  return {
    user: state.AuthReducers.user,
    loading: state.AuthReducers.loading,
    favariteCars: state.AuthReducers.favariteCars
  };
};

const mapDispatchToProps = {
  updateUserProfile,
  loadFavCars
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalCabinet);
