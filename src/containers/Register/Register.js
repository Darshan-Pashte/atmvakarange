// import classes from "../Register/Register.module.css";
// import "../Register/Register.css";
// import React from "react";
// import { useContext, useState } from "react";
// // import headerLogo from "../../assets/headerLogo.png";
// import headerLogo from "../../assets/images/commonforweb/mahesh.png";
// // import LoginContainer from "./LoginContainer";
// // import CorporateMain from "./CorporateMain";
// import LoginContext from "../Register/LoginContext";

// const Register = () => {

//   const [ToggleState, setToggleState] = useState(1);
//   const [displayOtp, setOtp] = useState(false);

//   const otp = (value) => {
//     setOtp(value);
//   };

//   const toggleTab = (index) => {
//     setToggleState(index);
//   };

//   const getActiveClass = (index, className) =>
//     ToggleState === index ? className : "";

//   console.log("ParentOtp",displayOtp);

//   return (
//     <>

//       <div className={classes.mainfullpage}>
//         <div className={classes.tabBodyContent} style={{height:'100%'}}>
//           <div className="content-container" style={{height:'100%'}}>
//             <div
//               className={`content ${getActiveClass(1, "active-content")}` } style={{height:'100%'}}
//             >
//               <LoginContext.Provider value={{ otpDisplay: displayOtp, setOtp: otp }}>
//                 {/* <LoginContainer /> */}

//               </LoginContext.Provider>
//             </div>
//             <div
//               className={`content ${getActiveClass(2, "active-content")}`}
//             >
//               {/* <CorporateMain/> */}
//             </div>
//           </div>

//         </div>
//       {/* <FooterCommon/> */}
//       </div>

//     </>
//   );
// };

// export default Register;

