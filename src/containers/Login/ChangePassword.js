import classes from '../MainContainer/AtmPortal/Airtel.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import UPI from '../../assets/swiftcore_logo.svg'
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import TextFieldForm from '../../components/common/textFieldForm';
import { useForm, Controller } from 'react-hook-form';
import { errorMessages } from '../../components/utilities/formValidation';
import { Box, Grid, TextField } from '@mui/material';
import { postApiData } from '../../components/utilities/nodeApiServices';
import { apiList } from '../../components/utilities/nodeApiList';
// import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { SET_USER } from '../../constants';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from '../../actions/userActions';
import { useEffect } from 'react';
import styled from 'styled-components';
import TextFieldFormNew from '../../components/common/textFieldFormNew';
import { Button } from '@mui/base';
import UpdatePassword from './updatePasswordModal';
import { RemoveRedEye } from '@mui/icons-material';

// import { useForm, Controller } from 'react-hook-form';
import Input from '@mui/material/Input'; // Assuming you're using Material-UI Input
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Loader from '../../components/common/loader';
import SweetAlertPopup from '../../components/common/sweetAlertPopup';
import { loginFailure, loginStart, loginSuccess, otpSuccess } from '../../store/authSlice';
import LoginOTPModal from './LoginOTPModal';
import GoBackButton from '../../components/common/GoBackButton';
import loginleftimage from "../../assets/images/commonforweb/loginleftimage.png";
// import headerLogo from "../../assets/images/commonforweb/silkpay.png";
import headerLogo from "../../assets/images/commonforweb/SwiftCorePe.svg";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const defaultFormData = {
  email: "",
  password: ""
}


const ChangePassword = () => {
  // const dispatch = useDispatch();
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );

  // console.log("error", error)
  // console.log("user", user)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setisLoading] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);


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
  const navigate = useNavigate()
  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };
  function handleLogin() {
    navigate("/auth/login");
  }




  
 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  const {state}=useLocation()
  // console.log("state",state)


  function handleLogin() {
    navigate("/auth/login");
  }

  const onSubmit = async (data) => {
    setisLoading(true)
    const payload = {
     
        username:state.userName,
        oldpass:data.oldPass,
        newpass:data.password,
        confirmpass:data.confirmpassword,
    };
    const response = await postApiData(apiList.CHANGE_PASSWORD, payload);
    // console.log("response", response);
    if (response?.data?.status == true) {
      setisLoading(false)
        handleLogin();
        SweetAlertPopup(response?.data?.message, "Success", "success");
      } else {
        setisLoading(false)
        SweetAlertPopup(response?.data?.message, "Error", "error");
      }
    };
  
    const passwordMatchValidation = (value) => {
      const newPassword = getValues("password");
      return newPassword === value || "New password and confirm password does not match !";
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
      {isLoading  ? <Loader loading={true} /> : <Loader loading={false} />}
    
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
        {/* <GoBackButton/>Back to Login */}
        {/* <span onClick={handleLogin} className={classes.loginbutton} >
        <KeyboardBackspaceIcon/>  Back to Login
                </span> */}
<img className={classes.lefttitlelogo} src={headerLogo} alt="" />
          <div className={classes.textcontainer}>
            <div className={classes.uppertext}>Reset Password</div>
            {/* <div className={classes.lowertext}>Please Enter your details to access your account</div> */}
          </div>

          <Grid item xs={12} sm={8} md={8} style={{ width: "80%" }}>
            <div className={classes.frowdataaff}>
              <div className={classes.frowtextaff}>Password<sup className={classes.required}>*</sup></div>
              <div className={classes.widthtfield}>
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
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} style={{ width: "80%" }}>
            <div className={classes.widthtfield}>
              <div className={classes.frowtextaff}>Confirm Password<sup className={classes.required}>*</sup></div>
              <div className={classes.frow1aff}>
               
                      
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
              
            </div>
          </Grid>
          <div className={classes.button} style={{ width: "80%" }}>
          <ColorButton1 variant="contained" type="submit">
            Submit
          </ColorButton1>
          </div>
          {
            open ? <LoginOTPModal open={open} handleClose={handleClose} userId={userId} userName={userName} /> : null
          }
        </Box>
      </div>
      </div>
      </div>
    </>

  );
};

export default ChangePassword;




