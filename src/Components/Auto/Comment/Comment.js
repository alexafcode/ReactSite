import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    width: "80%",
    maxWidth: 360,
    backgroundColor: palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

function CommentList(props) {
  const classes = useStyles();
  const { name, photoURL, comment } = props.comment;
  const imgUrl =
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/128x128/plain/user.png";

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src={photoURL ? photoURL : imgUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={<React.Fragment>{comment}</React.Fragment>}
        />
      </ListItem>
      <Divider light />
    </List>
  );
}

CommentList.propTypes = {
  comment: PropTypes.object.isRequired
};
export default CommentList;
