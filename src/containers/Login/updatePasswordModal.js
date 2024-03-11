import * as React from 'react';
import Box from '@mui/material/Box';
import classes from './Login.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextFieldForm from '../../components/common/textFieldForm';
import { Controller, useForm } from 'react-hook-form';
import { errorMessages } from '../../components/utilities/formValidation';
import { apiList } from '../../components/utilities/nodeApiList';
import Swal from 'sweetalert2';
import { postApiData } from '../../components/utilities/nodeApiServices';
import { ClassNames } from '@emotion/react';
import { TextField, styled } from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



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
};

const ColorButton = styled(Button)(({ theme }) => ({
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


export default function UpdatePassword({ open, handleOpen, handleClose, userId }) {
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
    const handleClickShowPassword = () => setShowPassword((show) => !show);

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



    const onSubmit = async (data) => {
        const payload = {
            "username": userId ? userId : data?.username,
            "newpass": data.password,
            "confirmpass": data.cpassword
        }
        const response = await postApiData(apiList.UPDATE_DEAFULT_PASSWORD, payload)
        if (response.status == true) {
            handleClose();
            popupAlert(response.message, "Success", "Password Updated Succesfully");
        } else {
            popupAlert(response.message, "Error", "error");
        }
    };


    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)} className={classes.mainbox} >
                    <div className={classes.updatepass}>Please Update Your Password</div>
                    <TextFieldForm
                        controlerProps={{
                            control: control,
                            name: "username",
                        }}
                        TextFieldProps={{
                            disabled: true,
                            // label: "Branch",
                            placeholder: "Please Enter Username",
                            // style: { width: "33vw" },
                            fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                            required:
                                "Username " + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                    />
                    {/* <TextFieldForm
                        controlerProps={{
                            control: control,
                            name: "password",
                            rows: 5,
                            maxRows: 10,
                        }}
                        TextFieldProps={{
                            type: "password",
                            // label: "Branch",
                            placeholder: "Please Enter Password",
                            // style: { width: "33vw" },
                            fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z@#.&0-9]+$/}
                        rules={{
                            required:
                                "Password " + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                    /> */}

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required:
                                "Password " + errorMessages.error_autocomplete_message,
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                message: "Password does not meet requirements",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                                const regex = /^[a-zA-Z@#.&0-9]+$/;
                                const { name, value } = event.target;
                                const isValidInput = regex.test(value) || value === "";
                                if (!isValidInput) {
                                    event.preventDefault();
                                    return;
                                }
                                field.onChange(value);
                            };
                            return <TextField
                                id="standard-adornment-password"
                                fullWidth="true"
                                placeholder="Please Enter Password"
                                type={showPassword ? "text" : "password"}
                                {...field} 
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    ".MuiInputBase-root": {
                                        borderRadius: '10px',
                                        backgroundColor: "#E8F0FE"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),

                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={handleInputChange}
                            />
                        }
                        }
                    />
                    <TextFieldForm
                        controlerProps={{
                            control: control,
                            name: "cpassword",
                            rows: 5,
                            maxRows: 10,
                        }}
                        TextFieldProps={{
                            // label: "Name",
                            type: "password",
                            placeholder: "Please Confirm Password",
                            // style: { width: "33vw" },
                            fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z@#.&0-9]+$/}
                        rules={{
                            required:
                                "Confirm Password " + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                    />
                    {/* <Controller
                        name="cpassword"
                        control={control}
                        defaultValue="" 
                        rules={{
                            required:
                                "Confirm Password " + errorMessages.error_autocomplete_message,
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 
                                message: "Password does not meet requirements",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                                const regex = /^[a-zA-Z@#.&0-9]+$/;
                                const { name, value } = event.target;
                                const isValidInput = regex.test(value) || value === "";
                                if (!isValidInput) {
                                    event.preventDefault();
                                    return;
                                }
                                field.onChange(value);
                            };
                            return <TextField
                                id="standard-adornment-password"
                                fullWidth="true"
                                placeholder="Please Enter Password"
                                type={showPassword ? "text" : "password"}
                                {...field} // Spread the 'field' props to bind it to the form's state
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    ".MuiInputBase-root": {
                                        borderRadius: '10px',
                                        backgroundColor: "#E8F0FE"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={handleInputChange}
                            />
                        }
                        }
                    /> */}
                    <ColorButton variant="contained" type="submit">
                        Login
                    </ColorButton>
                </Box>

            </Modal>
        </div>
    );
}