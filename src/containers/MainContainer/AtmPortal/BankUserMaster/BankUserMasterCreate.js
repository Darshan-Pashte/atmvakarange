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
    userlevelcode:"BANKID"
};

const BankUserMasterCreate = () => {
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

  console.log("user", user);

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);


  
//   const BankcodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));
  const BankcodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd ,'acqId':item.acqId,
  'spoc1MobileNo':item.spoc1MobileNo,'bankerFullName':item.bankerFullName,'spoc1Name':item.spoc1Name
  
}));
  

useEffect(()=>{
    setValue("acquiredid",watch('bankcode')?.acqId)

},[watch('bankcode')])
  

useEffect(()=>{
    setValue("bankname",watch('bankcode')?.bankerFullName)

},[watch('bankcode')])
  

useEffect(()=>{
    setValue("spoc1name",watch('bankcode')?.spoc1Name)

},[watch('bankcode')])
  

useEffect(()=>{
    setValue("spoc1mobno",watch('bankcode')?.spoc1MobileNo)

},[watch('bankcode')])
  

  


 


//   useEffect(() => {
//     if (BankcodeList) {
//       setValue("bankcode", BankcodeList ? compareTextAndReturnObject(BankcodeList, BankcodeList[0]?.value) : '')
//     }
//   }, [BankcodeList]);





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
  
  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        userid:data.userid ,
        name: data.name,
        mobileNo:data.mobno,
        bankCode:data.bankcode.code,
        acqid: data.acquiredid,
        bankname:data.bankname ,
        spoc1name:data.spoc1name,
        spoc1mobileno: data.spoc1mobno,
         add1: data.address1,
        add2: data.address2,
        city:data.city,
        state: data.state,
        pincode: data.pincode,
        userlevelCode: data.userlevelcode
    
      };
      console.log('payload',payload)
      const response = await postApiData(apiList.BANK_USER_MASTER_CREATE, payload);
      if (response?.status == true) {
      
        SweetAlertPopup(response.message, "Success", "success");
        reset()
       
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
    {
      code:'MAKER',
      value:'MAKER',
       },
  ]


 
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
          <div className={classes.bluerow}>Bank User Registration</div>
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
                        rules={{
                          required:
                            "Name " +
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
                        rules={{
                          required:
                            "MobileNo " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
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
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "bankcode",
                        }}
                        TextFieldProps={{
                          placeholder: "Select Bank Code",
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
                        data={BankcodeList}
                        required={true}
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
                        rules={{
                          required:
                            "Acquire Id " +
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
                        regExp={/^[a-zA-Z0-9 ]+$/} 
                        rules={{
                          required:
                            "Name " +
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
                        rules={{
                          required:
                            "Spoc1 Name " +
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
                        rules={{
                          required:
                            "Spoc1 MobileNo " +
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
                        rules={{
                          required:
                            "Address 1 " +
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
                        rules={{
                          required:
                            "Address 2 " +
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
                        rules={{
                          required:
                            "City " + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
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
                        rules={{
                          required:
                            "State " + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Pin Code<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "pincode",
                          placeholder: " Pin Code",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Pin Code",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:6,maxLength: 6}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Pin Code " +
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
                        rules={{
                          required:
                            "Code " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
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

export default BankUserMasterCreate;