import classes from "../Register/Register.module.css";
import "./Register.css";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { SET_USER } from "../../constants";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Button } from "@mui/base";
// import LoginContainerChild from "./LoginChildContainer";
// import CorporateContainer from "./CorporateContainer";
import LoginContext from "./RegisterContext";
import TextFieldForm from "../../components/common/textFieldForm";
import { errorMessages } from "../../components/utilities/formValidation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import SweetAlertPopup from "../../components/common/sweetAlertPopup";
import LoginContainer1 from "./LoginContainer1";
import RegisterContainer1 from "./RegisterContainer1";
import RegisterContext from "./RegisterContext";
import { Navigate } from "react-router-dom/dist";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OTPInput from "react-otp-input";
import { useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  const defaultFormData = {
    otp: "",
    tpin1: "",
    pass: "",
    confirmtpin1: "",
    confirmpassword: "",
  };

  const [ToggleState, setToggleState] = useState(1);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [displayOtp, setOtp] = useState(false);
  const [otpSub, setOtpSub] = useState("");
  const [displayTpin, setTpin] = useState(false);
  const [Custno, setCustno] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [isOtpEntered, setIsOtpEntered] = useState(false);

  //   const { otpDisplay, setOtp, custNo } = useContext(RegisterContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const otp = (value) => {
    setOtp(value);
  };

  const custNo = (value) => {
    setCustno(value);
  };

  function handleSignup() {
    navigate("/auth/login");
  }

  const dispatch = useDispatch();

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

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  const [ToggleStateLogin, setToggleStateLogin] = useState(1);

  const toggleTabLogin = (index) => {
    setToggleStateLogin(index);
  };

  function handleLogin() {
    navigate("/auth/login");
  }

  console.log("Otp", user);

  useEffect(() => {
    setOtpSub("");
setIsOtpEntered(false)
  }, []);

  const onSubmitOtp = async (data) => {
    setLoading(true);
    const payload = {
      custNo: Custno,
      otp: otpSub,
    };
    const response = await postApiData(apiList.REGISTEROTP, payload);
    console.log("otpresponse", response?.status);
    if (response?.status == true) {
      SweetAlertPopup(response.message, "Success", "success");
      reset();
      setOtpSub("");
      setLoading(false);
      setTpin(true);
    } else {
      SweetAlertPopup(response.message, "Error", "error");
   
      setLoading(false);
      setOtpSub("");
      setOtp(false);
      reset();
      window.location.reload();
    }
  };

  console.log("Custno", Custno);
  const onSubmits = async (data) => {
    setisLoading(true);
    const payload = {
      custNo: Custno,
      setPassword: data.pass,
      setTpin: data.tpin1,
    };
    const response = await postApiData(apiList.TPINPASS, payload);
    if (response.status == true) {
      SweetAlertPopup(response.message, "Please Login", "success");
      setisLoading(false);

      setOtp(false);
      handleSignup();
    } else {
      
      SweetAlertPopup(response.message, "Error", "error");
      setisLoading(false);
      setOtp(false);
    }
  };

  const getActiveClassLogin = (index, className) =>
    ToggleStateLogin === index ? className : "";

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "133px",
    height: "33px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  const passwordMatchValidation = (value) => {
    const newPassword = getValues("pass");
    return newPassword === value || "Password does not match";
  };

  const passwordMatchValidationTPIN = (value) => {
    const newPassword1 = getValues("tpin1");
    return newPassword1 === value || "TPIN does not match";
  };

  return (
    <>
      <div className={classes.mainpagewithback}>
        <div className={classes.mainfile}>
          {!displayOtp ? (
            <Box
              className={classes.box}
              // component="form"
              // onSubmit={handleSubmit(onSubmit)}
            >
              <div className={classes.textcontainer}>
                <span onClick={handleLogin} className={classes.loginbutton}>
                  <KeyboardBackspaceIcon /> Back to Login
                </span>
                <div className={classes.uppertext}>Register</div>
              </div>

              <div className="container">
                <ul className="tab-list">
                  <li
                    style={{ fontSize: "14px" }}
                    className={`tabs ${getActiveClass(1, "active-tabs")}`}
                    onClick={() => toggleTab(1)}
                  >
                    With Card
                  </li>
                  <li
                    style={{ fontSize: "14px" }}
                    className={`tabs ${getActiveClass(2, "active-tabs")}`}
                    onClick={() => toggleTab(2)}
                  >
                    With Customer No.
                  </li>
                </ul>
              </div>

              {/* <div className={classes.tabBodyContent}> */}
              <div className="content-container">
                <div
                  className={`content ${getActiveClass(1, "active-content")}`}
                >
                  <RegisterContext.Provider
                    value={{
                      otpDisplay: displayOtp,
                      setOtp: otp,
                      custNo: custNo,
                    }}
                  >
                    <LoginContainer1 />
                  </RegisterContext.Provider>
                </div>

                <div
                  className={`content ${getActiveClass(2, "active-content")}`}
                >
                  <div className="container">
                    <ul className="tab-list"></ul>
                    {/* <div className={classes.CorporateChange} style={{width:'400px',display:'flex',justifyContent:'end'}}>
                </div> */}
                    <RegisterContext.Provider
                      value={{
                        otpDisplay: displayOtp,
                        setOtp: otp,
                        custNo: custNo,
                      }}
                    >
                      <RegisterContainer1 />
                    </RegisterContext.Provider>
                  </div>
                </div>
              </div>
            </Box>
          ) : (
            <>
              {!displayTpin ? (
                <Box
                  className={classes.box2}
                  component="form"
                  onSubmit={handleSubmit(onSubmitOtp)}
                >
                  <div
                    className={classes.backbutton}
                    onClick={() => setOtp(false)}
                  >
                    <KeyboardBackspaceIcon />
                    Back
                  </div>
                  <div className={classes.firsttabinfo}>
                    <div className={classes.textcontainer1}>
                      <div className={classes.uppertext1}>Register</div>
                    </div>

                    {/* <div className={classes.verifysign}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <circle cx="30" cy="30" r="30" fill="#04E091" />
                    <path
                      d="M42 22L25.5 38.5L18 31"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  ATM PIN Verified
                </div> */}
                    <Grid item xs={12} sm={8} md={12}>
                      <div
                        className={classes.frowdataaff}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className={classes.frowtextaff}>
                          Enter Four Digit OTP
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          {/* <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "otp",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                        
                          placeholder: "OTP",
                         
                          fullWidth: true,
                        }}
                        regExp={/^[0-9@]+$/}
                        rules={{
                          required:
                            "OTP " + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      /> */}
                          <OTPInput
                            value={otpSub}
                            // onChange={setOtpSub}

                            onChange={(otpValue) => {
                              setOtpSub(otpValue);
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
                              height: "50px",
                              fontSize: "16px",
                              borderRadius: "9px",
                              borderColor:
                                "internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
                            }}
                            containerStyle={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          />
                        </div>
                      </div>
                    </Grid>
                  </div>
                  {/* <div className={classes.button}>
                    <ColorButton1
                      loading={isLoading}
                      variant="contained"
                      type="submit"
                      disabled={!isOtpEntered}
                    >
                      Register
                    </ColorButton1>


                  </div> */}

                  
<div className={classes.button}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={Loading}
                  disabled={!isOtpEntered}
                  sx={{
                    color: "#FFFFFF",
                    // color:'var(--button-color)',
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    backgroundColor: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "115px",
                    height: "32px",
                    "&:hover": {
                      // background: "#808080",
                      background: "var(--button-hover-color)",
                      color: "white",
                    },
                  }}
                >
                  Register
                </LoadingButton>
              </div>


                </Box>
              ) : (
                <Box
                  className={classes.box2}
                  component="form"
                  onSubmit={handleSubmit(onSubmits)}
                >
                  <div
                    className={classes.backbutton}
                    onClick={() => setTpin(false)}
                  >
                    <KeyboardBackspaceIcon />
                    Back
                  </div>
                  <div
                    className={classes.firsttabinfo}
                    style={{ width: "100%" }}
                  >
                    <div className={classes.textcontainer1}>
                      <div className={classes.uppertext1}>
                        Set Password and Tpin
                      </div>
                    </div>

                    <Grid item xs={12} sm={12} md={12} style={{ width: "80%" }}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Set Password
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          {/* <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "pass",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{

                      
                        placeholder: "Set Password",
                       
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z0-9@]+$/}
                      rules={{
                        required:
                          "Customer No " + errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    /> */}

                          <Controller
                            name="pass"
                            control={control}
                            defaultValue=""
                            rules={{
                              required:
                                "Password " +
                                errorMessages.error_autocomplete_message,
                              pattern: {
                                // value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z]).{8,}$/,
                                value:
                                  /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit
                                message:
                                  "2 special character,1 Uppercase,1 digit",
                              },
                            }}
                            render={({ field, fieldState }) => {
                              const handleInputChange = (event) => {
                                const regex = /^[a-zA-Z@#.&0-9]+$/;
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
                                  placeholder="Enter Password"
                                  type={showPassword ? "text" : "password"}
                                  {...field}
                                  sx={{
                                    "& fieldset": { border: "none" },
                                    ".MuiInputBase-root": {
                                      marginTop: "3px",
                                      borderRadius: "6px",
                                      position: "relative",
                                      backgroundColor: "#FFF",
                                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                      border: "1px solid",
                                      fontSize: "13px",
                                      height: "2px",
                                      color: "#888",
                                      fontWeight: "500",
                                      padding: "16px 0px",
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
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} style={{ width: "80%" }}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Confirm Password
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <Controller
                            name="confirmpassword"
                            control={control}
                            defaultValue=""
                            rules={{
                              required:
                                "Password " +
                                errorMessages.error_autocomplete_message,
                              pattern: {
                                // value: /^\d{4}$/,
                                // value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                value:
                                  /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message:
                                  "2 special character,1 Uppercase,1 digit",
                              },
                              validate: passwordMatchValidation,
                            }}
                            render={({ field, fieldState }) => {
                              const handleInputChange = (event) => {
                                const regex = /^[a-zA-Z@#.&0-9]+$/;
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
                                  placeholder="Confirm Password"
                                  type={showPassword1 ? "text" : "password"}
                                  {...field}
                                  sx={{
                                    "& fieldset": { border: "none" },
                                    ".MuiInputBase-root": {
                                      marginTop: "3px",
                                      borderRadius: "6px",
                                      position: "relative",
                                      backgroundColor: "#FFF",
                                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                      border: "1px solid",
                                      fontSize: "13px",
                                      height: "2px",
                                      color: "#888",
                                      fontWeight: "500",
                                      padding: "16px 0px",
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
                                          {!showPassword1 ? (
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
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} style={{ width: "80%" }}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Set TPIN
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <Controller
                            name="tpin1" // The name should match the key in 'data' object in onSubmit
                            control={control}
                            defaultValue="" // Set an initial value if needed
                            rules={{
                              required:
                                "TPIN " +
                                errorMessages.error_autocomplete_message,
                              pattern: {
                                value: /^[0-9]{4,}$/, // This pattern allows only digits and requires at least 4 digits
                                message: "Enter valid TPIN",
                              },
                            }}
                            render={({ field, fieldState }) => {
                              const handleInputChange = (event) => {
                                const regex = /^[0-9]+$/;
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
                                  placeholder="Enter TPIN "
                                  maxLength={4}
                                  type={showPassword2 ? "text" : "password"}
                                  {...field} // Spread the 'field' props to bind it to the form's state
                                  sx={{
                                    "& fieldset": { border: "none" },
                                    ".MuiInputBase-root": {
                                      marginTop: "3px",
                                      borderRadius: "6px",
                                      position: "relative",
                                      backgroundColor: "#FFF",
                                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                      border: "1px solid",
                                      fontSize: "13px",
                                      height: "2px",
                                      color: "#888",
                                      fontWeight: "500",
                                      padding: "16px 0px",
                                    },
                                  }}
                                  inputProps={{ maxLength: 4, minLength: 4 }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword2}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {!showPassword2 ? (
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
                                  // error={field.error} // Pass the error state here
                                  // helperText={passwordError ? "Password does not meet requirements" : ""}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} style={{ width: "80%" }}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Confirm TPIN
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <Controller
                            name="confirmtpin1"
                            control={control}
                            defaultValue=""
                            rules={{
                              required:
                                "TPIN " +
                                errorMessages.error_autocomplete_message,
                              pattern: {
                                value: /^[0-9]{4,}$/, // This pattern allows only digits and requires at least 4 digits
                                message: "Enter valid TPIN",
                              },
                              validate: passwordMatchValidationTPIN,
                            }}
                            render={({ field, fieldState }) => {
                              const handleInputChange = (event) => {
                                const regex = /^[0-9]+$/;
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
                                  placeholder="Confirm TPIN"
                                  type={showPassword3 ? "text" : "password"}
                                  {...field}
                                  sx={{
                                    "& fieldset": { border: "none" },
                                    ".MuiInputBase-root": {
                                      marginTop: "3px",
                                      borderRadius: "6px",
                                      position: "relative",
                                      backgroundColor: "#FFF",
                                      // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                      border: "1px solid",
                                      fontSize: "13px",
                                      height: "2px",
                                      color: "#888",
                                      fontWeight: "500",
                                      padding: "16px 0px",
                                    },
                                  }}
                                  inputProps={{ maxLength: 4, minLength: 4 }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword3}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {!showPassword3 ? (
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
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </Grid>
                  </div>
                  <div className={classes.button}>
                    <ColorButton1
                      loading={isLoading}
                      variant="contained"
                      type="submit"
                    >
                      Register
                    </ColorButton1>
                  </div>
                </Box>
              )}
            </>
          )}
        </div>
        <div className={classes.backgroundimglogin}></div>
      </div>
    </>
  );
};

export default Register;
