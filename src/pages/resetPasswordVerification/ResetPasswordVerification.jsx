import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { message } from "antd";

import "./resetPasswordVerification.scss";

import { UserService } from "../../services";
import { RoutesConstant } from "../../assets/constants";
import { getCurrentUser } from "../../config/LocalStorage";

const ResetPasswordVerification = () => {
  // states
  const [form, setForm] = useState({
    _id: new URLSearchParams(window.location.search).get("id"), // get the id from url
    OTP: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate(); // use to navigate between links

  // schema for validation
  const schema = Joi.object({
    _id: Joi.string().required().label("ID"),
    OTP: Joi.string().required().label("OTP"),
    newPassword: Joi.string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[@$!%*#?&])|(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
      .required()
      .label("Password")
      .messages({
        "string.pattern.base":
          "Password must contain at least 8 characters, at least one letter and one number.",
      }),
  });

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

  // clear the form
  const clearState = () => {
    setForm({
      OTP: "",
      newPassword: "",
    });
  };

  // submit the form
  const submit = async () => {
    if (validate()) {
      return;
    }

    try {
      let data = await UserService.reset_password(form); // reset password endpoint
      if (data) {
        clearState();
        message.success("Password Reset Successfully", 3);
        navigate(RoutesConstant.login, {
          // navigate to login page
          replace: true,
        });
      } else {
        message.error("Invalid OTP", 3);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="resetPassword-verification">
      <Box className="resetPassword-verification-wrapper">
        <Paper className="resetPassword-verification-details">
          <div className="resetPassword-verification-title">
            Reset Password Verification
          </div>
          <div className="resetPassword-verification-inputs">
            <TextField
              id="otp"
              label="OTP"
              variant="standard"
              className="resetPassword-verification-text-input"
              value={form.OTP}
              name={"OTP"}
              error={errors.OTP ? true : false}
              helperText={errors.OTP ? errors.OTP : ""}
              onChange={(e) => {
                validateProperty("OTP", e);
              }}
            />
            <TextField
              id="newPassword"
              label="New Password"
              variant="standard"
              className="resetPassword-verification-text-input"
              value={form.newPassword}
              name={"newPassword"}
              error={errors.newPassword ? true : false}
              helperText={errors.newPassword ? errors.newPassword : ""}
              onChange={(e) => {
                validateProperty("newPassword", e);
              }}
            />
          </div>
          <div className="resetPassword-verification-buttons">
            <p>
              Check your email and submit the OTP code with give the new
              password
            </p>

            <div className="resetPassword-verification-buttons-bottom">
              <Button
                variant="contained"
                className="resetPassword-verification-button"
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

export default ResetPasswordVerification;
