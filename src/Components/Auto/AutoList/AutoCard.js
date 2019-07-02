import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import history from "../../../history";
import "./AutoCard.scss"

export default function AutoCard(props) {

  return (
    <Card className="card__item">
        <CardActionArea onClick={() => history.push(`/auto/${props.car.id}`, props)}>
        <CardMedia
          className="card__media"
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
            className="card__desc"
          >
            {props.car.descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Open
        </Button> */}
      </CardActions>
    </Card>
  );
}
