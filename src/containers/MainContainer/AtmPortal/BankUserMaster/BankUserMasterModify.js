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
  bankcode: "",
  acquiredid:'',
  userid: "",
  name: "",
  bankname:"",
  spoc1name: "",
  spoc1mobno: "",
  mobno:'',
  spoc2name: "",
  spoc2mobno: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  smsid: "",
  userlevelcode:"",
  status:"",
};

const BankUserMasterModify = () => {
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

    setValue("bankcode", state?.bankcd);
    setValue("acquiredid", state?.acqid);
    setValue("userid", state?.userId);
    setValue("name", state?.fullName);

    setValue("mobno", state?.mobileNo);
    setValue("spoc1name", state?.spoc1Name);
    setValue("spoc1mobno",state?.spoc1MobileNo);
    setValue("address1", state?.add1);
    setValue("address2", state?.add2);
    setValue("city", state?.city);
    setValue("state", state?.state);
   
    setValue("usrLvlCode", state?.usrLvlCode);
    setValue("status", state?.status == '7' ? 'New User' : state?.status == '3' ? 'Block' : state?.status == '0' ?'InActive' :'Active ' );
     
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
    userid: data.userid,
    name: data.name,
    mobileNo: data.mobno,
    add1: data.address1,
    add2: data.address2,
    city:data.city,
    state:data.state
  };
      console.log("payload", payload);
      const response = await postApiData(apiList.BANK_USER_MASTER_MODIFY, payload);
      if (response?.status == true) {
        SweetAlertPopup(response.message, "Success", "success");
        // reset()
        navigate("/bankusermaster/bankusermst");
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
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
      setBankCode(response?.bankCodes);
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
          <div className={classes.bluerow}>Bank User Modify</div>
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
                     Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "name",
                          placeholder: "Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        // rules={{
                        //   required:
                        //     "Name " +
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
                      Mobile No.<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "mobno",
                          placeholder: " MobileNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Mobile No",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "MobileNo " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Code<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "bankcode",
                          placeholder: "Bank Code",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Bank Code",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        // rules={{
                        //   required:
                        //     "Bank Code " +
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
                      Acquire Id<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "acquiredid",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "Acquire Id",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Acquire Id " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                {/* <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                    Bank Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "bankname",
                          placeholder: "Bank Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Bank Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^.*$/}
                        rules={{
                          required:
                            "Name " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid> */}
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Spoc1 Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "spoc1name",
                          placeholder: "Spoc1 Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Spoc1 Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/} 
                        // rules={{
                        //   required:
                        //     "Spoc1 Name " +
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
                      Spoc1 MobileNo<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "spoc1mobno",
                          placeholder: " Spoc1 MobileNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Spoc1 MobileNo",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Spoc1 MobileNo " +
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
                      Address 1<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "address1",
                          placeholder: " Address 1",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Address 1",
                          // style: { width: "33vw" },
                          multiline:true,
                          rows:3,
                          fullWidth: true,
                          inputProps : {maxLength: 40}
                        }}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "Address 1 " +
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
                      Address 2<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "address2",
                          placeholder: " Address 2",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Address 2",
                          // style: { width: "33vw" },
                          multiline:true,
                          rows:3,
                          fullWidth: true,
                          inputProps : {maxLength: 40}
                        }}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "Address 2 " +
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
                      City<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "city",
                          placeholder: " City",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " City",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z ]+$/}
                        // rules={{
                        //   required:
                        //     "City " + errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      State<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "state",
                          placeholder: " State",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " State",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z ]+$/}
                        // rules={{
                        //   required:
                        //     "State " + errorMessages.error_autocomplete_message,
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
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "userlevelcode",
                        //   placeholder: "User Code",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: "User Code",
                          placeholder: "BANKID",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Code " +
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
                    Status<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "status",
                        //   placeholder: "User Code",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: "Status",
                         
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true

                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Status " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

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

export default BankUserMasterModify;
