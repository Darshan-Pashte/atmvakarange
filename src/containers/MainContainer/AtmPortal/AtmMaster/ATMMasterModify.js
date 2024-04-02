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
  atmstatus:""
};

const ATMMasterModify = () => {
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

const { state } = useLocation();
console.log("state", state);


  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  useEffect(() => {
    setValue("atmid",state?.atmId);
    setValue("terminaltype", compareTextAndReturnObject(TerminalType,state?.terminaltype));
    setValue("bankcode", state?.bankcd);
    setValue("downloadfilename", state?.downloadfilename);
    setValue("Acquiredid",state?.acqid);
    setValue("depbin", state?.depbin);
    setValue("supplycounterreq", state?.supplyCounterIsReq =='N' ? "NO"  :'YES');
    setValue("servicereq",state?.inserviceIsReq =='N' ? "NO"  :'YES');
    setValue("downisrequest",state?.downIsReq =='N' ? "NO"  :'YES');
    setValue("atmtype", compareTextAndReturnObject(ATMtype,state?.atmtype));
    setValue("resources", state?.resourcefn);


    setValue("atmmake", compareTextAndReturnObject(ATMmake,state?.atmmake));
    setValue("dipcard", state?.dipcard =='Y' ? "YES"  :'NO');
    setValue("address", state?.address);
    setValue("pincode", state?.pincode);
    setValue("serverip", state?.serverip);
    setValue("tmk", state?.tmk);
    setValue("tpklmk", state?.tpklmk);
    setValue("tpktmk", state?.tpktmk);
    setValue("flag", state?.flag =='Y' ? "YES"  :'NO');
    setValue("downloadDate", state?.nextdwnloaddt);



    setValue("luno", state?.luno);
    setValue("location", state?.location);
    setValue("machineip", state?.ip);




    setValue("typedemo1", compareTextAndReturnObject(typeDemo1,state?.typedenom1));
    setValue("typedemo2", compareTextAndReturnObject(typeDemo2,state?.typedenom2));
    setValue("typedemo3", compareTextAndReturnObject(typeDemo3,state?.typedenom3));
    setValue("typedemo4", compareTextAndReturnObject(typeDemo4,state?.typedenom4));

    setValue("maxnotes", state?.maxnotes);
    // setValue("atmstatus", state?.atmstatus == '1' ? "ONLINE" :state?.atmstatus == '2' ? "INSERVICE" : "OUT OF SERVICE");
    setValue("atmstatus", state?.atmstatus);
    setValue("transactioncount", state?.transactioncount);
    
    setValue("type4count", state?.type4count);
    setValue("type3count", state?.type3count);
    setValue("type2count", state?.type2count);
    setValue("type1count", state?.type1count);

}, [state]);



  const handleOpen = () => {
    setOpenPop(!openPop);
  };


  const filteredData =
    bankNamee &&
    bankNamee
      ?.filter((item) => item.hasOwnProperty("bankcode"))
      ?.map((item) => ({ code: item.bankcode, value: item.bankname }));

 

  const typeDemo1 = [
    {
      code: "50",
      value: "50",
    },
    {
      code: "100",
      value: "100",
    },
    {
      code: "500",
      value: "500",
    },
    {
      code: "2000",
      value: "2000",
    },
  ];
  const typeDemo2 = [
    {
      code: "50",
      value: "50",
    },
    {
      code: "100",
      value: "100",
    },
    {
      code: "500",
      value: "500",
    },
    {
      code: "2000",
      value: "2000",
    },
  ];
  const typeDemo3 = [
    {
      code: "50",
      value: "50",
    },
    {
      code: "100",
      value: "100",
    },
    {
      code: "500",
      value: "500",
    },
    {
      code: "2000",
      value: "2000",
    },
  ];
  const typeDemo4 = [
    {
      code: "50",
      value: "50",
    },
    {
      code: "100",
      value: "100",
    },
    {
      code: "500",
      value: "500",
    },
    {
      code: "2000",
      value: "2000",
    },
  ];

  const ATMtype = [
    {
      code: "NDC",
      value: "NDC",
    },
    {
      code: "D912",
      value: "D912",
    },
    {
      code: "30030",
      value: "30030",
    },
    {
      code: "LIPI",
      value: "LIPI",
    },
  ];

  const DIPCard = [
    {
      code: "Y",
      value: "YES",
    },
    {
      code: "N",
      value: "NO",
    },
  ];

  const Flag = [
    {
      code: "Y",
      value: "YES",
    },
    {
      code: "N",
      value: "NO",
    },
  ];

  const TerminalType = [
    {
      code: "CDM",
      value: "CDM",
    },
    {
      code: "BNA",
      value: "BNA",
    },
    {
      code: "6843",
      value: "6843",
    },
  ];
  const ATMmake = [
    {
      code: "DDC",
      value: "DDC",
    },
    {
      code: "NCR",
      value: "NCR",
    },

    {
      code: "LIPI",
      value: "LIPI",
    },
    {
      code: "6843",
      value: "6843",
    },
    {
      code: "NDC",
      value: "NDC",
    },
  ];

  const DownIsRequest = [
    {
      code: "Y",
      value: "YES",
    },
    {
      code: "N",
      value: "NO",
    },
  ];

  const InserviceIsRequest = [
    {
      code: "Y",
      value: "YES",
    },
    {
      code: "N",
      value: "NO",
    },
  ];
  const SupplyCounterRequest = [
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
        atmId: data.atmid,
        luno: data.luno,
        location: data.location,
        ip: data.machineip,
        typedenom1: data.typedemo1.code,
        typedenom2: data.typedemo2.code,
        typedenom3: data.typedemo3.code,
        typedenom4: data.typedemo4.code,
        type1count: data.type1count,
        type2count: data.type2count,
        type3count: data.type3count,
        type4count: data.type4count,
        maxnotes: data.maxnotes,
        atmstatus: data?.atmstatus == 'ONLINE' ? "1" :data?.atmstatus == 'INSERVICE' ? "2" : "0",
        transactioncount: data.transactioncount ? data.transactioncount :'',
        atmtype: data.atmtype.code,
        dipcard: data?.dipcard.code =='YES' ? "Y"  :'N',
        address: data.address,
        pincode: data.pincode,
        serverip: data.serverip,
        tmk: data.tmk,
        tpklmk: data.tpklmk ? data.tpklmk : '',
        tpktmk: data.tpktmk ? data.tpktmk : '',
        flag: data?.flag.code =='YES' ? "Y"  :'N',
        nextdwnloaddt: convertDate(data.downloadDate,9),
        terminaltype: data.terminaltype.code,
        // bankcd: data.bankcode,
        downloadfilename: data.downloadfilename,
        acqid: data.Acquiredid,
        resourcefn: data.resources,
        unsolstatus: "0",
        atmmake: data.atmmake.code,
        downIsReq:  data?.downisrequest.code =='YES' ? "Y"  :'N',
        inserviceIsReq:  data?.servicereq.code =='YES' ? "Y"  :'N',
        supplyCounterIsReq:  data?.supplycounterreq.code =='YES' ? "Y"  :'N',
        depbin: data.depbin ? data.depbin : '',
      };
      console.log('payload',payload)
      const response = await postApiData(apiList.ATM_MASTER_MODIFY, payload);
      if (response?.data?.status == true) {
      
        SweetAlertPopup(response?.data?.message, "Success", "success");
        // reset()
       navigate('/atmmaster')
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
     
      <GoBackButton/>
       <Box
        className={classes.mainContainer}
        component={"form"}
        onSubmit={handleSubmit(onSubmits)}
      >
        
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>ATM Modify</div>
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
                          inputProps : {maxLength: 4}
                        }}
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
                          inputProps : {maxLength: 10}
                        }}
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
                          inputProps : {maxLength: 15}
                        }}
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
                      Type1 Denom<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "typedemo1",
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
                            "Type1 Denom " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={typeDemo1}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Type2 Denom<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "typedemo2",
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
                            "Type2 Denom " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={typeDemo2}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Type3 Denom<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "typedemo3",
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
                            "Type3 Denom " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={typeDemo3}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Type4 Denom<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "typedemo4",
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
                            "Type4 Denom " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={typeDemo4}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Type1 Count<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "type1count",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Type1 Count",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 5}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Type1 Count" +
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
                      Type2 Count<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "type2count",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Type2 Count",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 5}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Type2 Count" +
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
                      Type3 Count<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "type3count",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Type3 Count",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 5}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Type3 Count" +
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
                      Type4 Count<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "type4count",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Type4 Count",
                          // style: { width: "33vw" },
                          fullWidth: true, 
                          inputProps : {maxLength: 5}

                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Type4 Count" +
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
                      MAX Notes<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "maxnotes",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Max Notes",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 5}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Max Notes" +
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
                      ATM Status
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "atmstatus",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: " ATM Status",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "ATM Status " +
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
                      Transaction Count
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "transactioncount",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Transaction Count",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 5}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Transaction Count" +
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
                      ATM TYPE<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmtype",
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
                            "ATM TYPE " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={ATMtype}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      DIP CARD
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "dipcard",
                          rows: 5,
                          maxRows: 10,
                          
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "DIP Card",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "DIP Card" +
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
                      Address<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "address",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Address",
                          // style: { width: "33vw" },
                          multiline:true,
                          rows:3,
                          fullWidth: true,
                          inputProps : {maxLength: 40}
                        }}
                        regExp={/^[a-zA-Z0-9. ]+$/}
                        // rules={{
                        //   required:
                        //     "Address" +
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
                      Pin Code<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "pincode",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Pincode",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minlLength:6,maxLength: 6}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Pin Code" +
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
                      Server IP
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "serverip",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Server IP",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 15}
                        }}
                        regExp={/^[0-9.]+$/}
                        // rules={{
                        //   required:
                        //     "Server Ip" +
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
                      TMK<sup className={classes.required}>*</sup>
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
                          inputProps : {maxLength: 50}
                        }}
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
                          inputProps : {maxLength: 50}
                        }}
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
                          inputProps : {maxLength: 50}
                        }}
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
                      Flag
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "flag",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Flag",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "Flag" +
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
                      Next Download Date
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                     <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "downloadDate",
                      }}
                      TextFieldProps={{
                        fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                        maxDate: new Date(),
                      }}
                      required={false}
                    />
                    </div>
                  </div>
                </Grid>


                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Terminal Type<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "terminaltype",
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
                            "Type " + errorMessages.error_autocomplete_message,
                        }}
                        data={TerminalType}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
{/* 
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Code<sup className={classes.required}>*</sup>
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
                          placeholder: "Bank Code",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 6}
                        }}
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Bank code" +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid> */}

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Download File Name
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "downloadfilename",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Download File Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength:50}
                        }}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "File Name" +
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
                      Acquired ID<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "Acquiredid",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Acquired ID",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 6}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Acquired ID" +
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
                      Resources<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "resources",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Resources",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 20}
                        }}
                        regExp={/^[a-zA-Z0-9_ ]+$/}
                        // rules={{
                        //   required:
                        //     "Resources" +
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
                      ATM MAKE
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmmake",
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
                        // rules={{
                        //   required:
                        //     "ATM MAKE " +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        data={ATMmake}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Down_is_Request
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "downisrequest",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Request",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "Request" +
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
                      Service_is_Req
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "servicereq",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Request",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "Request" +
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
                      Supply_Counter_req
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "supplycounterreq",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Request",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          disabled:true,
                        }}
                        backgroundColor={true}
                        regExp={/^.*$/}
                        // rules={{
                        //   required:
                        //     "Request" +
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
                      DEPBIN
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "depbin",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "DEPBIN",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 6}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "DEPBIN " +
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

export default ATMMasterModify;
