import React from "react";
import classes from "../Cards/Cards.module.css";
import axios from "axios";

import {
  Box,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
  Typography,
  MuiAlert,
  Stack,
} from "@mui/material";

import { useContext, useState } from "react";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OTPInput from "react-otp-input";

import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";

import Loader from "../../../../components/common/loader";

const RegeneratePIN = ({ cardNumber }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [otp, setOtp] = useState("");
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [newPin, setNewPin] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [isOtpEntered1, setIsOtpEntered1] = useState(false);

  const validateExpiryDate = (expiryDate) => {
    const month = expiryDate.substring(2, 4);
    const year = expiryDate.substring(0, 2);

    if (month < "01" || month > "12") {
      return false;
    }
    if (year.length > 0 && year.length < 2) {
      return false;
    }

    return true;
  };

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    if (value.length <= 4 && /^[0-9]*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        expiryDate: value,
      }));

      if (value.length === 4 && !validateExpiryDate(value)) {
        SweetAlertPopup(
          "Please enter a valid expiry date (YYMM)",
          "Error",
          "error"
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    const isNumericInput = /^[0-9]$/.test(e.key);
    const isAllowedKey = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ].includes(e.key);

    if (!isNumericInput && !isAllowedKey) {
      e.preventDefault();
    }
  };
  // API call to generate PIN
  const handlePINSubmit = async (e) => {
    e.preventDefault();

    if (cardNumber.length !== 16) {
      SweetAlertPopup(
        "Please enter a valid 16-digit card number",
        "Error",
        "error"
      );
      return;
    }

    if (formData.cvv.length !== 3) {
      SweetAlertPopup("Invalid CVV", "Error", "error");
      return;
    }

    if (!formData.expiryDate || formData.expiryDate.length !== 4) {
      SweetAlertPopup("Please enter a valid expiry date", "Error", "error");
      return;
    }

    try {
      setIsloading(true);
      const pinGenerationResponse = await axios.post(apiList.CARDGENERATEPOTP, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNumber,
        cvv: formData.cvv,
        expdate: formData.expiryDate,
      });

      const pinGenerationData = pinGenerationResponse.data;
      if (pinGenerationResponse?.respCode == "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      if (pinGenerationData.status == true) {
        setOtp(pinGenerationData.otp);

        setOpenOtpDialog(true);
      } else {
        SweetAlertPopup(pinGenerationData.message, "Error", "error");
      }
      setIsloading(false);
    } catch (error) {
      SweetAlertPopup(
        "There was an error processing your request. Please try again later.",
        "Error",
        "error"
      );
      setIsloading(false);
    }
  };
  // API call with OTP
  const handleOtpSubmit = async () => {
    try {
      setIsloading(true);
      const pinSettingResponse = await axios.post(apiList.CARDOTP, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNumber,
        otp: otp,
      });

      const pinSettingData = pinSettingResponse.data;
      if (pinSettingResponse?.respCode == "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      if (pinSettingData.status) {
        setPinDialogOpen(true);
        setOpenOtpDialog(false);
      } else {
        SweetAlertPopup(pinSettingData.message, "Error", "error");
      }
      setIsloading(false);
    } catch (error) {
      // SweetAlertPopup(pinSettingData.message, "Error", "error");
      setIsloading(false);
    }
  };
  // API call for setting New Pin
  const handlePinSubmit = async () => {
    try {
      setIsloading(true);

      const pinSubmissionResponse = await axios.post(apiList.CARDPIN, {
        custNo: user.userId,
        sessionId: user.sessionId,
        cardNo: cardNumber,
        cardPin: newPin,
      });

      const pinSubmissionData = pinSubmissionResponse.data;
      if (pinSubmissionResponse?.respCode == "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      if (pinSubmissionData.status) {
        setFormData({
          cardNumber: "",
          cvv: "",
          expiryDate: "",
        });
        setOtp("");
        setNewPin("");
        setPinDialogOpen(false);
        SweetAlertPopup(
          "Your debit card pin has been successfully set.",
          "Success",
          "success"
        );
        console.log("Debit card pin set successfully");
      } else {
        setPinDialogOpen(false);
        SweetAlertPopup("Please try connecting again.", "Error", "error");
      }

      setIsloading(false);
    } catch (error) {
      setPinDialogOpen(false);
      SweetAlertPopup("Please try again.", "Error", "error");

      console.error("Error setting debit card pin:", error);
      setIsloading(false);
    }
  };

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.gridinfo}>
        <div className={classes.grid4container}>
          <form onSubmit={handlePINSubmit}>
            <div className={classes.grid3name}>
              You can regenerate your PIN for your card here
            </div>

            <Stack spacing={1} className={classes.grid4content}>
              <div className={classes.grid4title}>
                Enter Card Number<span className={classes.requiredStar}>*</span>
              </div>
              <div className={classes.frow1aff}>
                <TextField
                  name="cardNumber"
                  // value={formData.cardNumber}
                  value={cardNumber || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  inputProps={{
                    maxLength: 16,
                    pattern: "[0-9]*",
                  }}
                  placeholder="Card Number"
                  disabled={true}
                />
              </div>
              <div className={classes.grid4title}>
                Enter Card CVV<span className={classes.requiredStar}>*</span>
              </div>
              <div className={classes.frow1aff}>
                <TextField
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  inputProps={{
                    maxLength: 3,
                    pattern: "[0-9]*",
                  }}
                  placeholder="Enter Card CVV"
                />
              </div>
              <div className={classes.grid4title}>
                Enter Card Expiry Date
                <span className={classes.requiredStar}>*</span>
              </div>
              <div className={classes.frow1aff}>
                <TextField
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryDateChange}
                  // onKeyDown={handleKeyDown}
                  fullWidth
                  inputProps={{
                    maxLength: 4,
                    pattern: "[0-9]*",
                  }}
                  placeholder="YYMM"
                />
              </div>
            </Stack>
            <div className={classes.grid3button}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#EE1C25" }}
              >
                Submit
              </Button>
            </div>
          </form>
          <Dialog open={openOtpDialog} onClose={() => setOpenOtpDialog(false)}>
            <DialogContent>
              <Typography className={classes.OtpTypography}>
                OTP Verification<span className={classes.requiredStar}>*</span>
              </Typography>
              <OTPInput
                value={otp}
                // onChange={setOtp}

                onChange={(otpValue) => {
                  setOtp(otpValue);
                  setIsOtpEntered(otpValue.length > 3);
                }}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputType="password"
                inputStyle={{
                  width: "70px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  height: "70px",
                  fontSize: "20px",
                }}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setOpenOtpDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleOtpSubmit}
                disabled={!isOtpEntered}
                sx={{ backgroundColor: "#EE1C25" }}
              >
                Submit OTP
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={pinDialogOpen} onClose={() => setPinDialogOpen(false)}>
            <DialogContent>
              <Typography className={classes.OtpTypography}>
                Enter PIN<span className={classes.requiredStar}>*</span>
              </Typography>

              <OTPInput
                value={newPin}
                // onChange={setNewPin}

                onChange={(otpValue) => {
                  setNewPin(otpValue);
                  setIsOtpEntered1(otpValue.length > 3);
                }}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputType="password"
                inputStyle={{
                  width: "70px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  height: "70px",
                  fontSize: "20px",
                }}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => setPinDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handlePinSubmit}
                disabled={!isOtpEntered1}
                sx={{ backgroundColor: "#EE1C25" }}
              >
                Submit PIN
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default RegeneratePIN;
