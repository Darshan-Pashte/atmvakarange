import classes from '../CorporateFundTransfer/CorporateFundTransfer.module.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import ServerInstance, { apiList } from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from '../../../../components/common/autuCompleteForm';
import SweetAlertPopup from '../../../../components/common/sweetAlertPopup';
import Loader from '../../../../components/common/loader';
import { compareTextAndReturnObject } from '../../../../components/common/commonArray';

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const AccountStatementHome = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user, 'user')
  console.log("accList", accList)

  const accountList = user?.accountDetails && user?.accountDetails?.map(item => ({ "code": item.brCode, "value": item.accNo }));
  // const accountList = accList && accList?.map(item => ({ "code": item.accNo, "value": item.accNo }));

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

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (accountList) {
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : '')
    }
  }, []);


  useEffect(() => {
    setValue("fromDate", new Date())
    setValue("toDate", new Date())
  }, []);


  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate("/announcement/announcementBrowseList", { state: data });
  };

  // const { state: user } = useContext(AuthContext);
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );

  // useEffect(()=>{
  //   setValue("fromDate", new Date())
  //   setValue("toDate", new Date())
  // },[])

  const payFromAccount = [
    {
      code: "01",
      value: "PDF "
    },
    {
      code: "02",
      value: "CSV "
    },

  ]

  const accountHomebank = [
    {
      code: "01",
      value: "0000487123256871486 - Rakesh Tr  "
    },
    {
      code: "02",
      value: "0000487123256871486 - Mahesh Tr  "
    },
    {
      code: "03",
      value: "0000487123256871486 - Ramesh Tr  "
    },

  ]

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        fromDate: convertDate(data.fromDate, 9),
        toDate: convertDate(data.toDate, 9),
        // fromDate: "20220101",
        // toDate: "20231122",
        brCode: data.accountNumber.code
      };

      const response = await postApiData(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success")
        reset()
      } else {
        SweetAlertPopup(response.message, "Error", "error")

      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);

    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "20px",
    paddingBottom: "20px",
    // width: "500px",
    height: "50px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "var(--button-color)",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "173px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));


  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      {/* <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className={classes.Sbox}>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: '0.1vw' }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.widthtfield}>
                    <div className={classes.frowtext}>Account Number<sup className={classes.required}>*</sup></div>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "accountNumber",
                      }}
                      TextFieldProps={{
                        // style: { width: "28vw" },

                        placeholder: "Select Account Number",
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
                          "Account Number " + errorMessages.error_autocomplete_message,
                      }}
                      // data={accountHomebank}
                      data={accountList}
                      required={true}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>From Date<sup className={classes.required}>*</sup></div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "fromDate",
                      }}
                      TextFieldProps={{
                        //   fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,

                      }}
                      required={false}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>To Date<sup className={classes.required}>*</sup></div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={{
                        //   fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                        minDate: watch("fromDate")
                      }}
                      required={false}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12}></Grid>
                <Grid item xs={12} sm={12} md={12}></Grid>
                <Grid item xs={12} sm={12} md={7}></Grid>

                <Grid item xs={12} sm={7} md={5}>
                  <div className={classes.payment1mobileprepaidbutton} style={{ display: 'flex', justifyContent: 'center' }} >

                    <ColorButton1 variant="contained" type="submit">
                      Download
                    </ColorButton1>
                  </div>
                </Grid>
              </Grid>

            </div>
          </div>

        </div>
      </Box> */}
      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className={classes.Sbox}>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                style={{ padding: '0.1vw' }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <div className={classes.widthtfield}>
                    <div className={classes.frowtext}>Account Number<sup className={classes.required}>*</sup></div>
                    <AutocompleteForm
                      controlerProps={{
                        control: control,
                        name: "accountNumber",
                      }}
                      TextFieldProps={{
                        // style: { width: "28vw" },

                        placeholder: "Select Account Number",
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
                          "Account Number " + errorMessages.error_autocomplete_message,
                      }}
                      // data={accountHomebank}
                      data={accountList}
                      required={true}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>From Date<sup className={classes.required}>*</sup></div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "fromDate",
                      }}
                      TextFieldProps={{
                        //   fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                        maxDate:new Date()

                      }}
                      required={false}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <div className={classes.frowdata11}>
                    <div className={classes.frowtext}>To Date<sup className={classes.required}>*</sup></div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={{
                        //   fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                        minDate: watch("fromDate"),
                        maxDate:new Date()
                      }}
                      required={false}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12}></Grid>

                <Grid item xs={12} sm={12} md={12}></Grid>
                <Grid item xs={12} sm={12} md={12}></Grid>
                {/* <Grid item xs={12} sm={12} md={12}></Grid> */}
             


                <Grid item xs={12} sm={1} md={6}></Grid>

                <Grid item xs={12} sm={11} md={6}>
                  <div className={classes.payment1mobileprepaidbutton} >
                    <ColorButton2 variant="contained" type="submit">
                      Send via E-mail
                    </ColorButton2>
                  </div>
                </Grid>

              </Grid>

            </div>
          </div>

        </div>
      </Box>


    </>
  )
}

export default AccountStatementHome
