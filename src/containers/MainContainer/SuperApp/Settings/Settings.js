import React from "react";
import classes from "../Settings/Settings.module.css";

import grid1logo from "../../../../assets/CardsPics/grid1logo.png";

import { useNavigate } from "react-router-dom";
// import { Field, Form, Formik } from 'formik';
// import { LoginFormInitialValues, LoginFormValidation } from '../../validations/LoginFormValidation';
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField,Typography } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import { RemoveRedEye } from "@mui/icons-material";

// import { useForm, Controller } from 'react-hook-form';
import Input from "@mui/material/Input"; // Assuming you're using Material-UI Input
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { userData } from "./userDataHome";



import Switch from "@mui/material/Switch";

import Checkbox from "@mui/material/Checkbox";
import AccountService from "./AccountService";
import Profile from "./Profile";

const labelcheck = { inputProps: { "aria-label": "Checkbox demo" } };
const labelswitch = { inputProps: { "aria-label": "Switch demo" } };

const defaultFormData = {
  email: "",
  password: "",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: " #DAE2F6",
      color: "#323232",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  
  function createData(
    name,
    account,
    accountType,
    balance,
    withdrawable,
    currency,
    uncleared,
    amb
  ) {
    return {
      name,
      account,
      accountType,
      balance,
      withdrawable,
      currency,
      uncleared,
      amb,
    };
  }


const Settings = () => {
    const [valueTable, setValueTable] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValueTable(newValue);
    };
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userId, setUserId] = useState("");

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

  const onSubmit = async (data) => {
    const payload = {
      username: data.email,
      password: data.password,
    };
    const response = await postApiData(apiList.LOGIN, payload);
    console.log("response", response);
    setUserId(data?.email);
    if (response.status == false) {
      if (response.respCode == "NEW") {
        handleOpen();
      } else {
        popupAlert(response.message, "Error", "error");
      }
    } else {
      // dispatchSetUser({
      //   user: data?.email,
      //   token: response?.data?.sessionId,
      //   username: data?.email,
      // });
      // sessionStorage.setItem("TOKEN", JSON.stringify(response.data.sessionId));
      // sessionStorage.setItem("menu", response?.data?.menu);
      sessionStorage.setItem("lastLogin", response?.data?.lastLoginDate);

      // sessionStorage.setItem("username", JSON.stringify(data.email));
      navigate("/dashboard");
      // navigate("/dashboard",{ state: { username: data.email} });
    }
    // if (window.location.href.includes("/dashboard")) {
    //   window.location.reload();
    // }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883;",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      <div className={classes.cardsmainpage}>
        <div className={classes.cardsheader}>Settings</div>
       

        <div className={classes.cardscontent}>
          <Grid
            container
            columnSpacing={4}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >
           

            <Grid item xs={12} sm={12} md={12}>

            <Box className={classes.tableMainBox}>
                
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: " var( --common-background-color)",
              borderRadius: 2,
            }}
          >
            <Tabs
              value={valueTable}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="primary"
            >
              {/* <Tab label="Account Settings" {...a11yProps(0)} /> */}
              {/* <Tab label="Card Settings" {...a11yProps(1)} /> */}
              {/* <Tab label="Payment Gateway Settings" {...a11yProps(2)} /> */}
              <Tab style={{color:'var(--common-heading-color)'}} label="Profile Settings" {...a11yProps(0)} />
              {/* <Tab label="Security Settings" {...a11yProps(4)} /> */}
            </Tabs>
          </Box>
          {/* <CustomTabPanel value={valueTable} index={0}>
       <AccountService/>
          </CustomTabPanel> */}
          {/* <CustomTabPanel value={valueTable} index={1}>
            Item Two
          </CustomTabPanel> */}
          {/* <CustomTabPanel value={valueTable} index={2}>
            Item Three
          </CustomTabPanel> */}
          <CustomTabPanel value={valueTable} index={0}>
           <Profile/>
          </CustomTabPanel>
          {/* <CustomTabPanel value={valueTable} index={4}>
            Item Three
          </CustomTabPanel> */}
        </Box>


            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Settings;
