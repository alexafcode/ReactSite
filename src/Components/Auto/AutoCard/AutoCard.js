import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import history from "../../../history";
import "./AutoCard.scss";

function AutoCard(props) {
  const { id, imageUrlPrev, imageUrl, name, descriptions } = props.car;

  return (
    <Card className="card__item">
      <CardActionArea onClick={() => history.push(`/auto/${id}`, props)}>
        <CardMedia
          className="media"
          image={imageUrlPrev ? imageUrlPrev : imageUrl}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="desc"
          >
            {descriptions}
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

AutoCard.propTypes = {
  car: PropTypes.object.isRequired
};

export default AutoCard;
