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

const defaultFormData = {
  bankcode: "",
  acquiredid: "",
  fullname: "",
  spoc1name: "",
  spoc1mobno: "",
  spoc2name: "",
  spoc2mobno: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  smsid: "",
};

const BankMasterCreate = () => {
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

  console.log("user", user);

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  useEffect(() => {
    vpaCreate1();
  }, [token, username]);

  useEffect(() => {
    vpaCreate();
  }, [token, username]);

  const handleOpen = () => {
    setOpenPop(!openPop);
  };

  const vpaCreate1 = async () => {
    setIsBankloading(true);
    try {
      const payload = {
        requestCode: "getBankList",
        userId: username,
        sessionId: token,
        bankCode: "ALL",
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      if (response.respCode == "IS") {
        // authDispatch({ type: REMOVE_USER });
        navigate("/auth/login");
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
      setbankNamee(response?.bankList);
      setIsBankloading(false);
    } catch (err) {
      console.log(err);
      setIsBankloading(false);
    }
  };

  const filteredData =
    bankNamee &&
    bankNamee
      ?.filter((item) => item.hasOwnProperty("bankcode"))
      ?.map((item) => ({ code: item.bankcode, value: item.bankname }));

  const vpaCreate = async () => {
    setIsMidloading(true);
    try {
      const payload = {
        requestCode: "getMccList",
        userId: username,
        sessionId: token,
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      if (response.respCode == "IS") {
        // authDispatch({ type: REMOVE_USER });
        navigate("/auth/login");
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
      setUpiList(response?.data);
      setIsMidloading(false);
    } catch (err) {
      console.log(err);
      setIsMidloading(false);
    }
  };

  const handleVerifyPan = async () => {
    try {
      if (!/^([A-Za-z]{5})(\d{4})([A-Za-z]{1})$/.test(watch("panNo"))) {
        return SweetAlertPopup(
          "Please Enter Valid PAN Number",
          "Error",
          "error"
        );
      }
      setIsloading(true);
      let payload = {
        requestCode: "panValidate",
        userId: username,
        sessionId: token,
        createVPARequest: {
          bankCode: watch("bankCode")?.code,
          panNo: watch("panNo"),
        },
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);

      console.log("response", response);

      if (response?.respCode === "01") {
        SweetAlertPopup("Incorrect PAN Details !", "Error", "error");
        // popupAlert(response?.data?.message, "Error", "error");
        setIsloading(false);
      } else {
        SweetAlertPopup("Verified !", "success", "success");
        // setName(watch("pancardNo"));
        // setPanData(response?.data?.data?.data?.data?.full_name)
        setValue("name", response?.data?.data?.data?.data?.full_name);
        // setValue("firstName", response?.data?.data?.data?.data?.full_name_split[0]);
        // setValue("fatherName", response?.data?.data?.data?.data?.full_name_split[1]);
        // setValue("lastName", response?.data?.data?.data?.data?.full_name_split[2]);
        setValue("mobileNo", response?.data?.data?.data?.data?.phone_number);
        // setValue("address1", response?.data?.data?.data?.data?.address?.line_1);
        // setValue("address2", response?.data?.data?.data?.data?.address?.line_2);
        // setValue("address3", response?.data?.data?.data?.data?.address?.street_name);
        setValue("emailId", response?.data?.data?.data?.data?.email);
        // setValue("dob", convertDate(response?.data?.data?.data?.data?.dob, 4));
        // setValue("pincode", response?.data?.data?.data?.data?.address?.zip);
        // setValue("state", compareTextAndReturnObject(lookupData?.data?.lookup, response?.data?.data?.data?.data?.address?.state));
        // setValue("city", compareTextAndReturnObject(cityData?.data?.lookup, response?.data?.data?.data?.data?.address?.city));
        // setValue("sex", compareIdAndReturnObject(Sex, response?.data?.data?.data?.data?.gender));
        // setName(response?.data?.full_name);
        setIsloading(false);
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const handleValidateAccount = async () => {
    try {
      setIsloading(true);
      let payload = {
        requestCode: "bankAcctValidate",
        userId: username,
        sessionId: token,
        createVPARequest: {
          bankCode: watch("bankCode")?.code,
          acctNo: watch("settlementAcc"),
          ifscCode: watch("settlementIfsc"),
        },
      };
      // const response = await postApiData(apiList.VALIDATEAADHAAR, payload);
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      console.log("addhar", response);
      if (response?.respCode == "00") {
        SweetAlertPopup("Verified Account Number !", "Success", "success");
        setValue("nameAsPerBank", response?.data?.data?.full_name);
        setIsloading(false);
      } else {
        SweetAlertPopup("Enter Valid Account Details", "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        bankcd: data.bankcode,
        acqid: data.acquiredid,
        bankerFullName: data.fullname,
        add1: data.address1,
        add2: data.address2,
        pinCode: data.pincode,
        state: data.state,
        city: data.city,
        spoc1Name: data.spoc1name,
        spoc1MobileNo: data.spoc1mobno,
        spoc2Name: data.spoc2name,
        spoc2MobileNo: data.spoc2mobno,
        smsId: data.smsid.code,
      };
      const response = await postApiData(apiList.BANK_MASTER_CREATE, payload);
      if (response?.status == true) {
        SweetAlertPopup(response.message, "Success", "success");

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

  console.log("isLoading", isLoading);

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
      {isLoading || isBankLoading || isMidLoading ? (
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
          <div className={classes.bluerow}>Bank Registration</div>
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
                        regExp={/^[a-zA-Z0-9]*$/}
                        rules={{
                          required:
                            "Bank Code " +
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
                          inputProps : {maxLength: 6}
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
                      Bank Full Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "fullname",
                          placeholder: "Bank Full Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Bank Full Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        rules={{
                          required:
                            "Bank Full Name " +
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
                      Spoc2 Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "spoc2name",
                          placeholder: " Spoc2 Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Spoc2 Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        rules={{
                          required:
                            "Spoc2 Name " +
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
                      Spoc2 MobileNo<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "spoc2mobno",
                          placeholder: " Spoc2 MobileNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: " Spoc2 MobileNo",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {minLength:10,maxLength: 10}
                        }}
                        regExp={/^[0-9]+$/}
                        rules={{
                          required:
                            "Spoc2 MobileNo " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}></Grid>
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
                          inputProps : {maxLength:40}
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
                          inputProps : {maxLength: 6}
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
                      SMS ID<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "smsid",
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
                        data={SMSIDList}
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

export default BankMasterCreate;
