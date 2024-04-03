import classes from "./ForgetPassword.module.css";

import React from "react";

import { useNavigate } from "react-router-dom";
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
  customerno:'',
};

const ForgetPassword = () => {
  // const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
//   const { otpDisplay, setOtp, custNo } = useContext(RegisterContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

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

//   const onSubmit = async (data) => {
//    console.log("data",data)
//    handleOpen()
//   };
const [isLoading, setisLoading] = useState(false);

 
const onSubmit = async (data) => {
  setisLoading(true)
    const payload = {
     
      custNo : data?.customerno,
    };
    const response = await postApiData(apiList.FORGOTPASS, payload);
    // console.log("response", response);
    if(response?.status == false){
      setisLoading(false)
        SweetAlertPopup(response?.message , "Error", "error")
      }
      else{
        setisLoading(false)
    //    SweetAlertPopup(response?.message, "Success", "success")
       handleOpen()
       
     }
      
   }
  


  
  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    //  background: "var(--button-color)",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize:'15px',
    width: "103px",
    height: "35px",
    "&:hover": {
      background: 'var(--button-hover-color)',
      color: "white",
    },
  }));


  function handleLogin() {
    navigate("/auth/login");
  }

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
        <span onClick={handleLogin} className={classes.loginbutton} >
        <KeyboardBackspaceIcon/>  Back to Login
                </span>
        <div className={classes.mainfile1}>
        <div className={classes.forgetpassheading}>
            Forgot Password
            </div>

            <div className={classes.forgetpassheadtext}>
           
            Please enter the customer number, we will send the OTP to registered mobile number
            </div>
          <Box
            className={classes.box1} style={{width:'100%'}}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <div className={classes.firsttabinfo} style={{width:'100%'}} >
           
                <div className={classes.frowdataaff} style={{width:'80%'}}>
                  <div className={classes.frowtextaff}>
                 Customer Number
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "customerno",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Enter Customer Number",
                          // style: { width: "120%" },
                        fullWidth: true,
                        // inputProps : {maxLength: 10}
                    }}
                    backgroundColor={true}
                    regExp={/^[0-9]+$/}
                    rules={{
                      required:
                        "Customer Number" +
                        errorMessages.error_autocomplete_message,
                        // pattern: {
                        //   value: /^[0-9]{10}$/,
                        //   message: "Please Enter valid Mobile Number",
                        // },
                    }}
                    required={true}
                    />
                  </div>
                </div>
             
              <div className={classes.button}>
                <ColorButton1 variant="contained" type="submit">
                 Send
                </ColorButton1>
              </div>
             
            </div>
          </Box>

          {open ? (
            <ForgetPassOTP
              open={open}
              handleClose={handleClose}
              custNo={watch('customerno')}
              
            />
          ) : null}
        </div>
        </div>


      </div>
    </>
  );
};

export default ForgetPassword;
