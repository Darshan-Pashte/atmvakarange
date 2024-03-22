import classes from '../MainContainer/AtmPortal/Airtel.module.css';
import { useNavigate } from 'react-router-dom';
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
import ForgotPasswordOTPModal from './ForgotPasswordOTPModal';
import GoBackButton from '../../components/common/GoBackButton';
import loginleftimage from "../../assets/images/commonforweb/loginleftimage.png";
// import headerLogo from "../../assets/images/commonforweb/silkpay.png";
import headerLogo from "../../assets/images/commonforweb/SwiftCorePe.svg";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const defaultFormData = {
  email: "",
  password: ""
}

const ForgotPassword = () => {
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
  const [info, setInfo] = useState("");
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        username: data.email,
  
      };
      
      const response = await postApiData(apiList.FORGOT_PASSWORD, payload);
      // console.log(response);
      if (response?.status == true) {
       
        setUserId(response.smsId);
        setUserName(data.email);
        setInfo(response)
        reset()
        handleOpen()
        setIsLoading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsLoading(false);
      }
 
    } catch (error) {
      dispatch(loginFailure("An error occurred"));
    }
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
            <div className={classes.uppertextforgot}>Forgot Password</div>
            <div className={classes.lowertextforgot} style={{textAlign:'center',fontSize:'15px'}}>Please enter Username, we will send OTP to your registered mobile number</div>
          </div>

          <Grid item xs={12} sm={8} md={8} style={{ width: "80%" }}>
            <div className={classes.frowdataaff}>
              <div className={classes.frowtextaff}>Username<sup className={classes.required}>*</sup></div>
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
                    placeholder: "Please Enter Username",
                    // style: { width: "33vw" },
                    fullWidth: true,
                  }}
                  regExp={/^[a-zA-Z1-9]+$/}
                  rules={{
                    required:
                      "Username " + errorMessages.error_autocomplete_message,
                  }}
                  required={true}
                />
              </div>
            </div>
          </Grid>

          
          <div className={classes.button} style={{width:'80%'}}>
          <ColorButton1 variant="contained" type="submit">
            Submit
          </ColorButton1>
          </div>
          {
            open ? <ForgotPasswordOTPModal open={open} handleClose={handleClose} userId={userId} userName={userName} info={info}/> : null
          }
        </Box>
      </div>
      </div>
      </div>
    </>

  );
};

export default ForgotPassword;
