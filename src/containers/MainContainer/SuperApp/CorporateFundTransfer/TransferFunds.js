import classes from "../CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import ServerInstance, {
  apiList,
} from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import Loader from "../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import RadioGroupForm from "../../../../components/common/RedioButtonForm";
// import FinancialOverview from "../CorporateHome/FinancialOverview";
import FinancialOverview from "../../corporatePages/home/FinancialOverview/FinancialOverview";
import GoBackButton from "../../../../components/common/GoBackButton";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import MUIDataTable from "mui-datatables";
import { LoadingButton } from "@mui/lab";


const defaultFormData = {
  transferType: "internal",
  accountNumber: "",
  beneAccNo: "",
  transferMethod: "",
  amount: "",
  ifsc: "",
  remark: "",
  benAccount: "",
  benIFSC: ""
};

const TransferFunds = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [beneficiaryList, setBeneficiaryList] = useState([])
  const [accountBalance, setAccountBalance] = useState({})
  const [responseData, setResponseData] = useState({})

  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false
  };

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));

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
      setValue("accountNumber", accountList ? compareTextAndReturnObject(accountList, accountList[0]?.value) : "");
    }
  }, []);

  useEffect(() => {
    setValue("fromDate", new Date());
    setValue("toDate", new Date());
  }, []);

  const navigate = useNavigate();

  console.log("Transfer Type",watch("transferType"));

  useEffect(() => {
    Bene();
    getTransactionListView()
  }, []);


  useEffect(() => {
    if (watch("accountNumber")) {
      fetchBalance();
    }
  }, [watch("accountNumber")]);


  const Bene = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        accNo:watch("accountNumber")?.value
      };
      const response = await postApiData(apiList.CORPORATE_BENEFICIARYBROWSE, payload);
      console.log("responseBene", response);
      if (response?.status == true) {
        setBeneficiaryList(response?.data.beneficiary);
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
      }
    } catch (err) {
      console.log(err)
      setIsloading(false)
    }
  };

  const fetchBalance = async (data) => {
    try {
      setIsloading(true);
      const payload = {
        username: user?.userId,
        accNo: watch("accountNumber").value,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.CORPORATE_FETCH_BALANCE, payload);
      if (response?.status == true) {
        setAccountBalance(response?.data);
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err)
      setIsloading(false)
    }
  };


  // const beneficiaryListUpdate =
  //   beneficiaryList &&
  //   beneficiaryList?.map((item) => ({
  //     code: item.accNo,
  //     value: item.nickname,
  //   }));

  const externalList = (beneficiaryList || []).filter((item) => item.beneType == "E").map((ele) => ({ code: ele.accNo, value: ele.nickname, }))
  externalList.push({ code: "other", value: "Other" })

  const internalList = (beneficiaryList || []).filter((item) => item.beneType == "I").map((ele) => ({ code: ele.accNo, value: ele.nickname, }));

  const handleNavigate = () => {
    navigate("/beneficiarymanagements/addexternal");
  };

  const getTransactionListView = async () => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        fromDt: convertDate(new Date(), 1),
        toDt: convertDate(new Date(), 1),
        status: "M",
        transtype: "all",
      };

      const response = await postApiData(
        apiList.CORPORATE_TRANSACTION_VIEW + `?pageNo=${1}&pageSize=${10}`,
        payload
      );

      console.log("viewResponse", response)

      if (response.status == true) {
        setResponseData(response.data)
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

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        transferType: data.transferType,
        transferMethod: watch("transferType") == "other" ? data.transferMethod : "INTERNAL",
        amount: data.amount,
        remark: data.remark,
        beneName : data.beneName,
        beneNickname: data.beneAccNo.value,
        beneAccNo: data.benAccount,
        beneIfsc: data.benIFSC
      };

      const response = await postApiData(
        apiList.CORPORATE_FUND_TRANFER,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status == true) {
        SweetAlertPopup(response.message, "Success", "success");
        setIsloading(false);
        reset();
        getTransactionListView();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#707070",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#FFF",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const columns = [
    {
      name: 'srNo',
      label: 'Sr. No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'rrnNo',
      label: 'RRN No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'cbsreceivedDate',
      label: 'CBS Received Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'cbsSendDate',
      label: 'CBS Send Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },

    {
      name: 'cbsRrn',
      label: 'CBS RRN',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'responsedesc',
      label: 'Desc',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'transactiontype',
      label: 'Transaction Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'amount',
      label: 'Amout',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'beneifsc',
      label: 'Beneficiary IFSC',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'beneAccNo',
      label: 'Benebeficiary Account',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'remmitterbrCode',
      label: 'Remmitter Code',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmittermob',
      label: 'Remmitter Mo No.',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmitterAccNo',
      label: 'Remmitter Acc No',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transdate',
      label: 'Transaction Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'remarks',
      label: 'Remarks',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'activitystatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },

  ];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <Grid container>

        <Grid item xs={12} sm={12} md={2}>
          <div className={classes.paymentMainHeading}>Payments</div>
        </Grid>
        <Grid item xs={12} sm={12} md={8}></Grid>
        <Grid item xs={12} sm={12} md={2}>
          <ColorButton1 variant="contained" type="button" onClick={handleNavigate}>
            Add Beneficiary
          </ColorButton1>
        </Grid>
      </Grid>
      <div className={classes.gridtitle}>Fund Transfer</div>
      <div className={classes.cardsBox}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "1vw" }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Transfer Type
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <RadioGroupForm
                      controlerProps={{
                        control: control,
                        name: "transferType",
                      }}
                      data={[
                        // {
                        //   label: "Own Account",
                        //   value: "Own Account",
                        // },
                        {
                          label: "Internal",
                          value: "internal",
                        },
                        {
                          label: "Other Bank",
                          value: "other",
                        },
                      ]}
                      errorMessage={
                        "Tranfer Type" + errorMessages.error_autocomplete_message
                      }
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    From Account<sup className={classes.required}>*</sup>
                  </div>
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
                        "Account Number " +
                        errorMessages.error_autocomplete_message,
                    }}
                    // data={accountHomebank}
                    data={accountList}
                    required={true}
                  />
                  <div className={classes.availablebalance}>Available Balance: <span className={classes.balace}>₹ {accountBalance?.accBal}</span></div>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    To Account<sup className={classes.required}>*</sup>
                  </div>
                  <AutocompleteForm
                    controlerProps={{
                      control: control,
                      name: "beneAccNo",
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
                        "Account Number " +
                        errorMessages.error_autocomplete_message,
                    }}
                    // data={accountHomebank}
                    data={watch("transferType") == "internal" ? internalList : externalList}
                    required={true}
                  />
                </div>
              </Grid>

              {
                watch("beneAccNo")?.value == "Other" ? (
                  <>
                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Beneficiary Account No.
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <TextFieldForm
                            controlerProps={{
                              control: control,
                              name: "benAccount",
                              rows: 5,
                              maxRows: 10,
                            }}
                            TextFieldProps={{
                              // label: "Name",
                              placeholder: "Enter Account No",
                              // style: { width: "33vw" },
                              fullWidth: true,
                            }}
                            regExp={/^[a-zA-Z0-9]+$/}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Beneficiary IFSC No.
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <TextFieldForm
                            controlerProps={{
                              control: control,
                              name: "benIFSC",
                              rows: 5,
                              maxRows: 10,
                            }}
                            TextFieldProps={{
                              // label: "Name",
                              placeholder: "Enter IFSC",
                              // style: { width: "33vw" },
                              fullWidth: true,
                            }}
                            regExp={/^[a-zA-Z0-9]+$/}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <div className={classes.frowdataaff}>
                        <div className={classes.frowtextaff}>
                          Beneficiary Name
                          <sup className={classes.required}>*</sup>
                        </div>
                        <div className={classes.widthtfield}>
                          <TextFieldForm
                            controlerProps={{
                              control: control,
                              name: "beneName",
                              rows: 5,
                              maxRows: 10,
                            }}
                            TextFieldProps={{
                              // label: "Name",
                              placeholder: "Enter Benficiary Name",
                              // style: { width: "33vw" },
                              fullWidth: true,
                            }}
                            regExp={/^[a-zA-Z0-9]+$/}
                            required={true}
                          />
                        </div>
                      </div>
                    </Grid>
                  </>
                ) : null
              }

              { watch("transferType") == "other" ? <Grid item xs={12} sm={12} md={12}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Transfer Method
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <RadioGroupForm
                      controlerProps={{
                        control: control,
                        name: "transferMethod",
                      }}
                      data={[
                        {
                          label: "IMPS",
                          value: "IMPS",
                        },
                        {
                          label: "NEFT",
                          value: "NEFT",
                        },
                        {
                          label: "RTGS",
                          value: "RTGS",
                        },
                      ]}
                    // errorMessage={
                    //   errorMessages.error_type_message + "Delivery day"
                    // }
                    // r
                    />
                  </div>
                </div>
              </Grid> : null}
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Amount
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "amount",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        placeholder: "₹ 0.00",
                        // style: { width: "33vw" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              {/* 
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    IFSC
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "ifsc",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        placeholder: "Enter IFSC Code",
                        // style: { width: "33vw" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      required={true}
                    />
                  </div>
                </div>
              </Grid> */}
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Remarks
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "remark",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        placeholder: "Remark",
                        // style: { width: "33vw" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z0-9]+$/}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}></Grid>
              <Grid item xs={12} sm={12} md={6}></Grid>
              {/* <Grid item xs={12} sm={12} md={3}>
                <ColorButton2 variant="contained" type="button" onClick={()=>reset()}>
                  Reset
                </ColorButton2>
              </Grid> */}
              <Grid item xs={12} sm={12} md={3}>
              <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                  sx={{
                    color: "#FFFFFF",
                    // color:'var(--button-color)',
                    // backgroundColor: "#F84B67",
                    // backgroundColor: "#323232",
                    backgroundColor: "var(--button-color)",
                    border: "1px solid #CCC",
                    borderRadius: "8px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    width: "115px",
                    height: "32px",
                    "&:hover": {
                      // background: "#808080",
                      background: "var(--button-hover-color)",
                      color: "white",
                    },
                  }}
                >
                  Submit
                </LoadingButton>
              </Grid>


              <Grid item xs={12} sm={12} md={9}></Grid>

              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.addNewSinglePaymentBG}>
                  <div className={classes.addNewSinglePaymentButton}>
                    ⨁ Add Other Single Payment
                  </div>

                </div>
              </Grid>


              <Grid container>
                <Grid
                  sx={{
                    paddingTop: "1rem",
                    // margin: "2rem",
                    // paddingLeft: "1rem",
                    marginLeft:'1rem'
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <Box sx={{  width: "100%" }}>
                    <MUIDataTable
                      // title={"Announcement List"}
                      // data={data ? data : []}
                      data={responseData?.translist}
                      columns={columns}
                      options={options}
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={5}></Grid>
              <Grid item xs={12} sm={12} md={4}></Grid>

              <Grid item xs={12} sm={12} md={3}>
                <ColorButton1 variant="contained" type="submit">
                  Preview
                </ColorButton1>
              </Grid> */}
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default TransferFunds;
