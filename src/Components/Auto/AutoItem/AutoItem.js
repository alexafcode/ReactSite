import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { addComment } from "../../../store/auto/actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Comment from "./Comment";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Rating from "material-ui-rating";

const useStyles = makeStyles({
  card: {
    maxWidth: "60%",
    marginBottom: "2%",
    marginTop: "2%",
    margin: "auto"
  },
  media: {
    height: 600
  },
  desc: {
    // height: 260,
    // overflow: "hidden"
  }
});

function AutoItem(props) {
  const classes = useStyles();
  const { car } = props.location.state;
  const [comment, setComment] = useState(car.comment);
  const [input, setInput] = useState("");

  const addComment = () => {
    const user = props.user.displayName
      ? props.user.displayName
      : props.user.email;
    let arr = comment ? comment : [];
    let obj = {
      comment: input,
      name: user,
      photoURL: props.user.photoURL ? props.user.photoURL : ""
    };
    arr.push(obj);
    props.addComment(car.id, arr);
    setComment(arr);
    setInput("");
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={car.imageUrl}
          title={car.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {car.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {car.descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Rating value={car.rating} max={5} disabled={true} />
      <CardActions>
        <div className="comment__add">
          <Input
            placeholder="Add Comment"
            className={classes.input}
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AutoItem);
