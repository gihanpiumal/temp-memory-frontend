import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { UserService } from "../../services";
import { RoutesConstant } from "../../assets/constants";

import "./emailverification.scss";

const EmailVerification = () => {
  const [form, setForm] = useState({
    OTP: null,
  });
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  const schema = Joi.object({
    OTP: Joi.number().optional().label("OTP"),
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
      OTP: 0,
    });
  };

  const submit = async () => {
    if (validate()) {
      return;
    }
    try {
      let id = new URLSearchParams(window.location.search).get("id");
      let data = await UserService.email_verification(form, id);
      if (data) {
        clearState();
        console.log(data.details);
        navigate(RoutesConstant.home, {
          replace: true,
        });
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="email-verification">
      <Box className="email-verification-wrapper">
        <Paper className="email-verification-details">
          <div className="email-verification-title">Email Verification</div>
          <div className="email-verification-inputs">
            <TextField
              id="otp-code"
              label="OTP code"
              variant="standard"
              className="email-verificatio-text-input"
              value={form.OTP || undefined}
              name={"OTP"}
              error={errors.OTP ? true : false}
              helperText={errors.OTP ? errors.OTP : ""}
              onChange={(e) => {
                validateProperty("OTP", e);
              }}
            />
          </div>
          <div className="email-verification-registration-buttons">
            <p>Check your email and submit the OTP code</p>
            <div className="email-verification-buttons-bottom">
              <Button
                variant="contained"
                className="email-verification-button"
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

export default EmailVerification;
