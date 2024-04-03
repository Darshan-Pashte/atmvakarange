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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoBackButton from "../../../../components/common/GoBackButton";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";

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

const MobileAppUserCreate = () => {
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
  

  const [bankcode, setBankCode] = useState([]);
  const navigate = useNavigate();
  // const { dispatch: authDispatch } = useContext(AuthContext);
  const [clientId, setClientId] = useState("");
  const [openPop, setOpenPop] = useState(false);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // console.log("user", user);

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);



  // const vpaCreate1 = async () => {
  //   setIsBankloading(true);
  //   try {
  //     const payload = {
  //       requestCode: "getBankList",
  //       userId: username,
  //       sessionId: token,
  //       bankCode: "ALL",
  //     };
  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);
  //     if (response.respCode == "IS") {
  //       // authDispatch({ type: REMOVE_USER });
  //       navigate("/auth/login");
  //       SweetAlertPopup(response?.respMsg, "Error", "error");
  //     }
  //     setbankNamee(response?.bankList);
  //     setIsBankloading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsBankloading(false);
  //   }
  // };

  const filteredData =
    bankNamee &&
    bankNamee
      ?.filter((item) => item.hasOwnProperty("bankcode"))
      ?.map((item) => ({ code: item.bankcode, value: item.bankname }));

  // const vpaCreate = async () => {
  //   setIsMidloading(true);
  //   try {
  //     const payload = {
  //       requestCode: "getMccList",
  //       userId: username,
  //       sessionId: token,
  //     };
  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);
  //     if (response.respCode == "IS") {
  //       // authDispatch({ type: REMOVE_USER });
  //       navigate("/auth/login");
  //       SweetAlertPopup(response?.respMsg, "Error", "error");
  //     }
  //     setUpiList(response?.data);
  //     setIsMidloading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsMidloading(false);
  //   }
  // };

  // const handleVerifyPan = async () => {
  //   try {
  //     if (!/^([A-Za-z]{5})(\d{4})([A-Za-z]{1})$/.test(watch("panNo"))) {
  //       return SweetAlertPopup(
  //         "Please Enter Valid PAN Number",
  //         "Error",
  //         "error"
  //       );
  //     }
  //     setIsloading(true);
  //     let payload = {
  //       requestCode: "panValidate",
  //       userId: username,
  //       sessionId: token,
  //       createVPARequest: {
  //         bankCode: watch("bankCode")?.code,
  //         panNo: watch("panNo"),
  //       },
  //     };
  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);

  //     console.log("response", response);

  //     if (response?.respCode === "01") {
  //       SweetAlertPopup("Incorrect PAN Details !", "Error", "error");
  //       // popupAlert(response?.data?.message, "Error", "error");
  //       setIsloading(false);
  //     } else {
  //       SweetAlertPopup("Verified !", "success", "success");
  //       // setName(watch("pancardNo"));
  //       // setPanData(response?.data?.data?.data?.data?.full_name)
  //       setValue("name", response?.data?.data?.data?.data?.full_name);
  //       // setValue("firstName", response?.data?.data?.data?.data?.full_name_split[0]);
  //       // setValue("fatherName", response?.data?.data?.data?.data?.full_name_split[1]);
  //       // setValue("lastName", response?.data?.data?.data?.data?.full_name_split[2]);
  //       setValue("mobileNo", response?.data?.data?.data?.data?.phone_number);
  //       // setValue("address1", response?.data?.data?.data?.data?.address?.line_1);
  //       // setValue("address2", response?.data?.data?.data?.data?.address?.line_2);
  //       // setValue("address3", response?.data?.data?.data?.data?.address?.street_name);
  //       setValue("emailId", response?.data?.data?.data?.data?.email);
  //       // setValue("dob", convertDate(response?.data?.data?.data?.data?.dob, 4));
  //       // setValue("pincode", response?.data?.data?.data?.data?.address?.zip);
  //       // setValue("state", compareTextAndReturnObject(lookupData?.data?.lookup, response?.data?.data?.data?.data?.address?.state));
  //       // setValue("city", compareTextAndReturnObject(cityData?.data?.lookup, response?.data?.data?.data?.data?.address?.city));
  //       // setValue("sex", compareIdAndReturnObject(Sex, response?.data?.data?.data?.data?.gender));
  //       // setName(response?.data?.full_name);
  //       setIsloading(false);
  //     }
  //     setIsloading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsloading(false);
  //   }
  // };

  // const handleValidateAccount = async () => {
  //   try {
  //     setIsloading(true);
  //     let payload = {
  //       requestCode: "bankAcctValidate",
  //       userId: username,
  //       sessionId: token,
  //       createVPARequest: {
  //         bankCode: watch("bankCode")?.code,
  //         acctNo: watch("settlementAcc"),
  //         ifscCode: watch("settlementIfsc"),
  //       },
  //     };
  //     // const response = await postApiData(apiList.VALIDATEAADHAAR, payload);
  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);
  //     console.log("addhar", response);
  //     if (response?.respCode == "00") {
  //       SweetAlertPopup("Verified Account Number !", "Success", "success");
  //       setValue("nameAsPerBank", response?.data?.data?.full_name);
  //       setIsloading(false);
  //     } else {
  //       SweetAlertPopup("Enter Valid Account Details", "Error", "error");
  //       setIsloading(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setIsloading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
          userId: data.userid,
          firstName: data.firstname,
          lastName: data.lastname,
          mobileNo: data.mobileno,
          email: data.email,
          depart:data.department,
          userlvlcode: data?.usercode?.code,
          bankCd:data?.bankcode?.code ? data?.bankcode?.code : ''
      };
      // console.log('payload',payload)
      const response = await postApiData(apiList.MOBILE_APP_USER_CREATE, payload);
      if (response?.data?.status == true) {
      
        SweetAlertPopup(response?.data?.message, "Success", "success");
        reset()
        navigate("/usermaster/user")
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
   code:'ADMIN',
   value:'ADMIN',
    },
    {
   code:'BANK',
   value:'BANK',
    },
  //   {
  //  code:'MERCHANT',
  //  value:'MERCHANT',
  //   },
  //   {
  //     code:'MAKER',
  //     value:'MAKER',
  //      },
    {
   code:'MERCHANT',
   value:'VENDOR',
    },
    {
      code:'MAKER',
      value:'OPERATION',
       },
  ]


  
    const BankCodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));

    // useEffect(() => {
    //   if (BankCodeList) {
    //     setValue("bankcode", BankCodeList ? compareTextAndReturnObject(BankCodeList, BankCodeList[0]?.value) : '')
    //   }
    // }, [BankCodeList]);


  useEffect(()=>{
// getBankCode()
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
    color: "#042879",
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
    backgroundColor: "#042879",
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
      {isLoading  ? (
        <Loader loading={true} />
      ) : (
        <Loader loading={false} />
      )}
      <GoBackButton/>
      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}> User Registration</div>
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
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "User Id " +
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
                        rules={{
                          required:
                            "First Name " +
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
                        rules={{
                          required:
                            "Last Name " +
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
                        rules={{
                          required:
                            "Mobile Number " +
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
                        rules={{
                          required:
                            "Department " +
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

export default MobileAppUserCreate;
