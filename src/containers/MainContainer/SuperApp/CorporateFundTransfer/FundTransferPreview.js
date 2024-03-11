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

import GoBackButton from "../../../../components/common/GoBackButton";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};

const FundTransferPreview = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  console.log(user, "user");
  console.log("accList", accList);

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));
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
      setValue(
        "accountNumber",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

  useEffect(() => {
    setValue("fromDate", new Date());
    setValue("toDate", new Date());
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
      value: "PDF ",
    },
    {
      code: "02",
      value: "CSV ",
    },
  ];

  const accountHomebank = [
    {
      code: "01",
      value: "0000487123256871486 - Rakesh Tr  ",
    },
    {
      code: "02",
      value: "0000487123256871486 - Mahesh Tr  ",
    },
    {
      code: "03",
      value: "0000487123256871486 - Ramesh Tr  ",
    },
  ];

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
        brCode: data.accountNumber.code,
      };

      const response = await postApiData(
        apiList.ACCOUNT_STATEMENT_DOWNLOAD,
        payload
      );
      // const response = await ServerInstance.post(apiList.ACCOUNT_STATEMENT_DOWNLOAD, payload);
      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success");
        reset();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
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
    { field: "id", headerName: "Sr. No.", width: 60 },
    {
      field: "databaseID",
      headerName: "ID",
      width: 50,
    },
    {
      field: "batchCode",
      headerName: "Batch Code",
      type: "number",
      width: 100,
    },
    {
      field: "from",
      headerName: "From",
      type: "number",
      width: 100,
    },
    {
      field: "to",
      headerName: "To",
      type: "number",
      width: 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 110,
    },
    {
      field: "scheduleTime",
      headerName: "Schedule Time",
      type: "number",
      width: 130,
    },
    {
      field: "beneficiaryName",
      headerName: "Beneficiary Name",
      type: "number",
      width: 150,
    },
    {
      field: "remark",
      headerName: "Remark",
      type: "number",
      width: 70,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 100,
    },
  ];

  const apiData = [
    {
      status: true,
      msg: "Success",
      transhistory: [
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },

        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
        {
          databaseID: "1111",
          batchCode: "2023202",
          from: "XXXX1234",
          to: "ABCD01234",
          amount: "₹20000.00",
          scheduleTime: "20231312",
          beneficiaryName: "XYZ PVT LTD",
          remark: "Maker",
          status: "Pending",
        },
      ],
    },
  ];

  const apiRows =
    apiData[0]?.transhistory.map((row, index) => ({ ...row, id: index })) || [];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <Grid container>
        <Grid item xs={12} sm={12} md={2}>
          <GoBackButton></GoBackButton>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <div className={classes.paymentMainHeading}>Payments</div>
        </Grid>
        <Grid item xs={12} sm={12} md={5}></Grid>
      </Grid>
      <div className={classes.gridtitle}>Preview</div>
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
              style={{ padding: "3vw" }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    From Date
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={
                        {
                          //   fullWidth: true,
                        }
                      }
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                      }}
                      required={false}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    To Date
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={
                        {
                          //   fullWidth: true,
                        }
                      }
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                      }}
                      required={false}
                    />
                  </div>
                </div>
              </Grid>

              <Grid
                className={classes.fundPreviewApplyButton}
                item
                xs={12}
                sm={12}
                md={4}
              >
                <ColorButton1 variant="contained" type="submit">
                  Apply
                </ColorButton1>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
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
              style={{ padding: "3vw" }}
            >
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Transfer Type
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  Other Bank
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Total Amount
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  ₹ 20,00,000.00
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Total Record
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  10 Record
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Request By
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  Ramesh Chauhan
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={4}
              rowSpacing={2}
              style={{ padding: "3vw" }}
            >
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Batch Code
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  2023202000792
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Transfer Method
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  IMPS
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <div className={classes.paymentPreviewSecondBoxFirstHeading}>
                  Status
                </div>
                <div className={classes.paymentPreviewSecondBoxSecondHeading}>
                  {" "}
                  Awaiting Approval
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
            </Grid>
          </Box>
        </div>
      </div>

      <div className={classes.cardsBox}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={apiRows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default FundTransferPreview;
