import React, { useContext } from "react";
import ChartComponent from "../../../components/ApexCharts/Chart";
import classes from "./Dashboard.module.css";
import PercentageFillCard from "./PercentageFillCard/PercentageFillCard";
import RevenueCard from "./RevenueCard/RevenueCard";
import CardWithMultipleChips from "../Dashboard/CardWithMultipleChips/CardWithMultipleChips";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { postApiData } from "../../../components/utilities/nodeApiServices";
import { apiList } from "../../../components/utilities/nodeApiList";
import SweetAlertPopup from "../../../components/common/sweetAlertPopup";
import { REMOVE_USER } from "../../../constants";
// import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import DashboarCard from "./DashboardCard";
import { CardMiddleList } from "./CardList";
import { errorMessages } from "../../../components/utilities/formValidation";
import AutocompleteForm from "../../../components/common/autuCompleteForm";
import { Box, Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { compareTextAndReturnObject } from "../../../components/common/commonArray";

import refresh from "../../../assets/Sidebar/refresh.svg";
import LocalTransactionChart from "./LocalTransactionChart";
import RadioGroupForm from "../../../components/common/RedioButtonForm";

import AMU from "../../../assets/DashboardPics/card1.svg";
import NPA from "../../../assets/DashboardPics/card2.svg";
import PL from "../../../assets/DashboardPics/card3.svg";
import MUIDataTable from "mui-datatables";
import Local from "../../../assets/DashboardPics/card4.svg";
import Acquire from "../../../assets/DashboardPics/card5.svg";
import Issuer from "../../../assets/DashboardPics/card6.svg";
import DashboardMiddleCard from "./DashboardMiddleCard";
import LocalTransactionChart1 from "./LocalTransactionChart1";
import Loader from "../../../components/common/loader";
import SuccessChart from "./RadialChart";
import RadialChart from "./RadialChart";
import GridTablePagination from "../../../components/common/gridTablePagination";
import DatePickerForm from "../../../components/common/datePickerForm";
import { convertDate } from "../../../components/utilities/convertDate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChartComponentBar from "../../../components/ApexCharts/ChartBar";
import AcquireTransactionChart from "./AcquireTransactionChart";
import AcquireTransactionChart1 from "./AcquireTransactionChart1";
import YourChartComponent from "./AcquireTransactionChart1";

const data = {
  categories: ["M", "T", "W", "T", "F", "S", "S"],
  series: [
    {
      name: "Test 1",
      data: [10, 20, 30, 40, 20, 30, 25],
    },
    // {
    //   name: 'Test 2',
    //   data: [10, 20, 30, 40, 20, 30, 25, 0, 30, 40, 10, 45,20,10,30,50,22,33,44,22,38,19,31,48].reverse(),
    // },
  ],
};

const barColors = ["#1BA781", "#FEC868"];

const defaultFormData = {
  bankcode: "",
  fromDate: null,
};

const Dashboard = () => {
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
  const [totalBanks, setTotalBanks] = useState("");
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [loList, setloList] = useState([]);
  const [AcqList, setAcqList] = useState([]);
  const [IssList, setIssList] = useState([]);

  const [graphLocal, setGraphlocal] = useState([]);
  const [graphIssuer, setGraphIssuer] = useState([]);
  const [graphSucess, setGraphSuccess] = useState([]);
  const [graphFail, setGraphFail] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowDataToDisplay, setRowDataToDisplay] = useState({});
  const [tableHeaders, setTableHeaders] = useState([]);

  const [atmMasterList, setAtmMasterList] = useState([]);
  const [bankcode, setBankCode] = useState([]);
  const [atmID, setAtmID] = useState([]);

  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [payloadData, setPayloadData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user, dashboardlst } = useSelector(
    (state) => state.auth
  );
  const [bankcodes, setBankCodes] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [dayList, setDayList] = useState([]);

  // const { dispatch: authDispatch } = useContext(AuthContext);

  // useEffect(() => {
  //   setToken(sessionStorage.getItem("TOKEN"));
  //   setUserName(sessionStorage.getItem("username"))
  // }, []);

  console.log("user", user);
  console.log("dashboardlst", dashboardlst);

  // useEffect(() => {
  //   fetchBanksData();
  // }, [username,token]);

  // const fetchBanksData = async () => {
  //   try {
  //     const payload = {
  //       requestCode: "dashboard",
  //       userId: username,
  //       sessionId: token,
  //     };
  //     const response = await postApiData(apiList.ShankarSirsUrl, payload);
  //     if(response.respCode=="00"){
  //       setTotalBanks(response?.data);
  //     }
  //     else if(response.respCode=="IS"){
  //       // authDispatch({ type: REMOVE_USER });
  //       navigate("/auth/login")
  //       SweetAlertPopup(response?.respMsg, "Error", "error");
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const BankCodeList =
    bankcodes &&
    bankcodes?.map((item) => ({ code: item.bankCd, value: item.bankCd }));

  // useEffect(()=>{
  // if(BankCodeList){
  //   setValue('bankcode',BankCodeList ? compareTextAndReturnObject(BankCodeList,BankCodeList[0]?.value):'')
  // }
  // },[BankCodeList])

  useEffect(() => {
    getBankCode();
  }, []);

  const getBankCode = async () => {
    try {
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.GET_BANKCODE, payload);

      if (response.status == true) {
        setBankCodes(response.bankCodes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Total = Number(totalBanks?.todaysNoOfTotalUPITxn?.amt);
  const Success = Number(totalBanks?.todaysNoOfSuccessUPITxn?.amt);
  const Failure = Number(totalBanks?.todaysNoOfFailUPITxn?.amt);

  const newSuccess = graphSucess && graphSucess[0]?.acqSuccCnt;
  const newFail = graphFail && graphFail[0]?.acqFailCnt;

  console.log("newSuccess", newSuccess);
  console.log("newFail", newFail);
  // const successrate = graphSucess?.acqSuccCnt;

  // const newSuccessPer=((newSuccess/(newSuccess + newFail))*1000).toFixed(2)
  const newSuccessPer = (
    (newSuccess * 100) /
    Number(Number(newSuccess) + Number(newFail))
  ).toFixed(2);
  const succrate = parseInt(newSuccessPer);
  const failrate = Number(100 - succrate);

  console.log("newSuccessPer", newSuccess * 100);
  console.log("newSuccessPer", newSuccess + newFail);
  console.log("newSuccessPer", (newSuccess * 100) / (newSuccess + newFail));

  console.log("newSuccessPer", newSuccessPer);
  const dashList = user?.dashboardlst;
  console.log(dashList, "dashList  ");

  const CardList = [
    {
      icon: AMU,
      title: "ATM In-Service",
      value: dashList[0]?.inservice,
      backgroundimage:
        "linear-gradient(109deg, #5755FF 37.01%, rgba(165, 164, 255, 0.00) 102.12%)",
      boxshadow:
        "3px 9px 16px 0px rgba(87, 85, 255, 0.09), 7px 35px 22px 0px rgba(87, 85, 255, 0.05), 12px  3px 26px 0px rgba(87, 85, 255, 0.01), 18px 98px 28px 0px rgba(87, 85, 255, 0.00)",
    },
    {
      icon: NPA,
      title: "ATM Out Off Service",
      value: dashList[0]?.outservice,

      backgroundimage:
        "linear-gradient(112deg, #FB9266 37.61%, rgba(255, 188, 160, 0.00) 98.07%)",
      boxshadow:
        "1px 2px 9px 0px rgba(251, 146, 102, 0.10), 3px 16px 16px 0px rgba(251, 146, 102, 0.09), 7px 35px 22px 0px rgba(251, 146, 102, 0.05), 12px 63px 25px 0px rgba(251, 146, 102, 0.01), 18px 98px 28px 0px rgba(251, 146, 102, 0.00)",
    },
    {
      icon: PL,
      title: "ATM Offline",
      value: dashList[0]?.offline,
      backgroundimage:
        "linear-gradient(113deg, #FDB73B 41.4%, rgba(253, 183, 59, 0.00) 97.77%)",
      boxshadow:
        "1px 4px 9px 0px rgba(253, 183, 59, 0.10), 5px 16px 17px 0px rgba(253, 183, 59, 0.09), 12px 36px 23px 0px rgba(253, 183, 59, 0.05), 21px 64px 27px 0px rgba(253, 183, 59, 0.01), 33px 100px 29px 0px rgba(253, 183, 59, 0.00) ",
    },
  ];

  const CardMiddleList = [
    {
      icon: Local,
      top: "Local Transaction",
      // title: "LAST TRANSACTION DATE:",
      value: loList[0]?.lclSuccCnt,
      status: "SUCCESS",
      background: "#f4f4f4",
      backgroundimage:
        "linear-gradient(112deg, #5BA18E 53.3%, rgba(83, 150, 126, 0.40) 91.79%, rgba(153, 242, 200, 0.20) 98.4%)",
      boxshadow:
        "3px 16px 16px 0px rgba(87, 85, 255, 0.09), 7px 35px 22px 0px rgba(87, 85, 255, 0.05), 12px 63px 26px 0px rgba(87, 85, 255, 0.01), 18px 98px 28px 0px rgba(87, 85, 255, 0.00)",
      // "linear-gradient(131deg, #5755ff 37%, rgba(165, 164, 255, 0) 102%), linear-gradient(248deg, #fff 100%, rgba(255, 255, 255, 0.3) 0%)",
    },
    {
      icon: Acquire,
      top: "ACQUIRER TRANSACTION",
      // title: "LAST TRANSACTION DATE:",
      value: AcqList[0]?.acqSuccCnt,
      status: "SUCCESS",
      backgroundimage:
        " linear-gradient(114deg, #887CAA 52.61%, rgba(101, 78, 163, 0.40) 88.96%, rgba(234, 175, 200, 0.20) 97.92%)",
      boxshadow:
        "3px 16px 16px 0px rgba(87, 85, 255, 0.09), 7px 35px 22px 0px rgba(87, 85, 255, 0.05), 12px 63px 26px 0px rgba(87, 85, 255, 0.01), 18px 98px 28px 0px rgba(87, 85, 255, 0.00)",
      // "linear-gradient(136deg, #fb9266 38%, rgba(255, 188, 160, 0) 98%), linear-gradient(242deg, #fff 95%, rgba(242, 242, 242, 0) 1%)",
    },
    {
      icon: Issuer,
      top: "ISSUER TRANSACTION",
      // title: "LAST TRANSACTION DATE:",
      value: IssList[0]?.issSuccCnt,
      status: "SUCCESS",
      backgroundimage:
        "linear-gradient(115deg, #DD727D 51.94%, rgba(218, 68, 83, 0.40) 88.88%, rgba(137, 33, 107, 0.20) 100.46%)",
      boxshadow:
        "3px 16px 16px 0px rgba(87, 85, 255, 0.09), 7px 35px 22px 0px rgba(87, 85, 255, 0.05), 12px 63px 26px 0px rgba(87, 85, 255, 0.01), 18px 98px 28px 0px rgba(87, 85, 255, 0.00)",
      // "linear-gradient(137deg, #fdb73b 41%, rgba(253, 183, 59, 0) 98%), linear-gradient(243deg, #fbfbfb 92%, rgba(246, 246, 246, 0) 0%)",
    },
  ];
 

  useEffect(() => {
    getDashboardCount();
  }, [watch("bankcode")]);

  const getDashboardCount = async (data) => {
    console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        bankcd: watch("bankcode")?.code,
      };
      console.log("payload", payload);
      const response = await postApiData(apiList.DASHBOARD_COUNT, payload);
      console.log("response", response);
      if (response?.status == true) {
        setloList(response?.loList);
        setAcqList(response?.acqcntSuccs);
        setIssList(response?.iSuccs);
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  useEffect(() => {
    getDashboardGraph();
    getSuccessGraph();
    getDashboardDay()
  }, []);

  const getSuccessGraph = async (data) => {
    console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      console.log("payload", payload);
      const response = await postApiData(
        apiList.DASHBOARD_SUCCESS_GRAPH,
        payload
      );
      console.log("Graph response", response);
      if (response?.status == true) {
        setGraphSuccess(response?.acAqrTransSuccCnts);
        setGraphFail(response?.aqrTransFailCnts);
        setIsloading(false);
        // setloList(response?.loList)
        // setAcqList(response?.acqcntSuccs)
        // setIssList(response?.iSuccs)
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const getDashboardDay = async (data) => {
    console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      console.log("payload", payload);
      const response = await postApiData(
        apiList.DASHBOARD_DAY_GRAPH,
        payload
      );
      console.log("Graph response", response);
      if (response?.status == true) {
      setDayList(response?.list)
        setIsloading(false);
        // setloList(response?.loList)
        // setAcqList(response?.acqcntSuccs)
        // setIssList(response?.iSuccs)
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };
  const getDashboardGraph = async (data) => {
    console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      console.log("payload", payload);
      const response = await postApiData(apiList.DASHBOARD_GRAPH, payload);
      console.log("Graph response", response);
      if (response?.status == true) {
        setGraphlocal(response?.localgraph);
        setGraphIssuer(response?.issuergraph);
        setIsloading(false);
        // setloList(response?.loList)
        // setAcqList(response?.acqcntSuccs)
        // setIssList(response?.iSuccs)
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const columns = [
    // {
    //   name: "View",
    //   label: "View",
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (value, { rowData }, tableMeta) => {
    //       return (
    //         <Button
    //           sx={{
    //             color: "black",
    //             minWidth: "100%",
    //             padding: "5px 5px !important",
    //           }}
    //           onClick={() => openModal(rowData)}
    //         >
    //           {" "}
    //           <VisibilityIcon />
    //         </Button>
    //       );
    //     },
    //   },
    // },

    //   {
    //     name: "Modify",
    //     label: "Modify",
    //     options: {
    //         filter: false,
    //         sort: false,
    //         customBodyRender: (value, { rowIndex }) => {
    //             return (
    //                 <>
    //                     <EditsIcons rowIndex={rowIndex} data={atmMasterList}  handleNavigate={handleNavigate} url={url} topLevelPath={topLevelPath} url1={url1} />
    //                 </>
    //             );
    //         },
    //     }
    // },

    {
      name: "atmid",
      label: "ATM Id",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "transactionnumber",
      label: "Transaction No.",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "transactiondate",
      label: "Transaction Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          const formattedDate = new Date(value).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "numeric",
            year: "numeric",
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
          });
          return formattedDate;
        },
      },
    },
    {
      name: "transactiontype",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "currenttransactionstatus",
      label: "Current Transaction Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "responsecd",
      label: "Response CD",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "responsedesc",
      label: "Response Description",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              // boxShadow: "none",
              // backgroundColor: "#f5f6fA",
              // boxShadow:'0 0 3px #999'
              border: "1px solid lightgrey",
            },
          },
        },
        MuiTableHead: {
          root: {
            "& .customTableHead": {
              background: "red", // Replace with your desired background color
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              paddingTop: "8px", // Adjust the top padding value as needed
              paddingBottom: "8px",
            },
          },
        },
      },
    });

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
            Sorry, no matching records found
          </div>
        ),
      },
    },
    filterType: "dropdown",
    responsive: "stacked",
    filter: true,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false,
    pagination: false,
    customFooter: () => {
      return (
        <GridTablePagination
          currentPage={currentPage}
          totalCount={totalRecord}
          pageSize={goPageNumber}
          control={control}
          onPageChange={(page) => {
            getTransactionListView(page);
          }}
        />
      );
    },
  };

  useEffect(() => {
    onSubmit();
  }, [watch("fromDate")]);

  const getTransactionListView = async (currentPage, data = payloadData) => {
    console.log("currentPage", currentPage);
    setCurrentPage(currentPage);
    console.log("data", data);
    setIsloading(true);
    try {
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        fromDate: data.fromDate,
      };

      const response = await postApiData(
        apiList.DASHBOARD_TRANSACTION_REPORT +
          `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );

      if (response.status == true) {
        setAtmMasterList(response.arrayList);
        settotalRecord(response.totalRecords);
        //             setIsloading(false);
        // settotalRecord(response.data.totalRecords)
      } else {
        setAtmMasterList([]);

        // SweetAlertPopup(response.message, "Error", "error");
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

  const onSubmit = (data) => {
    console.log("data", data);
    let payload = {
      username: user?.username,
      sessionId: user?.sessionId,
      fromDate: convertDate(watch("fromDate"), 1)
        ? convertDate(watch("fromDate"), 1)
        : convertDate(new Date()),
    };
    console.log("payload", payload);
    getTransactionList(1, payload);
    //  setpalyalodData(payload)
    //  reset(defaultFormData);
  };

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.Sbox}>
        <div className={classes.heading}>Overview</div>
        <div className={classes.DashboardContainer}>
          <div style={{ flex: 1 }}>
            <div className={classes.boxs}>
              {CardList.map((card, index) => {
                return <DashboarCard card={card} index={index} />;
              })}
            </div>

            <div className={classes.MiddleContent}>
              <Box
                className={classes.mainContainer}
                component="form"
                // onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "20px 0 10px 0" }}
              >
                <div className={classes.Sbox}>
                  {/* <div className={classes.bluerow}>Bank Name</div> */}
                  <div>
                    <div className={classes.formbox}>
                      <Grid
                        container
                        columnSpacing={3}
                        rowSpacing={2}
                        style={{ paddingRight: "0.2vw" }}
                      >
                        <Grid item xs={10} sm={6} md={9}>
                          <div className={classes.MiddleContenthead}>
                            Bank Analytics
                          </div>
                        </Grid>
                        <Grid item xs={10} sm={6} md={3}>
                          <div className={classes.frowdataaff}>
                            <div className={classes.frowtextaff}>
                              {/* Bank Name */}
                              {/* <sup className={classes.required}>*</sup> */}
                            </div>

                            <div
                              className={classes.frow1aff}
                              style={{ marginTop: "10px" }}
                            >
                              <AutocompleteForm
                                controlerProps={{
                                  control: control,
                                  name: "bankcode",
                                }}
                                TextFieldProps={{
                                  placeholder: "Select Bank Name",
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
                                data={BankCodeList}
                                required={true}
                              />
                            </div>
                          </div>
                        </Grid>

                        {/* <Grid item xs={2} sm={6} md={4}>
                      <div className={classes.gridimage}>
                        {" "}
                        <img src={refresh} alt="headerLogo" />
                      </div>
                    </Grid> */}
                      </Grid>
                    </div>
                  </div>
                </div>
              </Box>

              {watch("bankcode") ? (
                <div className={classes.boxs}>
                  {CardMiddleList.map((card, index) => {
                    return <DashboardMiddleCard card={card} index={index} />;
                  })}
                </div>
              ) : (
                ""
              )}

              <div className={classes.BottomContainer}>
                <Grid
                  container
                  columnSpacing={3}
                  rowSpacing={2}
                  style={{ paddingRight: "0.2vw" }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.graphs}>
                      <div className={classes.graphinfo}>
                        <div className={classes.graphleft}>
                        <div className={classes.leftupper}>
                         <div className={classes.leftuppertitle}>Success Count</div>
                         <div className={classes.leftupperdesc} style={{color:'#32D583'}}>{newSuccess}</div>
                          </div>
                        <div className={classes.leftlower}>
                        <div className={classes.leftuppertitle}>Failure Count</div>
                         <div className={classes.leftupperdesc} style={{color:'#ff4949'}}>{newFail}</div>
                          </div>
                          </div>
                        <div className={classes.graphdata}>
                          <ChartComponent
                            type="radialBar"
                            series={[succrate]}
                            failrate={failrate}
                            graphSucess={graphSucess}
                            graphFail={graphFail}
                          />
                          {/* <RadialChart/> */}
                        </div>
                      </div>
                      <div className={classes.lowergraph}>
                        <div className={classes.graphtitle}>
                        ACQUIRER TRANSACTION COUNT
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div className={classes.graphs}>
                      <div className={classes.graphdata}>
                        {/* <YourChartComponent dayList={dayList}/> */}
                        <AcquireTransactionChart dayList={dayList}/>
                        {/* <ChartComponent type='bar' series={data} /> */}
                        {/* <AcquireTransactionChart type='bar' series={data}
                    showGridLines /> */}
                        {/* <ChartComponentBar type='bar' series={dashboard} showGridLines /> */}
                        {/* <LocalTransactionChart graph={graphLocal}/> */}
                      </div>
                      <div className={classes.lowergraph}>
                        <div className={classes.graphtitle}>
                      ACQUIRER TRANSACTION AMOUNT
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={12} md={9}></Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <div className={classes.frowdata1aff}>
                      <div className={classes.frowtextaff} style={{fontSize:'15px',fontWeight:'500'}}>
                        Select Date
                        {/* <sup className={classes.required}>*</sup> */}
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
                  <Grid item xs={12} sm={12} md={12}>
                    <div style={{ width: "100%", marginBottom: "10px" }}>
                      <ThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                          title={" Transaction Report"}
                          data={[...atmMasterList]}
                          columns={columns}
                          options={options}
                        />
                      </ThemeProvider>
                    </div>
                  </Grid>

                  {/* <Grid item xs={12} sm={6} md={12}>
              <div className={classes.graphs}>
                <div className={classes.graphdata}>
                  <LocalTransactionChart1 graph={graphIssuer}/>
                </div>
                <div className={classes.lowergraph}>
                  <div className={classes.graphtitle}>
                  ISSUER TRANSACTION
                  </div>

                </div>
              </div>
              </Grid> */}

                  {/* <Grid item xs={12} sm={12} md={4}>
              <div className={classes.graphs}>
                <div className={classes.graphdata}>
                  <ChartComponent
                    type="bar"
                    series={data.series}
                    showGridLines
                    colors={barColors}
                  />
                </div>

                <div className={classes.lowergraph}>
                  <div className={classes.radiogroup}>
                    <RadioGroupForm
                      controlerProps={{
                        control: control,
                        name: "transferType",
                      }}
                      data={[
                        {
                          label: "Day",
                          value: "Day",
                        },
                        {
                          label: "Week",
                          value: "Week",
                        },
                        {
                          label: "Month",
                          value: "Month",
                        },
                      ]}
                      // errorMessage={errorMessages.error_type_message + "Delivery day"}
                      // required={false}
                    />
                  </div>

                  <div className={classes.middletext}>
                    <div className={classes.middlelefttext}>
                      Local Transaction
                    </div>
                    <div className={classes.middlerighttext}>₹15000.00</div>
                  </div>

                  <div className={classes.middle1text}>SUCCESS</div>
                  <Divider />
                  <div className={classes.lowertext}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12" fill="none">
  <path d="M6.00985 9.29155C6.9467 9.29155 7.84518 8.91939 8.50763 8.25694C9.17009 7.59448 9.54225 6.696 9.54225 5.75916C9.54225 4.82231 9.17009 3.92383 8.50763 3.26138C7.84518 2.59892 6.9467 2.22676 6.00985 2.22676C5.073 2.22676 4.17453 2.59892 3.51207 3.26138C2.84962 3.92383 2.47746 4.82231 2.47746 5.75916C2.47746 6.696 2.84962 7.59448 3.51207 8.25694C4.17453 8.91939 5.073 9.29155 6.00985 9.29155ZM6.00985 1.34366C6.5897 1.34366 7.16388 1.45787 7.69959 1.67977C8.2353 1.90167 8.72206 2.22691 9.13208 2.63693C9.54209 3.04695 9.86734 3.53371 10.0892 4.06942C10.3111 4.60513 10.4253 5.1793 10.4253 5.75916C10.4253 6.93022 9.96014 8.05331 9.13208 8.88138C8.30401 9.70945 7.18091 10.1746 6.00985 10.1746C3.56809 10.1746 1.59436 8.18768 1.59436 5.75916C1.59436 4.58809 2.05956 3.465 2.88763 2.63693C3.71569 1.80886 4.83879 1.34366 6.00985 1.34366V1.34366ZM6.23063 3.55141V5.86954L8.2176 7.04848L7.88644 7.59158L5.5683 6.2007V3.55141H6.23063Z" fill="#7B809A"/>
</svg>Last Transaction : 24/02/24
                  </div>
                </div>
              </div>
              </Grid> */}
                </Grid>
              </div>
            </div>

            {/* <div className={classes.BottomContainer} >
          <div>
            <ChartComponent type='bar' series={data.series} showGridLines  colors={barColors }/>
            <div className={classes.graphname}>Issuer Transaction count</div>
          </div>
          <div>
            <ChartComponent type='radialBar' series={[succrate]} />
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
