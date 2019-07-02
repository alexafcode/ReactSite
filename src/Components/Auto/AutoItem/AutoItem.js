import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Comment from "./Comment";

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
      <CardActions>
        {/* <Button size="small" color="primary">
          Комментировать
        </Button> */}
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
      <Typography variant="h6" component="h6" style={{ marginLeft: "2%" }}>
        {car.comment ? "Комментарии:" : "Пока Комментариев Нет"}
      </Typography>
      {car.comment &&
        car.comment.map((el, index) => <Comment comment={el} key={index} />)}
    </Card>
  );
}
export default withRouter(AutoItem);
