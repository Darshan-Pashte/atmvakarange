import classes from "../Airtel.module.css";
import React, { useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import MUIDataTable from "mui-datatables";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import {
  ShankarSirUrl,
  ShankarSirUrlServer,
  UpiTransactionDownloadList,
  apiList,
} from "../../../../components/utilities/nodeApiList";
// import { useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import Loader from "../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
// import { REMOVE_USER } from "../../../../constants";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import { logout } from "../../../../store/authSlice";
import UPIViewRowData from "../../../../components/common/upiViewRowData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { convertDate } from "../../../../components/utilities/convertDate";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import GridTablePagination from "../../../../components/common/gridTablePagination";
import CallbackUpi from "../../../../components/common/CallBackOnUpi/CallbackUpi";
import CustomRoutes from "../../../../routes/Routes";

const defaultFormData = {
  accountNo: "",
  custNo: "",
  companyId: "",
};

const IssuerSwitchBrowse = () => {
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

  const navigate = useNavigate();
  // const { state: user } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState("");
  const [payloadData, setPayloadData] = useState({});
  const [responseData, setResponseData] = useState({});
  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowDataToDisplay, setRowDataToDisplay] = useState({});
  const [tableHeaders, setTableHeaders] = useState([]);
  const [message, setMessage] = useState("");
  const [isMidLoading, setisMidLoading] = useState(false);
  const [isBankCodeLoading, setisBankCodeLoading] = useState(false);
  const [banksCode, setbanksCode] = useState([]);
  const [bankNamee, setbankNamee] = useState([]);
  const url = "/upitransaction/refund"
  const url1 = "/upitransactionbrowselist"
  const location = useLocation();
  const currentPath = location.pathname;
  const topLevelPath = "/" + currentPath.split("/")[1];

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  useEffect(() => {
    if (banksCode ) {
        setValue("bankCode", compareTextAndReturnObject(banksCode, banksCode[0]?.value))
        // setValue("mid", compareTextAndReturnObject(bankNamee, bankNamee[0]?.value))
    }
}, [banksCode]);

useEffect(() => {
    if (bankNamee ) {
        // setValue("bankCode", compareTextAndReturnObject(banksCode, banksCode[0]?.value))
        setValue("mid", compareTextAndReturnObject(bankNamee, bankNamee[0]?.value))
    }
}, [bankNamee]);

useEffect(() => {
    // if (banksCode) {
        setValue("status", compareTextAndReturnObject(statusList, statusList[0]?.value))
        
            
    // }
}, []);

  useEffect(() => {
    vpaCreate1();
    vpaCreate();
  }, [token, username]);

  const allOption = {
    code: "",
    value: "All",
  };

  const TransactionType = [
    {
      code: "",
      value: "All",
    },
    {
      code: "IMPS",
      value: "IMPS",
    },
    {
      code: "RTGS",
      value: "RTGS",
    },
    {
      code: "NEFT",
      value: "NEFT",
    },
    {
      code: "INTERNAL",
      value: "INTERNAL",
    },
  ];

  const ResponseCode = [
    {
      code: "",
      value: "All",
    },
    {
      code: "S",
      value: "Success",
    },
    {
      code: "F",
      value: "Failed",
    },
  ];

  const Status = [
    {
      code: "",
      value: "All",
    },
    {
      code: "M",
      value: "MAKER",
    },
    {
      code: "C",
      value: "CHECKER",
    },
    {
      code: "A",
      value: "AUTHORIZER",
    },
  ];

  const statusList = [
    {
      code: "ALL",
      value: "ALL",
    },
    {
      code: "SUCCESS",
      value: "SUCCESS",
    },
    {
      code: "FAIL",
      value: "FAIL",
    },
  ];

  const openModal = (rowData) => {
    console.log("rowDta", rowData)
    const index = 12;
    if (rowData.length > index) {
      const dateValue = rowData[index];

      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      if (dateRegex.test(dateValue)) {
        const formattedDate = new Date(dateValue).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          // timeZoneName: 'short',
        });

        const modifiedRowData = [...rowData];
        modifiedRowData[index] = formattedDate;
        const headers = columns
          ?.filter((column) => column?.label !== "Vw" && column?.label !== "CB" )
          .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
          headers: headers,
          rowData: modifiedRowData,
        });
        setIsModalOpen(true);
      } else {
        console.error("Value at index 12 is not in the expected date format");
        const defaultDate = "N/A";
        const modifiedRowData = [...rowData];
        modifiedRowData[index] = defaultDate;
        const headers = columns
          ?.filter((column) => column?.label !== "Vw" && column?.label !== "CB" )
          .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
          headers: headers,
          rowData: modifiedRowData,
        });
        setIsModalOpen(true);
      }
    } else {
      console.error("rowData doesn't have enough items");
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { PROTECTED_ROUTES } = CustomRoutes();
  const shouldRenderEditIcon = PROTECTED_ROUTES.some((route) => {
    const childRoute = route.childRoutes?.find((child) => child.url === url1);
    console.log("childRoute?.grandChild",childRoute?.grandChild[0].arr);
    return childRoute?.grandChild && childRoute.grandChild[0].arr === 1
  });

  var columns = [
    {
      name: "View",
      label: "Vw",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, { rowData }, tableMeta) => {
          return (
            <Button  sx={{color:"black", minWidth :"100%"}}  onClick={() => openModal(rowData)}> <VisibilityIcon /></Button>
          );
        },
      }
    },
    {
      name: "WalletBalance",
      label: "CB",
      options: {
        filter: true,
        sort: false,
        display : shouldRenderEditIcon ? "true" : "excluded",
        customBodyRender: (value, { rowIndex }) => {
          // console.log(value, rowIndex);
          return (
            <>
              <CallbackUpi rowIndex={rowIndex} data={data}  topLevelPath={topLevelPath} url1={url1} />
            </>
          );
        },
      }
    },
    // {
    //   name: "Edit",
    //   label: "REF",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, { rowIndex }) => {
    //       return (
    //         <>
    //           <RefundIcon rowIndex={rowIndex} data={data} handleNavigate={handleNavigate} url={url} topLevelPath={topLevelPath} url1={url1} />
    //         </>
    //       );
    //     },
    //   }
    // },
    {
      name: "hdnOrderId",
      label: "HDN Order Id",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "txnType",
      label: "TXN Type",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "orgOrderId",
      label: "Org Order Id",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "amount",
      label: "Amnt (₹)",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "mid",
      label: "Mid",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "payeeVPA",
      label: "Payee VPA",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "payerVPA",
      label: "Payer VPA",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "txnRefNo",
      label: "TXN Ref No",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "rrn",
      label: "RRN",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "txnStatus",
      label: "TXN Status",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "messageText",
      label: "Message",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "txnDate",
      label: "TXN Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          const formattedDate = new Date(value).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
          const hyphenatedDate = formattedDate.replace(/\s/g, '-');
          return hyphenatedDate;
        },
        display: true,
      }
    },
    {
      name: "isReversed",
      label: "Is Reversed",
      options: {
        filter: true,
        sort: false, 
        display: false,
      }
    },
    {
      name: "isRefunded",
      label: "Is Refunded",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "refundAmount",
      label: "Refund Amount",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "bankcode",
      label: "Bank Code",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "cbRespCode",
      label: "CB Resp Code",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "cbRespMsg",
      label: "CB Message",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/auth/login");
  };

  const create = () => {
    navigate("/company/accountadd");
  };

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

  // useEffect(() => {
  //   if(bankNamee){
  //   setValue("responseCode", compareTextAndReturnObject(ResponseCode, ResponseCode[0]?.value))
  //   setValue("activityStatus", compareTextAndReturnObject(Status, Status[0]?.value))
  //   setValue("transType", compareTextAndReturnObject(TransactionType, TransactionType[0]?.value))
  //   setValue("companyId", compareTextAndReturnObject(result, result[0]?.value))
  //   }

  // }, [bankNamee]);

  const handleNavigate = (data) => {
    navigate("/user/userbrowselist", { state: data });
  };

  const onSubmit = async (data) => {
    setIsloading(true);
    const payload = {
      userId: username,
      sessionId: token,
      requestCode: "getUpiTxnListWithPagination",
      status: data?.status,
      bankCode: data?.bankCode,
      vpa : data?.vpa,
      mid: data?.mid,
      fromDate: data?.fromDate,
      toDate: data?.toDate,
    };
    getTransactionList(1, payload);
  };
  console.log(message);

  // useEffect(() => {
  //   getTransactionListView(1, payloadData);
  // }, []);

  const getTransactionListView = async (currentPage, data = payloadData) => {
    console.log("payloadData", payloadData);
    var { fromDate = "", toDate = "", transType = "" } = data;
    setCurrentPage(currentPage);
    setIsloading(true);
    console.log("data", data);
    try {
      const payload = {
        userId: username,
        sessionId: token,
        requestCode: "getUpiTxnListWithPagination",
        status: data?.status?.code,
        bankCode: data?.bankCode?.code,
        vpa : data?.vpa,
        mid: data?.mid?.code ? data?.mid?.code : "all",
        fromDate: data?.fromDate
          ? convertDate(data?.fromDate, 9)
          : convertDate(new Date(), 9),
        toDate: data?.toDate
          ? convertDate(data?.toDate, 9)
          : convertDate(new Date(), 9),
          pageNo:currentPage,
          pageSize:goPageNumber
      
      };

      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      console.log("payload", payload);
      if (response?.respCode == '00') {
        setData(response?.upiTxnList);
        settotalRecord(response?.data);
      } else {
        setData("");
        settotalRecord("");
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const getTransactionList = (currentpages, payloadDatachild) => {
    getTransactionListView(currentpages, payloadDatachild);
    setPayloadData(payloadDatachild);
  };

  const selectedData = selectedRows.map(
    (index) => responseData && responseData.translist[index]
  );

  const vpaCreate = async () => {
    setisMidLoading(true);
    try {
      const payload = {
        requestCode: "getMasterMerchantListAll",
        userId: username,
        sessionId: token,
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      setbankNamee(response.data);
      setisMidLoading(false);
      if (response.respCode == "IS") {
       
        navigate("/auth/login");
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const vpaCreate1 = async () => {
    setisBankCodeLoading(true);
    try {
      const payload = {
        requestCode: "getBankCodes",
        userId: username,
        sessionId: token,
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      setbanksCode(response?.data);
      setisBankCodeLoading(false);
      if (response.respCode == "IS") {
        
        navigate("/auth/login");
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onDownloadExcel = async (data) => {
    try {
      const response = await fetch(
        `${UpiTransactionDownloadList}type=EXCEL&mid=${
          watch("mid")?.code ? watch("mid")?.code : "all"
        }&bankcode=${watch("bankCode")?.code}&status=${
          watch("status")?.code
        }&from=${convertDate(watch("fromDate"), 9)}&to=${convertDate(
          watch("toDate"),
          9
        )}`
        // /airtelUpiPortalReq/downloadUpiTxnReport?type=CSV&mid=ALL&bankcode=ALL&status=ALL&from=20220801&to=20231110
      );
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Bank_Upi_Transactions_Airtel ${convertDate(
        watch("fromDate"),
        6
      )}-${convertDate(watch("toDate"), 6)}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  const onDownloadCSV = async (data) => {
    try {
      const response = await fetch(
        `${UpiTransactionDownloadList}type=CSV&mid=${
          watch("mid")?.code ? watch("mid")?.code : "all"
        }&bankcode=${watch("bankCode")?.code}&status=${
          watch("status")?.code
        }&from=${convertDate(watch("fromDate"), 9)}&to=${convertDate(
          watch("toDate"),
          9
        )}`
        // /airtelUpiPortalReq/downloadUpiTxnReport?type=CSV&mid=ALL&bankcode=ALL&status=ALL&from=20220801&to=20231110
      );
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Bank_Upi_Transactions_Airtel ${convertDate(
        watch("fromDate"),
        6
      )}-${convertDate(watch("toDate"), 6)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  // const filteredData = bankNamee && bankNamee
  // ?.filter(item => item.hasOwnProperty('companyName'))
  // ?.map(item => ({ "code": item.companyId, "value": item.companyName }))

  // const result = [allOption, ...filteredData];

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
    height: "38px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    backgroundColor: "#323232",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "100%",
    height: "38px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const options = {
    textLabels: {
      body: {
        noMatch: (
          <div
            style={{
              display: "flex",
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "larger",
            }}
          >
            {message ? message : "Sorry, no matching records found"}
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "stacked",
    filter: true,
    download: false,
    print: false,
    // checkbox:false,
    selectableRows: false,
    rowsPerPage : goPageNumber,
    customFooter: () => {
      return (
        
        <GridTablePagination
          currentPage={currentPage}
          totalCount={totalRecord}
          pageSize={goPageNumber}
          onPageChange={(page) => {
            console.log("page", page);
            getTransactionListView(page);
          }}
        />
      );
    },
  };

  return (
    <>
      {/* {isLoading || isBankCodeLoading || isMidLoading ? (
        <Loader loading={true} />
      ) : (
        <Loader loading={false} />
      )} */}

      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.Sbox}>
        <div className={classes.bluerow}>
            <div className={classes.bluerowtext}>Local And Aquirer Browse</div>
            
          </div>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
              >
                <Grid item xs={0} sm={3} md={3}>
                  <div className={classes.frowdata1aff}>
                    <div className={classes.frowtextaff}>
                      From Date<sup className={classes.required}>*</sup>
                    </div>

                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "fromDate",
                      }}
                      TextFieldProps={{
                        fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "From Date",
                        fullWidth: true,
                      }}
                      // rules={{
                      //     required:
                      //       "From Date " + errorMessages.error_autocomplete_message,
                      //   }}
                      required={false}
                    />
                    {/* <DatePicker
        value={valueDate}
        onChange={(newValue) => {
          console.log("newValue", newValue);
          setValueDate(newValue);
        }}
        renderInput={(params) => <input {...params} />}
      /> */}
                  </div>
                </Grid>
                <Grid item xs={0} sm={3} md={3}>
                  <div className={classes.frowdata1aff}>
                    <div className={classes.frowtextaff}>
                      To Date<sup className={classes.required}>*</sup>
                    </div>
                    <DatePickerForm
                      controlerProps={{
                        control: control,
                        name: "toDate",
                      }}
                      TextFieldProps={{
                        fullWidth: true,
                      }}
                      DatePickerProps={{
                        // label: "To Date",
                        fullWidth: true,

                        // maxDate:new Date()
                      }}
                      // rules={{
                      //     required:
                      //       "To Date " + errorMessages.error_autocomplete_message,
                      //   }}
                      required={false}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={5} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>MID</div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "mid",
                        }}
                        TextFieldProps={{
                          placeholder: "Please Enter MID",
                        }}
                        data={bankNamee ? bankNamee : []}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Code<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "bankCode",
                        }}
                        TextFieldProps={{
                          placeholder: "Bank Code",
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
                            "Bank Code " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={banksCode ? banksCode : []}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Status<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "status",
                        }}
                        TextFieldProps={{
                          placeholder: "Please Enter Status",
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
                            "Status " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={statusList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>VPA<sup className={classes.required}>*</sup></div>
                  <div className={classes.frow1aff}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "vpa",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        placeholder: "Enter VPA",
                        // style: { width: "33vw" },
                        fullWidth: true,
                        
                      }}
                      regExp={/^.*$/}
                      required={false}
                    />
                  </div>
                </div>
              </Grid>
                <Grid item xs={12} sm={6} md={2} style={{paddingTop: "42px"}} ></Grid>
              <Grid item xs={12} sm={6} md={2} style={{paddingTop: "42px"}} ></Grid>
              <Grid item xs={12} sm={6} md={2} style={{paddingTop: "42px"}} ><ColorButton1 variant="contained" type="submit">
                Submit
              </ColorButton1></Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.parentcomp}>
            <div className={classes.Sbox2}>
              {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
              <div style={{ width: "100%" }}>
                <MUIDataTable
                  title={"Local And Aquirer List"}
                  data={data ? data : []}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>
            {isModalOpen ? (
              <UPIViewRowData
                open={isModalOpen}
                handleClose={closeModal}
                rowDataToDisplay={rowDataToDisplay}
                data={data}
                show={"2"}
                title={"Local And Aquirer Details"}
              />
            ) : null}
            {/* <Modal
        open={isModalOpen}
        onClose={closeModal}
        style={{width:"50vw",zIndex:1111}}
      >
        <div className={classes.modalContent}>
          <pre>{JSON.stringify(rowDataToDisplay, null, 2)}</pre>
          <Button onClick={closeModal}>Close</Button>
        </div>
      </Modal> */}
          </div>
        </div>
      </Box>
    </>
  );
};

export default IssuerSwitchBrowse;
