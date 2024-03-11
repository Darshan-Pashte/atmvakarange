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
import DatePickerForm from "../../../../components/common/datePickerForm";
import { convertDate } from "../../../../components/utilities/convertDate";
import { useSelector } from "react-redux";
import GoBackButton from "../../../../components/common/GoBackButton";

const defaultFormData = {
    bin:'',
    binname:"",
    dectable:'',
    pvk:'',
    servicecode:'',
    bankcode:'',
    hostip:'',
    hostport:'',
    bankcd:'',
    acqid:'',
    issatmip:'',
    issatmport:'',
    issposip:'',
    issposport:'',
    mobilebin:'',
    actformat:''
};

const LocalBinMasterCreate = () => {
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


  console.log('user',user)
  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  



  const handleOpen = () => {
    setOpenPop(!openPop);
  };


  const filteredData =
    bankNamee &&
    bankNamee
      ?.filter((item) => item.hasOwnProperty("bankcode"))
      ?.map((item) => ({ code: item.bankcode, value: item.bankname }));

 



 

  const MobileBIN = [
    {
      code: "Y",
      value: "YES",
    },
    {
      code: "N",
      value: "NO",
    },
  ];

  const ACTFormat = [
    {
      code: "Y",
      value: "YES",
    },
    {
      code: "N",
      value: "NO",
    },
  ];

 

  const onSubmits = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      
        bin: data.bin,
        binname: data.binname,
        dectable: data.dectable,
        pvk:data.pvk,
        servicecode: data.servicecode,
        bankcode: data.bankcode,
        hostip: data.hostip,
        hostport: data.hostport,
        bankcd: data.bankcd,
        acqid: data.acqid,
        issatmip:data.issatmip,
        issatmport: data.issatmport,
        issposip:data.issposip ,
        issposport: data.issposport,
        mobilebinyn: data.mobilebin.code,
        actFormat: data.actformat.code
    
      };
      console.log('payload',payload)
      const response = await postApiData(apiList.LOCAL_BIN_MASTER_CREATE, payload);
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
     
      <GoBackButton/>
       <Box
        className={classes.mainContainer}
        component={"form"}
        onSubmit={handleSubmit(onSubmits)}
      >
        
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>Bin Master Create</div>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={3}
                rowSpacing={2}
                style={{ paddingRight: "2vw" }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      BIN<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "bin",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "BIN",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "BIN " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      BIN NAME<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "binname",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "BIN NAME",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 50}
                        }}
                        regExp={/^[a-zA-Z0-9 ]*$/}
                        rules={{
                          required:
                            "BIN NAME" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      DECTABLE<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "dectable",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "DECTABLE",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength:16}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "DECTABLE" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                    Pin Verification Key<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "pvk",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "PVK",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 16}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "PVK" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

            

          

            

             

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                     SERVICE CODE<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "servicecode",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "SERVICE CODE",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Service Code" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      BANK CODE<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "bankcode",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "BANK CODE",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[a-zA-Z0-9]+$/}
                        rules={{
                          required:
                            "Bank Code" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      HOST IP<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "hostip",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "HOST IP",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 16}
                        }}
                        regExp={/^[0-9.]+$/}
                        rules={{
                          required:
                            "Host IP" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      HOST PORT<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "hostport",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "HOST PORT",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength:4}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Host Port" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      BANK CD<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "bankcd",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "BANK CD",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 6}
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        rules={{
                          required:
                            "Bank CD" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ACQ ID<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "acqid",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "ACQ ID",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 8}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Acq ID" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

             

             

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ISSATMIP<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "issatmip",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "ISSATMIP",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 16}

                        }}
                        regExp={/^[0-9.]+$/}
                        rules={{
                          required:
                            "ISSATMIP" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ISSATMPORT<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "issatmport",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "ISSATMPORT",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 4}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "ISSATMPORT" +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ISSPOSIP<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "issposip",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "ISSPOSIP",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 16}
                        }}
                        regExp={/^[0-9.]+$/}
                        rules={{
                          required:
                            "ISSPOSIP" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ISSPOSPORT<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "issposport",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "ISSPOSPORT",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 4}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "ISSPOSPORT" + errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
        

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      MOBILE BIN<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "mobilebin",
                        }}
                        TextFieldProps={{
                          placeholder: "Select",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[a-zA-Z \s]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "Mobile BIN " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={MobileBIN}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ACT FORMAT<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "actformat",
                        }}
                        TextFieldProps={{
                          placeholder: "Select",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[a-zA-Z \s]*$/;
                            const isBackspace = event.keyCode === 8;
                            const isValidInput = regex.test(event.key);

                            if (!isValidInput && !isBackspace) {
                              event.preventDefault();
                            }
                          },
                        }}
                        rules={{
                          required:
                            "ACT Format " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={ACTFormat}
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

export default LocalBinMasterCreate;
