import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./NewsCardItem.scss";

const NewsCardItem = props => {
  const { news } = props;
  const redirectToNewsPage = () => {
    window.open(news.url, "_blank");
  };
  return (
    <Card className="card">
      <CardActionArea>
        <CardMedia
          className="card__media"
          image={news.urlToImage}
          title={news.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {news.title}
          </Typography>
          {/* <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="card__desc"
          >
            {news.descriptions}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => redirectToNewsPage()}
        >
          To News Page
        </Button>
      </CardActions>
    </Card>
  );
};

// ToDo
// NewsCardItem.propTypes = {
// };
export default NewsCardItem;
