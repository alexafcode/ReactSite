import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import history from "../../../history";

const useStyles = makeStyles({
  card: {
    maxWidth: "45%",
    marginBottom: "2%",
    margin: "auto"
  },
  media: {
    height: 250
  },
  desc: {
    height: 160,
    overflow: "hidden"
  }
});

export default function AutoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardActionArea onClick={() => history.push(`/auto/${props.car.id}`, props)}>
        <CardMedia
          className={classes.media}
          image={
            props.car.imageUrlPrev ? props.car.imageUrlPrev : props.car.imageUrl
          }
          title={props.car.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.car.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {props.car.descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Open
        </Button> */}
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}
