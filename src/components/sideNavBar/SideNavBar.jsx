import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Joi from "joi";
import moment from "moment";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { message, Modal } from "antd";

import "./sidenavbar.scss";
import { getCurrentUser } from "../../config/LocalStorage";
import { RoutesConstant } from "../../assets/constants";
import { addPost } from "../../services/actions/postAction";

const SideNavBar = () => {
  // schema for validation
  const schema = Joi.object({
    creator_id: Joi.string().required().label("Creatot ID"),
    title: Joi.string().required().label("Title"),
    date: Joi.date().raw().required().label("Date"),
    image: Joi.string().empty("").label("Image"),
    description: Joi.string().required().label("Description"),
    likeCount: Joi.number().required().label("Like Count"),
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    creator_id: "",
    title: "",
    date: "",
    image: "",
    description: "",
    likeCount: 0,
  });

  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  let curentTokenData = getCurrentUser(); // get data from token

  // modal controll functions
  const showModal = () => {
    setShowAddModal(true);
    setForm({
      creator_id: curentTokenData._id,
      date: moment().format("YYYY-MM-DD"),
      title: "",
      image: "",
      description: "",
      likeCount: 0,
    });
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setErrors([]);
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

  const handleAdd = async () => {
    if (validate()) {
      return;
    }
    let data = await dispatch(addPost(form)); // save new post data
    if (data) {
      message.success("Post added successfullly", 3);
    }
    setShowAddModal(false);
    setErrors([]);
  };

  return (
    <div className="side-nav-bar">
      <div className="side-nav-bar-wrapper">
        <Modal
          className="delete-confirmation-modal"
          open={showAddModal}
          onCancel={handleCancel}
          footer={null}
          width={350}
        >
          <div
            className="delete-confirmation-modal-msg"
            style={{
              fontSize: 18,
              fontWeight: 500,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // alignItems:"center"
            }}
          >
            <TextField
              id="title"
              variant="standard"
              className="registration-text-input"
              label="Title"
              value={form.title}
              name={"title"}
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title : ""}
              onChange={(e) => {
                validateProperty("title", e);
              }}
            />
            <TextField
              id="image"
              variant="standard"
              className="registration-text-input"
              label="Image"
              value={form.image}
              name={"image"}
              error={errors.image ? true : false}
              helperText={errors.image ? errors.image : ""}
              onChange={(e) => {
                validateProperty("image", e);
              }}
            />
            <TextField
              id="description"
              variant="standard"
              className="registration-text-input"
              label="Description"
              value={form.description}
              name={"description"}
              error={errors.description ? true : false}
              helperText={errors.description ? errors.description : ""}
              onChange={(e) => {
                validateProperty("description", e);
              }}
            />
          </div>
          <div
            className="delete-confirmation-modal-buttons"
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: 20,
              marginTop: 20,
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
              onClick={handleAdd}
            >
              Save
            </Button>
          </div>
        </Modal>
        <div className="side-nav-bar-top">
          <div className="side-nav-bar-title">Memory Blog</div>
          <div className="side-nav-bar-logo">
            <MenuBookIcon className="logo-icoon" />
          </div>
        </div>
        <div className="side-nav-bar-middle">
          <div className="side-nav-bar-items">
            <Link className="side-nav-links" onClick={showModal}>
              <AddBoxIcon className="link-icon" />
              <p>Create Post</p>
            </Link>
          </div>
          <div className="side-nav-bar-items">
            <Link to={RoutesConstant.userProfile} className="side-nav-links">
              <PersonIcon className="link-icon" />
              <p>My Profile</p>
            </Link>
          </div>
        </div>
        <div className="side-nav-bar-bottom">
          <div className="side-nav-bar-logout">
            <Link to={RoutesConstant.login} className="side-nav-links">
              <LogoutIcon className="link-icon" />
              <p>Logout</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
