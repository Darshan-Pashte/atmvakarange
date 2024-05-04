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

const defaultFormData = {
  bankCode: "",
  name: "",
  brandName: "",
  address: "",
  mobileNo: "",
  directorName: "",
  vpaToCreate: "",
  panNo: "",
  emailId: "",
  mcc: "",
  websiteUrl: "",
  gstNo: "",
  cinNo: "",
};

const KeyMasterCreate = () => {
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
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const handleConfirmAadhaar = async () => {};

  // const handleConfirmAadhaar = async () => {
  //   try {
  //     setIsloading(true);
  //     let payload = { id_number: watch("aadhaarNo") };
  //     // const response = await postApiData(apiList.VALIDATEAADHAAR, payload);
  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);
  //     console.log("addhar", response)
  //     if (response?.respCode == "00") {
  //       setClientId(response?.data?.data?.client_id);
  //       handleOpen();
  //     } else {
  //       SweetAlertPopup("Enter Valid Aadhaar Number", "Error", "error");
  //       setIsloading(false);
  //     }
  //     setIsloading(false);
  //   } catch (err) {
  //     console.log(err)
  //     setIsloading(false)
  //   }
  // };

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
        requestCode: "createVpa",
        bankCode: data.bankCode.code,
        userId: username,
        sessionId: token,
        createVPARequest: {
          bankCode: data.bankCode.code,
          name: data.name,
          brandName: data.brandName,
          address: data.address,
          mobileNo: data.mobileNo,
          mccCode: data.mcc.code,
          mccDescription: data.mcc.value,
          directorName: data.directorName,
          vpaToCreate: data.vpaToCreate,
          panNo: data.panNo,
          emailId: data.emailId,
          websiteUrl: data?.websiteUrl,
          gstNo: data?.gstNo,
          cinNo: data?.cinNo,
          acctNo: data?.settlementAcc,
          ifscCode: data?.settlementIfsc,
          bankName: data?.settlmentBankName,
          aadharNo: data?.aadharNo,
        },
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      if (response.respCode === "00") {
        // Show a success message using SweetAlert
        SweetAlertPopup("VPA Created successfully!", "Success", "success");
        setIsloading(false);
        reset();
      } else if (response.respCode == "IS") {
        // authDispatch({ type: REMOVE_USER });
        setIsloading(false);

        navigate("/auth/login");
        SweetAlertPopup(response?.respMsg, "Error", "error");
      } else {
        setIsloading(false);
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    // color: "#FFFFFF",
    color: "#000000",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    backgroundColor: "#fff",
    border: "1px solid #000",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "50px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  console.log("isLoading", isLoading);

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    backgroundColor: "#323232",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "50px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  return (
    <>
      {/* {isLoading ||isBankLoading || isMidLoading ? <Loader loading={true} /> : <Loader loading={false} />} */}
      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>VPA Create</div>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={5}
                rowSpacing={5}
                style={{ paddingRight: "2vw" }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Name<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "bankCode",
                        }}
                        TextFieldProps={{
                          placeholder: "Select Bank Name",
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
                            "Bank Name " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={filteredData}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>

                {watch("bankCode") ? (
                  <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        PAN Number<sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.frow1aff}>
                        <Controller
                          name="panNo" // The name should match the key in 'data' object in onSubmit
                          control={control}
                          defaultValue="" // Set an initial value if needed
                          rules={{
                            required:
                              "PAN No " +
                              errorMessages.error_autocomplete_message,
                            pattern: {
                              value: /^([A-Za-z]{5})(\d{4})([A-Za-z]{1})$/,
                              message: "Please Enter valid format  of PAN",
                            },
                          }}
                          render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                              const regex = /^[a-zA-Z@#.&0-9]+$/;
                              const { name, value } = event.target;
                              const isValidInput =
                                regex.test(value) || value === "";

                              if (!isValidInput) {
                                event.preventDefault();
                                return;
                              }

                              field.onChange(value);
                            };

                            return (
                              <TextField
                                id="standard"
                                fullWidth="true"
                                placeholder="Please Enter PAN No"
                                type="text"
                                {...field}
                                sx={{
                                  "& fieldset": { border: "none" },
                                  ".MuiInputBase-root": {
                                    borderRadius: "10px",
                                    backgroundColor: "rgb(238, 239, 247)",
                                  },
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton onClick={handleVerifyPan}>
                                        <TaskAltIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{
                                  maxLength: 10,
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={handleInputChange}
                                // error={field.error} // Pass the error state here
                                // helperText={passwordError ? "Password does not meet requirements" : ""}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>Addhar Number</div>
                    <div className={classes.frow1aff}>
                      <Controller
                        name="aadharNo" // The name should match the key in 'data' object in onSubmit
                        control={control}
                        defaultValue="" // Set an initial value if needed
                        rules={{
                          required: false,
                          pattern: {
                            value: /\d{12}/,
                            message: "Please Enter valid format of Aadhar",
                          },
                        }}
                        render={({ field, fieldState }) => {
                          const handleInputChange = (event) => {
                            const regex = /^[0-9]+$/;
                            const { name, value } = event.target;
                            const isValidInput =
                              regex.test(value) || value === "";

                            if (!isValidInput) {
                              event.preventDefault();
                              return;
                            }

                            field.onChange(value);
                          };

                          return (
                            <TextField
                              id="standard"
                              fullWidth="true"
                              placeholder="Please Enter Aadhar No"
                              type="text"
                              {...field}
                              sx={{
                                "& fieldset": { border: "none" },
                                ".MuiInputBase-root": {
                                  borderRadius: "10px",
                                  backgroundColor: "rgb(238, 239, 247)",
                                },
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={handleConfirmAadhaar}>
                                      <TaskAltIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              inputProps={{
                                minLength: 12,
                                maxLength: 12,
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              onChange={handleInputChange}
                              // error={field.error} // Pass the error state here
                              // helperText={passwordError ? "Password does not meet requirements" : ""}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Customer Name<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Enter Customer Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]*$/}
                        rules={{
                          required:
                            "Customer Name " +
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
                      Display Name<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "brandName",
                          placeholder: "Please Brand Name",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Designation",
                          placeholder: "Enter Display Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9 ]*$/}
                        rules={{
                          required:
                            "Brand Name " +
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
                      Mobile No<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "mobileNo",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "Enter Mobile Number ",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps: {
                            maxLength: 10,
                            minLength: 0,
                          },
                        }}
                        regExp={/^[0-9]*$/}
                        rules={{
                          pattern: {
                            value: /^\d{10}$/,
                            message:
                              "Please Enter valid format  of Mobile Number",
                            // value: /^[0-9]{0,16}(\.[0-9]{1,2})?$/,
                            // message: "Please Enter only two Digits After numeric",
                          },
                          required:
                            "Mobile No " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>{" "}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Director Name<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "directorName",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "Enter Director Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z ]*$/}
                        rules={{
                          required:
                            "Director Name " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>{" "}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Vpa To Create<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "vpaToCreate",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "Enter Vpa To Create",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps: {
                            maxLength: 14,
                            minLength: 0,
                          },
                        }}
                        regExp={/^[a-zA-Z0-9 ]*$/}
                        rules={{
                          required:
                            "Vpa To Create " +
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
                      Email Id<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                    <TextFieldForm
    controlerProps={{
        control: control,
        name: "ipAddress",
        rows: 5,
        maxRows: 10,
    }}
    TextFieldProps={{
        placeholder: "Enter IP Address",
        fullWidth: true,
    }}
    regExp={/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}
    rules={{
        pattern: {
            value: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            message: "Please Enter a valid IP Address",
        },
        required: "IP Address is required",
    }}
    required={true}
/>

                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Merchant Category<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "mcc",
                        }}
                        TextFieldProps={{
                          placeholder: "Select Merchant Category",
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
                            "MCC " + errorMessages.error_autocomplete_message,
                        }}
                        data={upiList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Address<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "address",
                          placeholder: "Enter Address",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Mobile Number",
                          placeholder: "Enter Address",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^.*$/}
                        rules={{
                          required:
                            "Address " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={5}
                rowSpacing={5}
                style={{ paddingRight: "2vw" }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Settlement Bank Name
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "settlementBankName",
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "Enter Bank Name",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9\s]*$/}
                        rules={{
                          // pattern: {
                          //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          //   message: "Please Enter valid format  of Email",
                          //   // value: /^[0-9]{0,16}(\.[0-9]{1,2})?$/,
                          //   // message: "Please Enter only two Digits After numeric",
                          // },
                          required:
                            "Bank Name " +
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
                      Settlement IFSC<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "settlementIfsc",
                        }}
                        TextFieldProps={{
                          // label: "Email ID",
                          placeholder: "Enter Settlement IFSC code",
                          // style: { width: "33vw" },
                          fullWidth: true,
                        }}
                        regExp={/^[a-zA-Z0-9\s]*$/}
                        rules={{
                          // pattern: {
                          //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          //   message: "Please Enter valid format  of Email",
                          //   // value: /^[0-9]{0,16}(\.[0-9]{1,2})?$/,
                          //   // message: "Please Enter only two Digits After numeric",
                          // },
                          required:
                            "IFSC Code " +
                            errorMessages.error_autocomplete_message,
                        }}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                {watch("settlementIfsc") ? (
                  <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Settlement Account
                        <sup className={classes.required}>*</sup>
                      </div>
                      <div className={classes.frow1aff}>
                        <Controller
                          name="settlementAcc" // The name should match the key in 'data' object in onSubmit
                          control={control}
                          defaultValue="" // Set an initial value if needed
                          rules={{
                            required:
                              "Account No " +
                              errorMessages.error_autocomplete_message,
                            // pattern: {
                            //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // Use the custom regular expression here
                            //   // message: "Password does not meet requirements",
                            // },
                          }}
                          render={({ field, fieldState }) => {
                            const handleInputChange = (event) => {
                              const regex = /^[a-zA-Z@#.&0-9]+$/;
                              const { name, value } = event.target;
                              const isValidInput =
                                regex.test(value) || value === "";

                              if (!isValidInput) {
                                event.preventDefault();
                                return;
                              }

                              field.onChange(value);
                            };

                            return (
                              <TextField
                                id="standard-adornment-password"
                                fullWidth="true"
                                placeholder="Please Enter Password"
                                type="text"
                                {...field}
                                sx={{
                                  "& fieldset": { border: "none" },
                                  ".MuiInputBase-root": {
                                    borderRadius: "10px",
                                    backgroundColor: "rgb(238, 239, 247)",
                                  },
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={handleValidateAccount}
                                      >
                                        <TaskAltIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={handleInputChange}
                                // error={field.error} // Pass the error state here
                                // helperText={passwordError ? "Password does not meet requirements" : ""}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Grid>
                ) : null}

                {watch("settlementAcc") ? (
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.frowdataaff}>
                      <div className={classes.frowtextaff}>
                        Cusomer Name As per Account
                      </div>
                      <div className={classes.frow1aff}>
                        <TextFieldForm
                          controlerProps={{
                            control: control,
                            name: "nameAsPerBank",
                          }}
                          TextFieldProps={{
                            // label: "Name",
                            placeholder: "Name As per Account Number",
                            // style: { width: "33vw" },
                            fullWidth: true,
                            disabled: true,
                          }}
                          regExp={/^[a-zA-Z0-9 ]*$/}
                          // rules={{
                          //   required:
                          //     "Customer Name " + errorMessages.error_autocomplete_message,
                          // }}
                          required={false}
                        />
                      </div>
                    </div>
                  </Grid>
                ) : null}
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

export default KeyMasterCreate;
