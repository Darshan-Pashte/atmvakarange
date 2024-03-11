import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../../../../ForgetPassword/ForgetPassword.module.css';
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
import { postApiData } from '../../../../../components/utilities/nodeApiServices';
import { apiList } from '../../../../../components/utilities/nodeApiList';
import { errorMessages } from '../../../../../components/utilities/formValidation';
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "30px"
};

const ColorButton = styled(LoadingButton)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    backgroundColor: "#323232",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "50px",
    "&:hover": {
        background: "#808080",
        color: "white",
    },
}));

const defaultFormData = {
    username: "",
    password: "",
    cpassword: ""
}


export default function UpdateImpsOTP({ open, handleOpen, handleClose, userId, payloads }) {
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

    const [showPassword, setShowPassword] = React.useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const [loadings, setloading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const dispatch = useDispatch();


    const [isOtpEntered, setIsOtpEntered] = useState(false);

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
    console.log("payloads", payloads);



    const onSubmits = async (data) => {
        const payload = {
            amount: payloads?.amount,
            tpin: payloads?.tpin,
            custNo: payloads?.custNo,
            sessionId: payloads?.sessionId,
            accNo: payloads?.accNo,
            beneNickname: payloads?.beneNickname,
            beneAccNo: payloads?.beneAccNo,
            beneIfsc: payloads?.beneIfsc,
            remark: payloads?.remark,
            rrno: userId?.rrn,
            beneName:payloads?.beneName,
            strotp: otp
        }
        setIsloading(true);
        const response = await postApiData(apiList.IMPSTRANSACTIONS, payload)

        if (response?.status == true) {
            setIsloading(false);
            handleClose();
            popupAlert(response.message, "Success", "success");
        } else {
            setIsloading(false);
            handleClose();
            popupAlert(response.message, "Error", "error");
        }
    };


    return (
        <div>
          
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmits)} className={classes.mainbox} style={{ borderRadius: '16px' }} >
                    <div className={classes.otpContent}>
                        <div className={classes.otpheading}>OTP Verification</div>
                        <div className={classes.cancelButton}>
                            <IconButton aria-label="delete"  onClick={handleClose}>
                                <HighlightOffIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div>
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
                            width: "70px",
                            marginBottom: "10px",
                            marginTop: '10px',
                            height: "60px",
                            fontSize: '20px',
                            borderRadius: '9px',
                            // borderColor:'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
                        }}

                        containerStyle={{
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                    />
                    <div className={classes.button}>
                        <LoadingButton
                            variant="contained"
                            type="submit"
                            loading={isLoading}
                            disabled={!isOtpEntered}
                            sx={{
                                color: "#FFFFFF",
                                // backgroundColor: "#F84B67",
                                // backgroundColor: "#323232",
                                backgroundColor: "var( --button-color)",
                                border: "1px solid #CCC",
                                borderRadius: "8px",
                                paddingLeft: "15px",
                                paddingRight: "15px",
                                width: "183px",
                                height: "40px",
                                "&:hover": {
                                    background: "var(  --button-hover-color)",
                                    color: "white",
                                },
                            }}
                        >
                            Submit
                        </LoadingButton>
                    </div>

                </Box>

            </Modal>
        </div>
    );
}