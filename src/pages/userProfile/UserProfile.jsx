import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { message } from "antd";

import { Post } from "../../components";

import "./userprofile.scss";

const UserProfile = () => {
  // set states
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Avatar: "",
    password: "",
  });

  const temp_data = [
    {
      avatar_img: "",
      title: "Shrimp and Chorizo Paella",
      subheader: "September 14, 2016",
      card_img: "img1.jpg",
      description:
        "This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal",
    },
    {
      avatar_img: "",
      title: "Shrimp and Chorizo Paella",
      subheader: "January 17, 2021",
      card_img: "img2.avif",
      description:
        "This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal",
    },
    {
      avatar_img: "",
      title: "Shrimp and Chorizo Paella",
      subheader: "January 17, 2021",
      card_img: "img2.avif",
      description:
        "This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal",
    },
    {
      avatar_img: "",
      title: "Shrimp and Chorizo Paella",
      subheader: "January 17, 2021",
      card_img: "img2.avif",
      description:
        "This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal This impressive paella is a perfect party dish and a fun meal",
    },
  ];
  return (
    <div className="user-profile">
      <Box className="user-profile-wrapper">
        <Paper className="user-profile-left">
          <div className="user-profile-left-top">
            <div className="user-profile-left-top-title">My Profile</div>
            <div className="user-profile-left-top-avatar">
              <img
                src={require(`../../images/dp-new.jpeg`)}
                alt="profile image"
              />
            </div>
          </div>
          <div className="user-profile-left-middle">
            <div className="user-profile-left-middle-details">
              <ul>
                <li>
                  <div className="profile-data-title">First Name :</div>
                  <div className="profile-data-value">Gihan</div>
                </li>
                <li>
                  <div className="profile-data-title">Last Name :</div>
                  <div className="profile-data-value">Piumal</div>
                </li>
                <li>
                  <div className="profile-data-title">Email :</div>
                  <div className="profile-data-value">gihan@gmail.com</div>
                </li>
                <li>
                  <div className="profile-data-title">Phone :</div>
                  <div className="profile-data-value">0776603689</div>
                </li>
                <li>
                  <div className="profile-data-title">Password :</div>
                  <div className="profile-data-value">********</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-profile-left-bottom">
            <div className="user-profile-left-bottom-buttons">
              <Button
                variant="contained"
                className="user-profile-edit-button"
                // onClick={submit}
              >
                Edit
              </Button>
            </div>
            <div className="user-profile-left-bottom-buttons">
              <Button
                variant="contained"
                className="user-profile-delete-button"
                color="error"
                // onClick={submit}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Paper>
        <div className="user-profile-right">
          <div className="user-profile-right-top">
            <Grid
              className="grid"
              container
              spacing={{ xs: 2, md: 8 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {temp_data.map((val, index) => (
                <Grid className="grids" xs={4} sm={4} md={6} key={index}>
                  <Post
                    avatar_img={val.avatar_img}
                    title={val.title}
                    subheader={val.subheader}
                    card_img={val.card_img}
                    description={val.description}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default UserProfile;
