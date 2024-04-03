import classes from "./ForgetPassword.module.css";

import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import UPI from "../../assets/swiftcore_logo.svg";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import TextFieldForm from "../../components/common/textFieldForm";
import { useForm, Controller } from "react-hook-form";
import { errorMessages } from "../../components/utilities/formValidation";
import { Box, Grid, TextField } from "@mui/material";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { SET_USER } from "../../constants";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";
import { useEffect } from "react";
import styled from "styled-components";
import TextFieldFormNew from "../../components/common/textFieldFormNew";
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import headerLogo from "../../assets/headerLogo.png";
import loginBackground from "../../assets/loginBackground.png";
// import RegisterContext from "./RegisterContext";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import ForgetPassOTP from "./ForgetPassOTP";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loader from "../../components/common/loader";

const defaultFormData = {
  email: "",
  password: "",
  mobileno:'',
};

const ResetPassword = () => {
  // const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
//   const { otpDisplay, setOtp, custNo } = useContext(RegisterContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {state}=useLocation()
  // console.log("state",state)

//   function handleSignup() {
//     navigate("/auth/resetpassword");
//   }
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
  const navigate = useNavigate();
  const handlleNavigate = (route) => {
    navigate(route);
  };

  function handleLogin() {
    navigate("/auth/login");
  }


  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     popupAlert("Please Enter Valid Credentials", "Error", "error");
  //     dispatch(clearErrors());
  //   }

  //   if (isAuthenticated) {
  //     navigate("/dashboard")
  //   }
  // }, [dispatch, error, navigate, isAuthenticated,popupAlert]);
  // const { dispatch: authDispatch } = useContext(AuthContext);
  // const dispatchSetUser = (payload) => {
  //   authDispatch({ type: SET_USER, payload });
  // };
  // const [passwordInput, setPasswordInput] = useState('password');

  const onSubmit = async (data) => {
    setisLoading(true)
    const payload = {
     
      custNo : state.custNo,
      otp:state.otp,
      newpassword:data?.confirmpassword,
    };
    const response = await postApiData(apiList.SETFORGOTPASS, payload);
    // console.log("response", response);
    if (response.status == true) {
      setisLoading(false)
        handleLogin();
        SweetAlertPopup(response.message, "Success", "success");
      } else {
        setisLoading(false)
        SweetAlertPopup(response.message, "Error", "error");
      }
    };
  
    const passwordMatchValidation = (value) => {
      const newPassword = getValues("password");
      return newPassword === value || "New password and confirm password does not match !";
    };
  
  

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "123px",
    fontSize:'15px',
    height: "38px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  const [valueTab, setValueTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const [ToggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <>
          {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <div className={classes.mainpagewithback1}>
        <div className={classes.box}>
        <div className={classes.mainfile1}>
        <span onClick={handleLogin} className={classes.loginbutton} >
        <KeyboardBackspaceIcon/>  Back to Login
                </span>
        <div className={classes.forgetpassheading}>
            Reset Password
            </div>
      
          <Box
            className={classes.box1} style={{width:'100%'}}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <div className={classes.firsttabinfo} style={{width:'100%'}}>
           
                <div className={classes.frowdataaff} style={{width:'80%'}}>
                  <div className={classes.frowtextaff}>
                 Password
                    <sup className={classes.required}>*</sup>
                  </div>
                  
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password " + errorMessages.error_autocomplete_message,
              pattern: {
            
                value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "2 special character,1 Uppercase,1 digit",
              },
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                const regex = /^[a-zA-Z@#.*&0-9]+$/;
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
                  placeholder="Please Enter Password"
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
             
                <div className={classes.frowdataaff} style={{width:'80%'}}>
                  <div className={classes.frowtextaff}>
                Confirm Password
                    <sup className={classes.required}>*</sup>
                  </div>
                  
          <Controller
            name="confirmpassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Password " + errorMessages.error_autocomplete_message,
              pattern: {
                // value: /^\d{4}$/,
                value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit
                message: "2 special character,1 Uppercase,1 digit",
              },
              validate: passwordMatchValidation,
            }}
            render={({ field, fieldState }) => {
              const handleInputChange = (event) => {
                const regex = /^[a-zA-Z@#.*&0-9]+$/;
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
                  placeholder="Confirm Password"
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


                
              <div className={classes.button}>
                <ColorButton1 variant="contained" type="submit">
               Submit
                </ColorButton1>
              </div>
             
              
            </div>
          </Box>

        
        </div>
        </div>


      </div>
    </>
  );
};

export default ResetPassword;



