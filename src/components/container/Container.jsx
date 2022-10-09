import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

import { Post } from "../../components";
import { getPosts } from "../../services/actions/postAction";

import "./container.scss";

const Container = () => {
  const [form, setForm] = useState({
    title: "",
    creator_id: "",
    date: "",
  });

  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  useEffect(() => {
    // load post data to redux store
    dispatch(getPosts(form));
  }, [dispatch]);

  // get current user details from redux store
  const dataPost = useSelector((state) => state.POSTS);
  let avatar = ""

  return (
    <div className="container">
      <Box className="container-wrapper">
        <div className="container-top">
          <Grid
            className="grid"
            container
            spacing={{ xs: 2, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {dataPost.map((val, index) => (
              <Grid className="grids" xs={4} sm={4} md={4} key={index}>
                {val.creator_details.map((value) => {
                  {
                    avatar=value.Avatar
                  }
                })}
                <Post
                  avatar_img={avatar}
                  title={val.title}
                  subheader={val.date}
                  card_img={val.image}
                  description={val.description}
                  postID={val._id}
                  creatorID={val.creator_id}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default Container;
