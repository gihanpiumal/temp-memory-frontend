import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./resetpassword.scss";

import { UserService } from "../../services";
import { RoutesConstant } from "../../assets/constants";
import { getCurrentUser } from "../../config/LocalStorage";

const ResetPassword = () => {
  //sates
  const [form, setForm] = useState({
    email: "",
  });

  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  //schema for validation
  const schema = Joi.object({
    email: Joi.string()
      .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/)
      .messages({ "string.pattern.base": `"Please provide valide email` })
      .required(),
  });

  // form submit validation
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

  // form clear
  const clearState = () => {
    setForm({
      email: "",
    });
  };

  // form submit
  const submit = async () => {
    if (validate()) {
      return;
    }
    let id = await getCurrentUser(); //get curent token data

    try {
      let data = await UserService.send_otp(form, id._id); // otp sending endpoint
      if (data) {
        clearState();
        console.log(id);
        navigate(
          // navigate to reset password verification page
          RoutesConstant.resetPasswordVerification + "?id=" + id._id,
          {
            replace: true,
          }
        );
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="reset-password">
      <Box className="reset-password-wrapper">
        <Paper className="reset-password-details">
          <div className="reset-password-title">Reset Password</div>
          <div className="reset-password-inputs">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              className="reset-password-text-input"
              value={form.email}
              name={"email"}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
              onChange={(e) => {
                validateProperty("email", e);
              }}
            />
          </div>
          <div className="reset-password-buttons">
            <p>Submit your current email address</p>

            <div className="reset-password-buttons-bottom">
              <Button
                variant="contained"
                className="reset-password-button"
                onClick={submit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default ResetPassword;
