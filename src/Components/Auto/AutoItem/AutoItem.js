import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { addComment } from "../../../store/auto/actions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Comment from "../Comment/";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Rating from "material-ui-rating";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import "./AutoItem.scss";

function AutoItem(props) {
  const { car } = props.location.state;
  const [comment, setComment] = useState(car.comment);
  const [input, setInput] = useState("");

  const addComment = () => {
    if (input !== "") {
      const user = props.user.displayName
        ? props.user.displayName
        : props.user.email;
      const arr = comment ? comment : [];
      const obj = {
        comment: input,
        name: user,
        photoURL: props.user.photoURL ? props.user.photoURL : ""
      };
      arr.push(obj);
      props.addComment(car.id, arr);
      setComment(arr);
      setInput("");
    }
  };

  const openImageSrc = () => {
    window.open(car.imageUrl, "_blank");
  };

  const onTop = () => {
    window.scrollTo({
      top: 0
    });
  };
  useEffect(() => {
    onTop();
  }, []);

  return (
    <Card className="car">
      <CardActionArea>
        <CardMedia
          className="car__media"
          image={car.imageUrl}
          title={car.name}
          onClick={() => openImageSrc()}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {car.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="car__desc"
          >
            {car.descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Rating className="rating" value={car.rating} max={5} disabled={true} />
      <Button
        size="small"
        color="primary"
        variant="contained"
        className="button__back"
        onClick={() => history.push("/auto")}
      >
        To List Cars
      </Button>
      <CardActions>
        <div className="comment__add">
          <Input
            placeholder="Add Comment"
            className="comment__input"
            onChange={e => setInput(e.target.value)}
            value={input}
          />
          <Fab
            color="primary"
            aria-label="Add"
            size="small"
            onClick={() => addComment()}
          >
            <AddIcon />
          </Fab>
        </div>
      </CardActions>
      <Typography variant="h6" component="h6" style={{ marginLeft: "2%" }}>
        {comment ? "Комментарии:" : "Пока Комментариев Нет"}
      </Typography>
      {comment &&
        comment.map((el, index) => <Comment comment={el} key={index} />)}
    </Card>
  );
}

AutoItem.propTypes = {
  user: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.AuthReducers.user
  };
};
const mapDispatchToProps = {
  addComment
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AutoItem);
