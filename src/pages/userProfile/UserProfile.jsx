import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { message, Modal } from "antd";

import { Post } from "../../components";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../services/actions/userAction";
import {
  getPosts,
} from "../../services/actions/postAction";
import { getCurrentUser } from "../../config/LocalStorage";
import { RoutesConstant } from "../../assets/constants";

import "./userprofile.scss";
import { createFilterOptions } from "@mui/material";

const UserProfile = () => {
  // schema for validation
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/)
      .messages({ "string.pattern.base": `"Please provide valide email` })
      .required(),
    phone: Joi.string()
      .required()
      .regex(
        /^(070)\d{7}$|^(071)\d{7}$|^(072)\d{7}$|^(074)\d{7}$|^(075)\d{7}$|^(076)\d{7}$|^(077)\d{7}$|^(078)\d{7}$/,
        "07xxxxxxxx"
      )
      .label("Mobile Number"),
    password: Joi.string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[@$!%*#?&])|(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
      .required()
      .label("Password")
      .messages({
        "string.pattern.base":
          "Password must contain at least 8 characters, at least one letter and one number.",
      }),
    Avatar: Joi.string().empty("").label("Profile Picture"),
  });

  // set states
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Avatar: "",
  });

  const [errors, setErrors] = useState([]);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  let curentTokenData = getCurrentUser(); // get email from token
  let objUsers = {
    email: curentTokenData.email,
  };

  let postObject = {
    title: "",
    creator_id: curentTokenData._id,
    date: "",
  };

  useEffect(() => {
    dispatch(getUsers(objUsers)); // load user data to redux store
    dispatch(getPosts(postObject));
  }, [dispatch]);

  const dataUser = useSelector((state) => state.USERS); // get current user details from redux store
  const dataPost = useSelector((state) => state.POSTS);

  let userdetails = [];
  let userPostsdetails = [];
  {
    dataUser.map((val) => {
      userdetails = val;
    });
  }
  {
    dataPost.map((val) => {
      userPostsdetails = val;
    });
  }

  // modal controll functions

  const showModal = () => {
    setDeleteIsModalOpen(true);
  };

  const handleCancel = () => {
    setDeleteIsModalOpen(false);
  };

  // submit validation
  const validate = () => {
    const option = {
      abortEarly: false,
    };

    const { error } = schema.validate(form, option);

    if (!error) return null;
    const errorData = {};
    for (let item of error.details) {
      const name = item.path[0];
      const message = item.message;
      errorData[name] = message;
    }

    setErrors(errorData);
    return errorData;
  };

  // onclick validation
  const validateProperty = (name, value) => {
    const option = {
      abortEarly: false,
    };

    form[name] = value.currentTarget.value;
    const { error } = schema.validate(form, option);

    const errorData = {};
    setErrors({ ...errors, [name]: null });
    if (error) {
      for (let item of error.details) {
        if (item.path[0] === name) {
          setErrors({ ...errors, [name]: item.message });
        }
      }
    }
  };

  // set user data to form
  const setEdit = async () => {
    if (isEdit) {
      let data = await dispatch(updateUser(userdetails._id, form)); // save edited data
      if (data) {
        message.success("Profile edit successfullly", 3);
      }
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setForm({
        firstName: userdetails.firstName,
        lastName: userdetails.lastName,
        email: userdetails.email,
        phone: userdetails.phone,
        Avatar: userdetails.Avatar,
      });
    }
  };

  // delete tthe user
  const deleteAccount = async () => {
    let data = await dispatch(deleteUser(userdetails._id)); // delete data
    if (data) {
      message.success("Account deleted successfullly", 3);
      setDeleteIsModalOpen(false);
      navigate(RoutesConstant.login, {
        // navigate to loogin page
        replace: true,
      });
    }
  };

  const cancelEdit = () => {
    // cancel the editing
    setIsEdit(false);
  };

  const resetPassword = () => {
    navigate(RoutesConstant.resetPassword, {
      // navigate to reset password page
      replace: true,
    });
  };

  return (
    <div className="user-profile">
      <Box className="user-profile-wrapper">
        <Paper className="user-profile-left">
          <div className="user-profile-left-modal">
            <Modal
              className="delete-confirmation-modal"
              open={isDeleteModalOpen}
              onCancel={handleCancel}
              footer={null}
              width={350}
            >
              <div
                className="delete-confirmation-modal-msg"
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                Are you sure want to delete your account??
              </div>
              <div
                className="delete-confirmation-modal-buttons"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginRight: 20,
                }}
              >
                <Button
                  style={{ marginRight: 20 }}
                  variant="contained"
                  className="user-profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  className="user-profile-delete-button"
                  color="error"
                  onClick={deleteAccount}
                >
                  delete
                </Button>
              </div>
            </Modal>
          </div>
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

                  <div className="profile-data-value">
                    {isEdit ? (
                      <TextField
                        id="firstName"
                        variant="standard"
                        className="registration-text-input"
                        label="First Name"
                        value={form.firstName}
                        name={"firstName"}
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName ? errors.firstName : ""}
                        onChange={(e) => {
                          validateProperty("firstName", e);
                        }}
                      />
                    ) : (
                      userdetails.firstName
                    )}
                  </div>
                </li>
                <li>
                  <div className="profile-data-title">Last Name :</div>
                  <div className="profile-data-value">
                    {isEdit ? (
                      <TextField
                        id="lastName"
                        variant="standard"
                        className="registration-text-input"
                        label="Last Name"
                        value={form.lastName}
                        name={"lastName"}
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName ? errors.lastName : ""}
                        onChange={(e) => {
                          validateProperty("lastName", e);
                        }}
                      />
                    ) : (
                      userdetails.lastName
                    )}
                  </div>
                </li>
                <li>
                  <div className="profile-data-title">Email :</div>
                  <div className="profile-data-value">
                    {isEdit ? (
                      <TextField
                        id="email"
                        variant="standard"
                        className="registration-text-input"
                        label="Email"
                        value={form.email}
                        name={"email"}
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email : ""}
                        onChange={(e) => {
                          validateProperty("email", e);
                        }}
                      />
                    ) : (
                      userdetails.email
                    )}
                  </div>
                </li>
                <li>
                  <div className="profile-data-title">Phone :</div>
                  <div className="profile-data-value">
                    {isEdit ? (
                      <TextField
                        id="phone"
                        variant="standard"
                        className="registration-text-input"
                        label="Phone"
                        value={form.phone}
                        name={"phone"}
                        error={errors.phone ? true : false}
                        helperText={errors.phone ? errors.phone : ""}
                        onChange={(e) => {
                          validateProperty("phone", e);
                        }}
                      />
                    ) : (
                      userdetails.phone
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-profile-left-bottom">
            <div className="botton-upper-buttons">
              <div className="user-profile-left-bottom-buttons-edit">
                <Button
                  variant="contained"
                  className="user-profile-edit-button"
                  onClick={setEdit}
                >
                  {isEdit ? "Save" : "Edit"}
                </Button>
              </div>
              <div className="user-profile-left-bottom-buttons-cancle">
                {isEdit && (
                  <Button
                    variant="contained"
                    className="user-profile-edit-button"
                    color="error"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
            <div className="bottom-buttons">
              <div className="user-profile-left-bottom-buttons-delete">
                <Button
                  variant="contained"
                  className="user-profile-delete-button"
                  color="error"
                  onClick={showModal}
                >
                  Delete Account
                </Button>
              </div>
              <div className="user-profile-left-bottom-buttons-reset">
                <Button
                  variant="contained"
                  className="user-profile-delete-button"
                  color="success"
                  onClick={resetPassword}
                >
                  Reset Password
                </Button>
              </div>
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
              {dataPost.map((val, index) => (
                <Grid className="grids" xs={4} sm={4} md={6} key={index}>
                  <Post
                    avatar_img={""}
                    title={val.title}
                    subheader={val.date}
                    card_img={"img1.jpg"}
                    description={val.description}
                    postID={val._id}
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
