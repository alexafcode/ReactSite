import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DropzoneArea } from "material-ui-dropzone";
import { resizeImage } from "../../helpers/helpers-image";
import { updateUserProfile, loadFavCars } from "../../store/register/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./PersonalCabinet.scss";

const PersonalCabinet = props => {
  const { user, loadFavCars, loading, favoriteCars } = props;
  const [state, setState] = useState({
    disabled: true,
    blobImage: null,
    imageName: null,
    changePhoto: false
  });
  const dn = user && user.displayName ? user.displayName : "";
  const [displayName, setDisplayName] = useState(dn);

  const stylus = {
    media: {
      backgroundImage: `url(${
        user.photoURL
          ? user.photoURL
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
      user.email,
      displayName,
      state.blobImage,
      state.changePhoto
    );
  };
  useEffect(() => {
    loadFavCars(user.email);
  }, []);

  const load = loading ? <LinearProgress /> : null;

  const carsItems =
    favoriteCars &&
    favoriteCars.map((el, index) => (
      // <li key={index} onClick={() => history.push(`/auto/${el.id}`)}>
      <li key={index}>{el.name}</li>
    ));
  const buttonChange = state.disabled && (
    <Button
      variant="contained"
      color="primary"
      className="button__change"
      onClick={() => setState({ ...state, disabled: !state.disabled })}
    >
      Изменить
    </Button>
  );
  const buttonsSubmit = !state.disabled && (
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
        onClick={() => setState({ ...state, disabled: !state.disabled })}
      >
        Отмена
      </Button>
    </div>
  );
  const dropArea = !state.disabled && (
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
  );

  return (
    <div className="cabinet">
      <div className="media">
        <div className="image" style={stylus.media} />
        {dropArea}
      </div>
      <div className="text">
        {!state.disabled && (
          <TextField
            disabled={state.disabled}
            label="Display Name"
            margin="normal"
            value={displayName}
            onChange={({ target }) => setDisplayName(target.value)}
          />
        )}
        <TextField disabled label="Email" margin="normal" value={user.email} />
        <div className="buttons">
          {buttonChange}
          {buttonsSubmit}
        </div>
        {load}
        <div className="favorite">{carsItems}</div>
      </div>
    </div>
  );
};

PersonalCabinet.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  favariteCars: PropTypes.array
};

const mapStateToProps = ({ AuthReducers }) => {
  return {
    user: AuthReducers.user,
    loading: AuthReducers.loading,
    favoriteCars: AuthReducers.favoriteCars
  };
};

const mapDispatchToProps = {
  updateUserProfile,
  loadFavCars
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCabinet);
