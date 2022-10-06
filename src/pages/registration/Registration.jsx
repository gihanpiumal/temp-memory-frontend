import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { UserService } from "../../services";
import { RoutesConstant } from "../../assets/constants";

import "./registration.scss";

const Registration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Avatar: "",
    password: "",
    isVerified: false,
    OTPCode: 0,
  });

  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

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
    isVerified: Joi.boolean().required().label("Verified"),
    OTPCode: Joi.number().optional().label("OTP"),
  });

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

  const clearState = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const submit = async () => {
    if (validate()) {
      return;
    }
    try {
      let data = await UserService.registration(form);
      if (data) {
        clearState();
        console.log(data.details._id);
        let sendOtpData = {
          email: data.details.email,
        };
        try {
          let otpSend = await UserService.send_otp(
            sendOtpData,
            data.details._id
          );
          if (otpSend) {
            console.log(data.details);
            navigate(
              RoutesConstant.emailVerification + "?id=" + data.details._id,
              {
                replace: true,
              }
            );
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div className="registration">
      <Box className="registration-wrapper">
        <Paper className="registration-details">
          <div className="registration-title">Registration</div>
          <div className="registration-inputs">
            <TextField
              id="firstName"
              label="First Name"
              variant="standard"
              className="registration-text-input"
              value={form.firstName}
              name={"firstName"}
              error={errors.firstName ? true : false}
              helperText={errors.firstName ? errors.firstName : ""}
              onChange={(e) => {
                validateProperty("firstName", e);
              }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="standard"
              className="registration-text-input"
              value={form.lastName}
              name={"lastName"}
              error={errors.lastName ? true : false}
              helperText={errors.lastName ? errors.lastName : ""}
              onChange={(e) => {
                validateProperty("lastName", e);
              }}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              className="registration-text-input"
              value={form.email}
              name={"email"}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
              onChange={(e) => {
                validateProperty("email", e);
              }}
            />
            <TextField
              id="phone"
              label="Phone Number"
              variant="standard"
              className="registration-text-input"
              value={form.phone}
              name={"phone"}
              error={errors.phone ? true : false}
              helperText={errors.phone ? errors.phone : ""}
              onChange={(e) => {
                validateProperty("phone", e);
              }}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              className="registration-text-input"
              value={form.password}
              name={"password"}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password : ""}
              onChange={(e) => {
                validateProperty("password", e);
              }}
            />
          </div>
          <div className="registration-buttons">
            <div className="registration-buttons-bottom">
              <Button
                variant="contained"
                className="registration-button"
                onClick={submit}
              >
                Registration
              </Button>
              <p className="registration-shift-text">
                Already have an account?{" "}
                <Link to={RoutesConstant.login}>Login now</Link>
              </p>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Registration;
