import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Joi from "joi";
import moment from "moment";

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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Dropdown, Menu, message, Modal } from "antd";

import "./post.scss";
import { deletePost, updatePost } from "../../services/actions/postAction";
import { getCurrentUser } from "../../config/LocalStorage";
import { RoutesConstant } from "../../assets/constants";

const Post = ({
  avatar_img,
  title,
  subheader,
  card_img,
  description,
  postID,
  creatorID,
}) => {
  // schema for validation
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    image: Joi.string().empty("").label("Image"),
    description: Joi.string().required().label("Description"),
  });
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  let curentTokenData = getCurrentUser(); // get id from token
  const userID = curentTokenData._id;

  const showEditModal = () => {
    setEditModal(true);
    setForm({
      title: title,
      image: card_img,
      description: description,
    });
  };

  const showDeleteModal = () => {
    setdeleteModal(true);
  };

  const handalEdit = () => {
    console.log("done edit");
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

  const handleEdit = async () => {
    if (validate()) {
      return;
    }
    let data = await dispatch(updatePost(postID, form)); // save edited data
    if (data) {
      message.success("Post edit successfullly", 3);
    }
    setEditModal(false);
  };

  const handalDelete = async () => {
    let data = await dispatch(deletePost(postID)); // delete data
    if (data) {
      message.success("Post deleted successfullly", 3);
      setdeleteModal(false);
    }
  };

  const handleCancel = () => {
    setdeleteModal(false);
    setEditModal(false);
    setErrors([]);
  };

  const menu = (
    <Menu
      items={[
        {
          label: <span onClick={showEditModal}>Edit</span>,
          key: "0",
        },
        {
          label: <span onClick={showDeleteModal}>Delete</span>,
          key: "1",
        },
      ]}
    />
  );

  return (
    <div className="post">
      <div className="post-wrapper">
        <Modal
          className="delete-confirmation-modal"
          open={deleteModal}
          onCancel={handleCancel}
          footer={null}
          width={350}
        >
          <div
            className="delete-confirmation-modal-msg"
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            Are you sure want to delete this post??
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
              onClick={handalDelete}
            >
              delete
            </Button>
          </div>
        </Modal>

        <Modal
          className="delete-confirmation-modal"
          open={editModal}
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
              onClick={handleEdit}
            >
              Save
            </Button>
          </div>
        </Modal>
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
                {userID == creatorID && (
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <MoreVertIcon style={{ color: "black" }} />
                    </a>
                  </Dropdown>
                )}
              </IconButton>
            }
            title={title}
            subheader={moment(subheader).format("YYYY-MM-DD")}
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
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Post;
