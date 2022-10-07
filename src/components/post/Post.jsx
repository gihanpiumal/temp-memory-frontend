import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";

import "./post.scss";

const Post = ({ avatar_img, title, subheader, card_img, description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const users = useSelector((state) => state.USERS);

  const showClick = () => {
    console.log(users);
  };
  return (
    <div className="post">
      <div className="post-wrapper">
        <Card sx={{ maxWidth: 400 }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {/* <img
                  src={require(`../../images/dp-new.jpeg`)}
                  alt="profile image"
                /> */}
                G
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
            subheader={subheader}
          />

          <CardMedia
            component="img"
            height="194"
            image={require(`../../images/${card_img}`)}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={showClick} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Post;
