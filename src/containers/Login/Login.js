import classes from "../MainContainer/AtmPortal/Airtel.module.css";
import { useNavigate } from "react-router-dom";
import UPI from "../../assets/sillogo.png";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import TextFieldForm from "../../components/common/textFieldForm";
import { useForm, Controller } from "react-hook-form";
import { errorMessages } from "../../components/utilities/formValidation";
import { Box, Grid, TextField } from "@mui/material";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
// import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from "react";
import { SET_USER } from "../../constants";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";
import { useEffect } from "react";
import styled from "styled-components";
import TextFieldFormNew from "../../components/common/textFieldFormNew";
import { Button } from "@mui/base";
import UpdatePassword from "./updatePasswordModal";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../../components/common/loader";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  otpSuccess,
} from "../../store/authSlice";
import LoginOTPModal from "./LoginOTPModal";
// import headerLogo from "../../assets/images/commonforweb/silkpay.png";
import headerLogo from "../../assets/images/commonforweb/SwiftCorePe.svg";
import loginleftimage from "../../assets/images/commonforweb/loginleftimage.png";

import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from "../../constantStore/contstants";


const defaultFormData = {
  email: "",
  password: "",
};

const Login = () => {
  // const dispatch = useDispatch();
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );

  // console.log("error", error)
  // console.log("user", user)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
  const recaptchaRef = useRef(null);
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
  // }
  // const [passwordInput, setPasswordInput] = useState('password');

  function handleForgetPass() {
    navigate("/auth/forgetpassword");
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    recaptchaRef && recaptchaRef?.current?.reset();
    let tempToken = await recaptchaRef?.current?.executeAsync();
    // if (tempToken)
    // {
    try {
      dispatch(loginStart());
      const payload = {
        username: data.email,
        password: data.password,
      };

      const response = await postApiData(apiList.LOGIN, payload);
      // console.log(response);
      if (response?.data?.status == true) {
        // dispatch(loginSuccess(response.data));
        sessionStorage.setItem('JWTToken',response?.data?.token)
        setUserId(response?.data?.smsId);
        setUserName(data.email);
        // dispatch(otpSuccess(data.email));
        // dispatch(otpSuccess(response?.data))
        // handleOpen();
        dispatch(loginSuccess(response?.data));
        reset();
        setIsLoading(false);
       
      } else {
        // dispatch(loginFailure(response.message));
        SweetAlertPopup(response?.data.message || "Something Went wrong please try again....", "Error", "error");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(loginFailure("An error occurred"));
      setIsLoading(false);
    }
  // }
  // else {
  //   // console.log("Captcha Error");
  // }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#AA1313",
    backgroundColor: "#042879",
    fontFamily:'Poppins',
    boxShadow:' 0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
    fontSize:'15px',
    
    // border: "1px solid #CCC",
    border:'none',
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "100%",
    height: "38px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <div className={classes.mainpage}>
        <div className={classes.leftpage}>
          <img src={loginleftimage} alt="loginleftimage" />
        </div>
        <div className={classes.rightpage}>
          <div className={classes.mainfile}>
            {/* <img className={classes.lefttitlelogo} src={headerLogo} alt="" /> */}
            {/* <div style={{ width: "10vw", marginBottom: "2vh" }} ><img src={UPI} alt='UPI' className={classes.imgupi} /></div> */}
            <Box
              className={classes.box}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
               <img className={classes.lefttitlelogo} src={headerLogo} alt="" />
              <div className={classes.textcontainer}>
                <div className={classes.uppertext}>Login to your account</div>
                <div className={classes.lowertext}>
                 Welcome back,Please enter your details.
                </div>
              </div>

              <Grid item xs={12} sm={8} md={8} style={{ width: "80%" }}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Username<sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "email",
                        rows: 5,
                        maxRows: 10,
                       
                      }}
                      TextFieldProps={{
                        // label: "Branch",
                        placeholder: "Username",
                        // style: { width: "33vw" },
                        fullWidth: true,
                        inputProps : {maxLength: 20}
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      rules={{
                        required:
                          "Username " +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6} style={{ width: "80%" }}>
                <div className={classes.widthtfield}>
                  <div className={classes.frowtextaff}>
                    Password<sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.frow1aff}>
                   
                    <Controller
                      name="password" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      rules={{
                        required:
                          "Password " +
                          errorMessages.error_autocomplete_message,
                          
                          pattern: {
            
                            value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            message: "2 special character,1 Uppercase,1 digit",
                          },
                      }}
                      render={({ field, fieldState }) => {
                        const handleInputChange = (event) => {
                          const regex = /^[a-zA-Z@#&0-9]+$/;
                          const { name, value } = event.target;
                          const isValidInput =
                            regex.test(value) || value === "";

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
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            {...field} // Spread the 'field' props to bind it to the form's state
                            sx={{
                              "& fieldset": { border: "none" },
                              ".MuiInputBase-root": {
                                borderRadius: "6px",
                                height: "35px",
                                //   backgroundColor: "rgb(238, 239, 247)",
                                backgroundColor: "#FFF",
                                fontSize: "13px",

                                color: "#888",
                                fontWeight: "500",
                                border: "1px solid",
                                //   width:'130%'
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
                                    {!showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            onChange={handleInputChange}
                            inputProps={{maxLength: 10}}
                            // error={field.error} // Pass the error state here
                            // helperText={passwordError ? "Password does not meet requirements" : ""}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className={classes.forgetPass}>
                    <span
                      onClick={handleForgetPass}
                      className={classes.register}
                    >
                      Forgot Password?
                    </span>
                  </div>
                </div>
              </Grid>
              <div className={classes.button} style={{width:'80%'}}>
                <ColorButton1 variant="contained" type="submit">
                  Login
                </ColorButton1>
              </div>
              {open ? (
                <LoginOTPModal
                  open={open}
                  handleClose={handleClose}
                  userId={userId}
                  userName={userName}
                />
              ) : null}
            </Box>
          </div>
        </div>
        
       {/* <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={SITE_KEY} /> */}
       
      </div>
    </>
  );
};

export default Login;
