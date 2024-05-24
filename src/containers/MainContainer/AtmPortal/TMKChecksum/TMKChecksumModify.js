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
import { compareIdAndReturnObject, compareTextAndReturnObject } from "../../../../components/common/commonArray";

const defaultFormData = {
  depbin: "",
  supplycounterreq: "",
  servicereq: "",
  downisrequest: "",
  atmmake: "",
  resources: "",
  Acquiredid: "",
  downloadfilename: "",
  bankcode: "",
  terminaltype: "",
  downloadDate: null,
  flag: "",
  tpktmk: "",
  tpklmk: "",
  tmk: "",
  serverip: "",
  pincode: "",
  address: "",
  dipcard: "",
  atmtype: "",
  transactioncount: "",
  maxnotes: "",
  type4count: "",
  type3count: "",
  type2count: "",
  type1count: "",
  typedemo4: "",
  typedemo3: "",
  typedemo2: "",
  typedemo1: "",
  machineip: "",
  location: "",
  luno: "",
  atmstatus:"",
  tmkCheckSum:''
};

const TMKChecksumModify = () => {
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



  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
// console.log('user',user)

const { state } = useLocation();
console.log("state", state);


  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  useEffect(() => {
    setValue("atmid",state?.atmId);
    setValue("tmkCheckSum", state?.tmkCheckSum);
  


    setValue("serverip", state?.serverip);
    setValue("tmk", state?.tmk);
    setValue("tpklmk", state?.tpklmk);
    setValue("tpktmk", state?.tpktmk);
  



    setValue("luno", state?.luno);
    setValue("location", state?.location);
    setValue("machineip", state?.ip);



    


}, [state]);



  const handleOpen = () => {
    setOpenPop(!openPop);
  };


  
   


  const onSubmits = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        atmId: data.atmid,
        luno: data.luno,
        location: data.location,
        ip: data.machineip,
        tmk: data.tmk,
        tpklmk: data.tpklmk ? data.tpklmk : '',
        tpktmk: data.tpktmk ? data.tpktmk : '',
        tmkCheckSum: data.tmkCheckSum ? data.tmkCheckSum : '',

      };
      // console.log('payload',payload)
      const response = await postApiData(apiList.TMK_CHECKSUM_MODIFY, payload);
      if (response?.data?.status == true) {
      
        SweetAlertPopup(response?.data?.message, "Success", "success");
        // reset()
       navigate('/tmkchecksum')
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
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
     
      {/* <GoBackButton/> */}
       <Box
        className={classes.mainContainer}
        component={"form"}
        onSubmit={handleSubmit(onSubmits)}
      >
        
        <div className={classes.Sbox}>
        <div className={classes.bluerow} style={{display:'inline-block'}}>   <GoBackButton/>TMK Checksum Modify</div>
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
                      ATM ID<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "atmid",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "ATM ID",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "ATM ID " +
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
                      Luno<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "luno",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Luno",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 4},
                          disabled:true
                        }}
                        backgroundColor={true}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Luno" + errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Location<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "location",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: " Location",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10},
                          disabled:true
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        // rules={{
                        //   required:
                        //     "Location" +
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
                      Machine IP<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "machineip",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: " Machin IP",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 15},
                          disabled:true
                        }}
                        backgroundColor={true}
                        regExp={/^[0-9.]+$/}
                        // rules={{
                        //   required:
                        //     "Machine IP" +
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
                      TPK TMK
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "tpktmk",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "TPK TMK",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                          inputProps : {maxLength: 50}
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "TPK LMK" +
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
                      TPK LMK
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "tpklmk",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "TPK LMK",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                          inputProps : {maxLength: 50}
                        }}
                        backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "TPK TKK" +
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
                      TMK
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "tmk",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "TMK",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 50},
                        //   disabled:true
                        }}
                        // backgroundColor={true}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "TMK" + errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

            



                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      TMK Checksum
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "tmkCheckSum",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "TMK Checksum",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 6,minLength:6}
                          
                        }}
                        regExp={/^[A-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "TMK Checksum" +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                </Grid>

             
                        

             

<div className={classes.fbut}>
  {/* <ColorButton
    variant="contained"
    type="button"
    onClick={() => reset()}
  >
    RESET
  </ColorButton> */}
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

export default TMKChecksumModify;
