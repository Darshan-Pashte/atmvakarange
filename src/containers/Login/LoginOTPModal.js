import * as React from "react";
import Box from "@mui/material/Box";
import classes from "./Login.module.css";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { TextField, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { errorMessages } from "../../components/utilities/formValidation";
import OTPInput from "react-otp-input";
import { useState } from "react";
import Loader from "../../components/common/loader";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/authSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TimerComponent from "../../components/common/TimerComponent";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
      // backgroundColor: "#AA1313",
      backgroundColor: "#042879",
  // border: "1px solid #CCC",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "123px",
  height: "35px",
  "&:hover": {
    background: "#808080",
    color: "white",
  },
}));

const defaultFormData = {
  username: "",
  password: "",
  cpassword: "",
};

export default function LoginOTPModal({
  open,
  handleClose,
  responseData,
  payloads,
  userId,
  userName,
}) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  React.useEffect(() => {
    setValue("username", responseData);
    // setLastLogin(sessionStorage.getItem("lastLogin"))
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);
  const [otp, setOtp] = useState("");
  // const [isLoading, setisLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();

  
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log('user',user)

  const [isLoading, setIsloading] = useState(false);

  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [tries, setTries] = useState("");
  const [msg, setMsg] = useState("");
  // const [times,setTimes]=useState('')
  const handleFocus = () => {
    // Clear the input value on focus
    setOtp("");
    setIsOtpEntered(false);
  };

  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { otpdata } = useSelector((state) => state.auth);
  console.log("otpdata", otpdata);

  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  // const [userName, setUserName] = React.useState("");

  // React.useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"))
  // }, []);
  console.log("payloads", payloads);
  console.log("responseData", responseData);
  console.log("otp", otp);

  const onSubmits = async (data) => {
    setIsloading(true);
    const payload = {
      otp: otp,
      smsId: userId,
      username: userName,
    };

    console.log("payload", payload);
    const response = await postApiData(apiList.LOGIN_VALIDATE_OTP, payload);
    console.log("response", response);
    if (response?.data?.status == true) {
      setIsloading(false);
      //   navigate('/atmadminportal/bankmaster')
      // popupAlert(response.message, "Success", "success");
      dispatch(loginSuccess(response?.data));

      handleClose();
      reset();
      setIsloading(false);
    } else if (response?.data?.status == false) {
      if (response?.data?.respCode == "OE") {
        popupAlert(response?.data?.message, "Error", "error");
        setIsloading(false);
        handleClose();
        handleFocus();
        // handleFalse();
        reset();
        // window.location.reload();
      } else {
        setIsloading(false);
        // handleClose();
        handleFocus();
        //  popupAlert(response.message, "Error", "error")
        // seShowtMsg(true)
        // setTimes(response?.remainTime)
        setMsg(response?.data?.message);
        setTries(response?.data?.otpAttempt + 1);
      }
      reset();
    }
  };


  const handleResend = async () => {
    try {
      setIsloading(true);
      const payload = {
        username:userName,
        smsId:userId,
       };
      const response = await postApiData(apiList.RESEND_OTP, payload);
      if (response?.data?.status == true) {
        // SweetAlertPopup(response.message, "Success", "success");

        setIsloading(false);
      } else {
        // SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  return (
    <div>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component={"form"}
          onSubmit={handleSubmit(onSubmits)}
          className={classes.mainbox}
        >
          <div
              className={classes.cancelButton}
              style={{ transform: "scale(2)"}}
            >
              <IconButton aria-label="delete" onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          <div
            className={classes.otpContent}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className={classes.otpheading}>OTP Verification</div>
            
          </div>
          <div className={classes.otpheading1}>
            
            {otpdata?.message}
            {/* Please Enter OTP */}
            
            </div>
          {!otp && (
            <div style={{ color: "#AA1313", marginBottom: "-10px",fontSize:'15px' }}>{msg}</div>
          )}
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
              width: "60px",
              marginBottom: "10px",
              marginTop: "10px",
              height: "60px",
              fontSize: "20px",
              borderRadius: "5px",
              borderColor:
                "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
            }}
            containerStyle={{
              display: "flex",
              justifyContent: "space-between",
            }}
          />
          {tries ? (
            <div style={{ color: "#183883", marginTop: "-10px" ,fontSize:'15px'}}>
              You have {tries} attempt left
            </div>
          ) : null}
          
         <TimerComponent
            Case="Minutes"
            setotp={''}
            Time={otpdata?.remainTime}
            id={otpdata?.smsId}
            resendClick={handleResend}
            msg={msg}
            setMsg={setMsg}
            tries={tries}
            setTries={setTries}
            setOtp={setOtp}
            // ColorButton={ColorButton}
          />

          <div style={{ display: "flex" }}>
            <ColorButton
              loading={isLoading}
              variant="contained"
              type="submit"
              disabled={!isOtpEntered}
            >
              Submit
            </ColorButton>
         
          </div>
        </Box>
      </Modal>
    </div>
  );
}
