import * as React from 'react';
import Box from '@mui/material/Box';
import classes from './ForgetPassword.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { TextField, styled } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { postApiData } from '../../components/utilities/nodeApiServices';
import { apiList } from '../../components/utilities/nodeApiList';
import { errorMessages } from '../../components/utilities/formValidation';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlertPopup from '../../components/common/sweetAlertPopup';
import { LoadingButton } from "@mui/lab";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "30px"
};

const ColorButton1 = styled(LoadingButton)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "143px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

const defaultFormData = {
    username: "",
    password: "",
    cpassword: ""
}


export default function ForgetPassOTP({ open, handleOpen, handleClose, userId, payloads,custNo }) {
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
        setValue("username", userId)
        // setLastLogin(sessionStorage.getItem("lastLogin"))
    }, []);

    const navigate = useNavigate();
    const [isOtpEntered, setIsOtpEntered] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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


    // const [userName, setUserName] = React.useState("");

    // React.useEffect(() => {
    //   setUserName(sessionStorage.getItem("username"))
    // }, []);
    // console.log("payloads",payloads);

    function handleResetPass(){
navigate('/auth/resetpassword',{state:{custNo:custNo,otp:otp}})
    }


    const onSubmits = async (data) => {
        setisLoading(true)
        
        const payload = {
        
            custNo :custNo,
            otp:otp
            
        }
        const response = await postApiData(apiList.FORGOTPASSOTPVALIDATE, payload)
        // console.log(response,"response")
        if (response.status == true) {
        setisLoading(false)
            handleClose();
            handleResetPass()
            SweetAlertPopup(response.message, "Success", "success");
        } else {
        setisLoading(false)
            handleClose();
            SweetAlertPopup(response.message, "Error", "error");
        }
    };


    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmits)} className={classes.mainbox} style={{borderRadius:'16px'}} >
                    <div className={classes.otpheading}>OTP Verification</div>  
                    <div className={classes.otpheading1}>
                    Enter the verification code we just sent to your number.
                    </div>
                    <OTPInput
                        value={otp}
                        // onChange={setOtp}
                        onChange={(otpValue) => {
                            setOtp(otpValue)
                            setIsOtpEntered(otpValue.length > 3);
                          }}
                        numInputs={4}
                        // renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputType="password"
                        inputStyle={{
                            width: "60px",
                            marginBottom: "10px",
                            marginTop:'10px',
                            height: "50px",
                            fontSize:'20px',
                            borderRadius:'9px',
                            borderColor:'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
                          }}
                       
                          containerStyle={{
                            display:'flex',
                            justifyContent:'space-between'
                           
                          }}
                        />
                    <ColorButton1 variant="contained" type="submit" loading={isLoading} disabled={!isOtpEntered}>
                        Submit
                    </ColorButton1>

                </Box>

            </Modal>
        </div>
    );
}