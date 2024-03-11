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
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";

const defaultFormData = {
  bankcode: "",
  atmid: "",
  atmname: "",
  itmobileno: "",
  csdnmobileno: "",
  brmobileno: "",
};

const BankAtmSMSMasterCreate = () => {
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
  const [atmID, setAtmID] = useState([]);
  const [atmName, setAtmName] = useState([]);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log("user", user);
  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  const handleOpen = () => {
    setOpenPop(!openPop);
  };

  
  const BankcodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));
  BankcodeList && BankcodeList?.unshift({ "code": "all", "value": "ALL" });

  const AtmIDList=atmID && atmID?.map((item)=>({"code":item.atmId,'value':item.atmId}));

  AtmIDList && AtmIDList?.unshift({ "code": "all", "value": "ALL" });


  const AtmNameList =
  atmName && atmName?.map((item) => ({ code: item.location, value: item.location }));
  AtmNameList && AtmNameList?.unshift({ "code": "all", "value": "ALL" });
  // const BankCodeList = [
  //   {
  //     code: "all",
  //     value: "ALL",
  //   },
  //   ...BankcodeList,
  // ];

  // const ATMIDList = [
  //   {
  //     code: "all",
  //     value: "ALL",
  //   },
  //   ...AtmIDList,
  // ];
  // const ATMNameList = [
  //   {
  //     code: "all",
  //     value: "ALL",
  //   },
  //   ...AtmNameList,
  // ];

  // useEffect(() => {
  //   if (BankCodeList) {
  //     setValue(
  //       "bankcode",
  //       BankCodeList
  //         ? compareTextAndReturnObject(BankCodeList, BankCodeList[0]?.value)
  //         : ""
  //     );
  //   }
  // }, [BankCodeList]);

  // useEffect(() => {
  //   if (ATMIDList) {
  //     setValue(
  //       "atmid",
  //       ATMIDList
  //         ? compareTextAndReturnObject(ATMIDList, ATMIDList[0]?.value)
  //         : ""
  //     );
  //   }
  // }, [ATMIDList]);


  // useEffect(() => {
  //   if (ATMNameList) {
  //     setValue(
  //       "atmname",
  //       ATMNameList
  //         ? compareTextAndReturnObject(ATMNameList, ATMNameList[0]?.value)
  //         : ""
  //     );
  //   }
  // }, [ATMNameList]);

  useEffect(() => {
    getBankCode();
    // getATMid();
    getATMName();
  }, []);

  useEffect(()=>{
    if (watch('bankcode')) {
      getATMid()
        }
    
  },[watch('bankcode')])

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
  const getATMid = async () => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        bankcd:watch('bankcode')?.code
      };
      const response = await postApiData(apiList.GET_ATMID, payload);
      setAtmID(response?.atmMasterModels);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getATMName = async () => {
    setIsloading(true)
    try {
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.GET_ATMNAME, payload);
      console.log("respone", response);
      setAtmName(response.atmMasterLst);
      setIsloading(false)
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmits = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        bankcd: data.bankcode.code,
        atmId: data.atmid.code,
        atmname: data.atmname.code,
        itmanager:data.itmobileno,
        brmanager: data.brmobileno,
        custodian: data.csdnmobileno
      };
      console.log("payload", payload);
      const response = await postApiData(apiList.BANK_ATM_SMS_MASTER_CREATE, payload);
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

      <GoBackButton />
      <Box
        className={classes.mainContainer}
        component={"form"}
        onSubmit={handleSubmit(onSubmits)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>Bank ATM SMS Create</div>
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
                            "Bank Code " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={BankcodeList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ATM ID<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmid",
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
                            "ATM ID " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={AtmIDList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ATM Name<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmname",
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
                        data={AtmNameList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      IT Manager Mobile No.
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "itmobileno",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "IT Manager Mobile No.",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Mobile No. " +
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
                      Branch Manager Mobile No.
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "brmobileno",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Branch Manager Mobile No.",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Mobile No. " +
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
                      Custodian Mobile No.
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "csdnmobileno",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Custodian Mobile No.",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Mobile No. " +
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

export default BankAtmSMSMasterCreate;
