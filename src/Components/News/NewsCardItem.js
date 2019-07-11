import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
        <CardContent className="card__title">
          <div className="card__text">
            {news.title}
          </div>
          <ExpansionPanel style={{ boxShadow: "none" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            />
            <ExpansionPanelDetails>
              <Typography>{news.description}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
