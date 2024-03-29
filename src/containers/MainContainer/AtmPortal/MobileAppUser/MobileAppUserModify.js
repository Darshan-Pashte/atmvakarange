import classes from "../Airtel.module.css";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { Controller, useForm } from "react-hook-form";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import Loader from "../../../../components/common/loader";
import TextFieldFormNew from "../../../../components/common/textFieldFormNew";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { REMOVE_USER } from "../../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { convertDate } from "../../../../components/utilities/convertDate";
import { useSelector } from "react-redux";
import GoBackButton from "../../../../components/common/GoBackButton";
import {
  compareIdAndReturnObject,
  compareTextAndReturnObject,
} from "../../../../components/common/commonArray";

const defaultFormData = {
  bankcode:'',
  usercode:'',
  department:'',
  email:'',
  mobileno:'',
  firstname:'',
  lastname:'',
  userid:''
};

const MobileAppUserModify = () => {
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

  // const { state: user } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [upiList, setUpiList] = useState([]);
  const [banksCode, setbanksCode] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isBankLoading, setIsBankloading] = useState(false);
  const [isMidLoading, setIsMidloading] = useState(false);
  const [bankNamee, setbankNamee] = useState([]);
  const navigate = useNavigate();
  // const { dispatch: authDispatch } = useContext(AuthContext);
  const [clientId, setClientId] = useState("");
  const [openPop, setOpenPop] = useState(false);


  
  const [bankcode, setBankCode] = useState([]);


  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  console.log("user", user);

  const { state } = useLocation();
  console.log("state", state);

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  useEffect(() => {
    // setValue("smsid", compareTextAndReturnObject(SMSIDList, state?.smsId));

    setValue("userid", state?.userId);
    setValue("lastname", state?.lastName);
    setValue("firstname", state?.firstName);
    setValue("mobileno", state?.mobileNo);
    setValue("email", state?.emailId);
    setValue("department", state?.dept);
    setValue("usercode",compareTextAndReturnObject(UserCodeList,state?.usrLvlCode));
    setValue("bankcode", state?.add1);
    
  }, [state]);

  const handleOpen = () => {
    setOpenPop(!openPop);
  };

  const filteredData =
    bankNamee &&
    bankNamee
      ?.filter((item) => item.hasOwnProperty("bankcode"))
      ?.map((item) => ({ code: item.bankcode, value: item.bankname }));

  const SMSIDList = [
    {
      code: "BCUB",
      value: "BCUB",
    },
    {
      code: "CNSB",
      value: "CNSB",
    },
    {
      code: "DMKJ",
      value: "DMKJ",
    },
    {
      code: "DSPL",
      value: "DSPL",
    },
    {
      code: "JCCB",
      value: "JCCB",
    },
    {
      code: "KDCC",
      value: "KDCC",
    },
    {
      code: "KMCB",
      value: "KMCB",
    },
    {
      code: "KNSB",
      value: "KNSB",
    },
    {
      code: "LUCB",
      value: "LUCB",
    },
    {
      code: "MAHAD",
      value: "MAHAD",
    },
    {
      code: "MAHESH",
      value: "MAHESH",
    },
    {
      code: "NCBL",
      value: "NCBL",
    },
    {
      code: "NCBLB",
      value: "NCBLB",
    },
    {
      code: "NMCB",
      value: "NMCB",
    },
    {
      code: "RDCC",
      value: "RDCC",
    },
    {
      code: "RSSB",
      value: "RSSB",
    },
    {
      code: "SATARA",
      value: "SATARA",
    },
    {
      code: "sil",
      value: "sil",
    },
    {
      code: "SSBM",
      value: "SSBM",
    },
    {
      code: "SSUCB",
      value: "SSUCB",
    },
    {
      code: "UCOB",
      value: "UCOB",
    },
    {
      code: "UDUPI",
      value: "UDUPI",
    },
    {
      code: "VAISHY",
      value: "VAISHY",
    },
  ];

  const onSubmits = async (data) => {
    try {
      setIsloading(true);
      const payload = {
      

    username: user?.username,
    sessionId: user?.sessionId,
    userId: data.userid,
    firstName:data.firstname,
    lastName: data.lastname,
    mobileNo: data.mobileno,
    email: data.email,
    depart: data.department,
    userlvlcode: data.usercode.code,
    bankCd: data?.bankcode?.code ? data?.bankcode?.code : ''

      };
      console.log("payload", payload);
      const response = await postApiData(apiList.MOBILE_APP_USER_MODIFY, payload);
      if (response?.data?.status == true) {
        SweetAlertPopup(response?.data?.message, "Success", "success");
        // reset()
        navigate("/mobapp/mobappuser");
        setIsloading(false);
      } else {
        SweetAlertPopup(response?.data?.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };


  
  const UserCodeList=[
    {
   code:'MAKER',
   value:'MAKER',
    },
    {
   code:'ADMIN',
   value:'ADMIN',
    },
    {
   code:'BANK',
   value:'BANK',
    },
    {
   code:'MERCHANT',
   value:'MERCHANT',
    },
  ]

   // useEffect(() => {
  //   if (BankCodeList) {
  //     setValue("bankcode", BankCodeList ? compareTextAndReturnObject(BankCodeList, BankCodeList[0]?.value) : '')
  //   }
  // }, [BankCodeList]);


  
    const BankCodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));

    // useEffect(() => {
    //   if (BankCodeList) {
    //     setValue("bankcode", BankCodeList ? compareTextAndReturnObject(BankCodeList, BankCodeList[0]?.value) : '')
    //   }
    // }, [BankCodeList]);


  useEffect(()=>{
getBankCode()
  },[])

  const getBankCode = async () => {
    setIsloading(true);
    try {
      const payload = {
        
        username: user?.username,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.GET_BANKCODE, payload);
      setBankCode(response?.data?.bankCodes);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    // color: "#FFFFFF",
    color: " #AA1313",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    backgroundColor: "#fff",
    fontFamily:'Poppins',
    boxShadow:'  0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
    fontSize:'12px',
    fontWeight:'600',
    border: "1px solid #fff",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "130px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFF",
    backgroundColor: "#AA1313",
    fontFamily:'Poppins',
    boxShadow:' 0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
    fontSize:'12px',
    // backgroundColor: "#323232",
    // backgroundColor: "#E31E24",
    // border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "130px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <GoBackButton />
      <Box
        className={classes.mainContainer}
        component={"form"}
        onSubmit={handleSubmit(onSubmits)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>User Master Modify</div>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={3}
                rowSpacing={2}
                style={{ paddingRight: "2vw" }}
              >


<Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      User Id<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "userid",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "User Id",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                          inputProps : {maxLength: 10}
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "User Id " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      First Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "firstname",
                          placeholder: "First Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: "First Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z ]+$/}
                        // rules={{
                        //   required:
                        //     "First Name " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Last Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "lastname",
                        //   placeholder: "Spoc1 Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Last Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z ]+$/}
                        // rules={{
                        //   required:
                        //     "Last Name " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                       Mobile Number<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "mobileno",
                        //   placeholder: " Spoc1 MobileNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Mobile Number",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Mobile Number " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      E-mail ID <sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "email",
                        //   placeholder: " Spoc2",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Email Id",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9.@!#$%&’*+/=?^_`{|}~-]+$/}
                        rules={{
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please Enter valid format  of Email",
                          },
                          required:
                            "Email Id " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Department<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "department",
                        //   placeholder: " Spoc2 MobileNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Department",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        // rules={{
                        //   required:
                        //     "Department " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
         
             
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      User Level Code<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "usercode",
                        }}
                        TextFieldProps={{
                          placeholder: "Select ",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[a-zA-Z\s]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "SMS ID " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={UserCodeList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>


                {watch('usercode')?.value == 'BANK' ? 
                (
                  <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Code<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "bankcode",
                        }}
                        TextFieldProps={{
                          placeholder: "Select",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[a-zA-Z0-9 \s]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Bank Code " +
                            errorMessages.error_autocomplete_message,
                        }}
                        // data={FinalBankCodeList}
                        data={BankCodeList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                ):''}
              </Grid>




              

              <div className={classes.fbut}>
                <ColorButton
                  variant="contained"
                  type="button"
                  onClick={() => reset()}
                >
                  RESET
                </ColorButton>
                <ColorButton1 variant="contained" type="submit">
                  Submit
                </ColorButton1>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default MobileAppUserModify;
