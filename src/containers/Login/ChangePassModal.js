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
import { Grid, TextField, styled } from "@mui/material";
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
import Cancel from "./cancel.svg"
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

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
    display:"flex",
    justifyContent:"center",
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
      // backgroundColor: "#AA1313",
      backgroundColor: "#042879",
  // border: "1px solid #CCC",
  border: "1px solid #CCC",
  borderRadius: "8px",
//   paddingLeft: "15px",
//   paddingRight: "15px",
  width: "123px",
  height: "35px",
  "&:hover": {
    background: "#808080",
    color: "white",
  },
}));

const defaultFormData = {
  oldPassword: "",
  newPassword: "",
  confirmnewpassword: "",
};

export default function ChangePassModal({
  open,
  handleClose,
  responseData,


})

{
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

  
  const [otp, setOtp] = useState("");
  // const [isLoading, setisLoading] = useState(false);  const dispatch = useDispatch();

  
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // console.log('user',user)

  const [isLoading, setIsloading] = useState(false);

  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [tries, setTries] = useState("");
  const [msg, setMsg] = useState("");
//   const [isLoading, setisLoading] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
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
  // console.log("otpdata", otpdata);

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
  // console.log("payloads", payloads);
  // console.log("responseData", responseData);
  // console.log("otp", otp);

  const onSubmits = async (data) => {
    setIsloading(true);
    const payload = {
      otp: otp,
      smsId: userId,
      username: userName,
    };

    // console.log("payload", payload);
    const response = await postApiData(apiList.LOGIN_VALIDATE_OTP, payload);
    // console.log("response", response);
    if (response?.data?.status == true) {
      setIsloading(false);
      //   navigate('/atmadminportal/bankmaster')
      // popupAlert(response.message, "Success", "success");
    //   dispatch(loginSuccess(response?.data));

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

  const passwordMatchValidation = (value) => {
    const newPassword = getValues("password");
    return newPassword === value || "New password and confirm password does not match !";
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

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
          className={classes.changebox}
          component="form"
          onSubmit={handleSubmit(onSubmits)}

        >

{/* <div className={classes.header}>
                    <div className={classes.headerTitle}></div>
                    <Button className={classes.headerLogo} onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div> */}
            <div className={classes.close}  onClick={handleClose}>
            <Button className={classes.headerLogo} onClick={handleClose}><CancelRoundedIcon/></Button>
       </div>
          <div className={classes.textcontainer}>
          
            <div className={classes.uppertext}>Reset Password</div>
           
            {/* <div className={classes.lowertext}>Please Enter your details to access your account</div> */}
          </div>

<div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"2vw"}}>
<Grid item xs={12} sm={8} md={8} style={{ width: "80%" }}>
            <div className={classes.frowdataaff}>
              <div className={classes.frowtextaff}>Old Password<sup className={classes.required}>*</sup></div>
              <div className={classes.widthtfield}>
              <Controller
            name="oldPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Old Password" + errorMessages.error_autocomplete_message,
              pattern: {
            
                value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "2 special character,1 Uppercase,1 digit",
              },
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                const regex = /^[a-zA-Z@#.&0-9*/-]+$/;
                const { name, value } = event.target;
                const isValidInput = regex.test(value) || value === "";
                if (!isValidInput) {
                  event.preventDefault();
                  return;
                }
                field.onChange(value);
              };
              return (
                <TextField
                  id="standard-adornment-password"
                  fullWidth="true"
                  placeholder="Please Enter Old Password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  sx={{
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": {
                      marginTop:'3px',
                      borderRadius: '6px',
                      position: 'relative',
                      backgroundColor: '#FFF',
                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                  border: '1px solid',
                    fontSize: '13px',
                      height : "2px",
                      color: '#888',
                      fontWeight:'500',
                      padding: '16px 0px',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={handleInputChange}
                />
              );
            }}
          />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={8} md={8} style={{ width: "80%" }}>
            <div className={classes.frowdataaff}>
              <div className={classes.frowtextaff}>New Password<sup className={classes.required}>*</sup></div>
              <div className={classes.widthtfield}>
              <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "New Password" + errorMessages.error_autocomplete_message,
              pattern: {
            
                value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "2 special character,1 Uppercase,1 digit",
              },
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                // const regex = /^[a-zA-Z@#.*&0-9]+$/;
                const regex = /^[a-zA-Z@#.&0-9*/-]+$/;
                const { name, value } = event.target;
                const isValidInput = regex.test(value) || value === "";
                if (!isValidInput) {
                  event.preventDefault();
                  return;
                }
                field.onChange(value);
              };
              return (
                <TextField
                  id="standard-adornment-password"
                  fullWidth="true"
                  placeholder="Please Enter New Password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  sx={{
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": {
                      marginTop:'3px',
                      borderRadius: '6px',
                      position: 'relative',
                      backgroundColor: '#FFF',
                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                  border: '1px solid',
                    fontSize: '13px',
                      height : "2px",
                      color: '#888',
                      fontWeight:'500',
                      padding: '16px 0px',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={handleInputChange}
                />
              );
            }}
          />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} style={{ width: "80%" }}>
            <div className={classes.widthtfield}>
              <div className={classes.frowtextaff}>Confirm New Password<sup className={classes.required}>*</sup></div>
              <div className={classes.frow1aff}>
               
                      
          <Controller
            name="confirmnewpassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirm New Password " + errorMessages.error_autocomplete_message,
              pattern: {
                // value: /^\d{4}$/,
                value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit
                message: "2 special character,1 Uppercase,1 digit",
              },
              validate: passwordMatchValidation,
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                const regex = /^[a-zA-Z@#.&0-9*/-]+$/;
                const { name, value } = event.target;
                const isValidInput = regex.test(value) || value === "";
                if (!isValidInput) {
                  event.preventDefault();
                  return;
                }
                field.onChange(value);
              };
              return (
                <TextField
                  id="standard-adornment-password"
                  fullWidth="true"
                  placeholder="Confirm New Password"
                  type={showPassword1 ? "text" : "password"}
                  {...field}
                  sx={{
                    "& fieldset": { border: "none" },
                    ".MuiInputBase-root": {
                      marginTop:'3px',
                      borderRadius: '6px',
                      position: 'relative',
                      backgroundColor: '#FFF',
                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                  border: '1px solid',
                    fontSize: '13px',
                      height : "2px",
                      color: '#888',
                      fontWeight:'500',
                      padding: '16px 0px',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {!showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={handleInputChange}
                />
              );
            }}
          />
              </div>
              
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} >
          <div className={classes.button} style={{ width: "80%" }}>
          <ColorButton variant="contained" type="submit">
            Submit
          </ColorButton>
          </div>
          </Grid>
      
          </div>
       
        </Box>
      </Modal>
    </div>
  );
}
