import * as React from 'react';
import Box from '@mui/material/Box';
import classes from './ForgetPassword.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { Grid, TextField, styled } from "@mui/material";
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

const ColorButton1 = styled(Button)(({ theme }) => ({
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
        background: "#808080",
        color: "white",
    },
}));

const defaultFormData = {
    username: "",
    password: "",
    cpassword: ""
}


export default function ForgetPassOTP({ open, handleOpen, handleClose, userId, payloads, custNo }) {
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

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordfirst, setShowPasswordfirst] = React.useState(false);

    const [otp, setOtp] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordfirst = () => setShowPasswordfirst((show) => !show);
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

    function handleResetPass() {
        navigate('/auth/login', { state: { custNo: custNo, otp: otp } })
    }


    const onSubmits = async (data) => {


        const payload = {

            username: custNo,
            otp: otp,
            newpassword: data.confirmpassword
        }
        const response = await postApiData(apiList.CORPORATE_SET_NEW_PASSWORD, payload)
        // console.log(response, "response")
        if (response?.status == true) {
            handleClose();
            handleResetPass()
            SweetAlertPopup(response.message, "Success", "success");

        } else {
            handleClose();
            SweetAlertPopup(response.message, "Error", "error");
        }
    };


    const passwordMatchValidation = (value) => {
        const newPassword = getValues("password");
        return newPassword === value || "New password and confirm password does not match !";
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
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmits)} className={classes.mainbox} style={{ borderRadius: '16px' }} >
                    <div className={classes.otpheading}>OTP Verification</div>
                    <div className={classes.otpheading1}>
                        Enter the verification code we just sent to your number.
                    </div>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        // renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputType="password"
                        inputStyle={{
                            width: "60px",
                            marginBottom: "10px",
                            marginTop: '10px',
                            height: "50px",
                            fontSize: '20px',
                            borderRadius: '9px',
                            borderColor: 'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
                        }}

                        containerStyle={{
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                    />


                    <div className={classes.frowdataaff} style={{ width: '100%' }}>
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
                                                marginTop: '3px',
                                                borderRadius: '6px',
                                                position: 'relative',
                                                backgroundColor: '#FFF',
                                                // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                                border: '1px solid',
                                                fontSize: '13px',
                                                height: "2px",
                                                color: '#888',
                                                fontWeight: '500',
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

                    <div className={classes.frowdataaff} style={{ width: '100%' }}>
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
                                        type={showPasswordfirst ? "text" : "password"}
                                        {...field}
                                        sx={{
                                            "& fieldset": { border: "none" },
                                            ".MuiInputBase-root": {
                                                marginTop: '3px',
                                                borderRadius: '6px',
                                                position: 'relative',
                                                backgroundColor: '#FFF',
                                                // backgroundColor: backgroundColor?'#FFF' : "#EEEFF7",
                                                border: '1px solid',
                                                fontSize: '13px',
                                                height: "2px",
                                                color: '#888',
                                                fontWeight: '500',
                                                padding: '16px 0px',
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPasswordfirst}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {!showPasswordfirst ? <VisibilityOff /> : <Visibility />}
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


                    <ColorButton1 variant="contained" type="submit" >
                        Submit
                    </ColorButton1>

                </Box>

            </Modal>
        </div>
    );
}