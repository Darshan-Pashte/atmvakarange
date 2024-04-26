import React, { useContext } from "react";
import ChartComponent from "../../../components/ApexCharts/Chart";
import classes from "./Dashboard.module.css";
import PercentageFillCard from "./PercentageFillCard/PercentageFillCard";
import RevenueCard from "./RevenueCard/RevenueCard";
import CardWithMultipleChips from "../Dashboard/CardWithMultipleChips/CardWithMultipleChips";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { axiosGetApiData, postApiData } from "../../../components/utilities/nodeApiServices";
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
import DashboarCards from "./DashboardCards";
import { styled, Button } from "@mui/material";



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

  // console.log("user", user);
  // console.log("dashboardlst", dashboardlst);

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

      if (response?.data?.status == true) {
        setBankCodes(response?.data?.bankCodes);
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

  // console.log("newSuccess", newSuccess);
  // console.log("newFail", newFail);
  // const successrate = graphSucess?.acqSuccCnt;

  // const newSuccessPer=((newSuccess/(newSuccess + newFail))*1000).toFixed(2)
  const newSuccessPer = (
    (newSuccess * 100) /
    Number(Number(newSuccess) + Number(newFail))
  ).toFixed(2);
  const succrate = parseInt(newSuccessPer);
  const failrate = Number(100 - succrate);

  // console.log("newSuccessPer", newSuccess * 100);
  // console.log("newSuccessPer", newSuccess + newFail);
  // console.log("newSuccessPer", (newSuccess * 100) / (newSuccess + newFail));

  // console.log("newSuccessPer", newSuccessPer);
  const dashList = user?.dashboardlst;
  // console.log(dashList, "dashList  ");

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
 

  // useEffect(() => {
  //   getDashboardCount();
  // }, [watch("bankcode")]);

  const getDashboardCount = async (data) => {
    // console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        bankcd: watch("bankcode")?.code,
      };
      // console.log("payload", payload);
      const response = await postApiData(apiList.DASHBOARD_COUNT, payload);
      // console.log("response", response);
      if (response?.data?.status == true) {
        setloList(response?.data?.loList);
        setAcqList(response?.data?.acqcntSuccs);
        setIssList(response?.data?.iSuccs);
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  useEffect(() => {
    // getDashboardGraph();
    getSuccessGraph();
    getDashboardDay()
  }, []);

  const getSuccessGraph = async (data) => {
    // console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      // console.log("payload", payload);
      const response = await postApiData(
        apiList.DASHBOARD_SUCCESS_GRAPH,
        payload
      );
      // console.log("Graph response", response);
      if (response?.data?.status == true) {
        setGraphSuccess(response?.data?.acAqrTransSuccCnts);
        setGraphFail(response?.data?.aqrTransFailCnts);
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
    // console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      // console.log("payload", payload);
      const response = await postApiData(
        apiList.DASHBOARD_DAY_GRAPH,
        payload
      );
      // console.log("Graph response", response);
      if (response?.data?.status == true) {
      setDayList(response?.data?.list)
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
    // console.log("data", data);
    try {
      setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
      };
      // console.log("payload", payload);
      const response = await postApiData(apiList.DASHBOARD_GRAPH, payload);
      // console.log("Graph response", response);
      if (response?.data?.status == true) {
        setGraphlocal(response?.data?.localgraph);
        setGraphIssuer(response?.data?.issuergraph);
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
      name: "Sr No",
      label: "Sr.No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, { rowIndex }) => {
          // const currentPage = page;
          // const rowsPerPage = rowsPerPage;
          const serialNumber = currentPage==1 ? 1+rowIndex :currentPage*goPageNumber  + rowIndex -9;
          return (
            <div>{serialNumber}</div>
          );
        },
      },
      },
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
            month: "long",
            year: "numeric",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
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
      label: "Response Code",
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
              flexDirection:'column',
              height: "30vh",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "larger",
            }}
          >
            {/* <img src={NoData} alt="no" /> */}
            <svg width="125" height="149" viewBox="0 0 125 149" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34.0221 132.434C33.4829 135.11 35.5946 137.116 36.7177 137.785L42.5 135L38.0659 130.428L34.0221 132.434Z" stroke="#042879"/>
<path d="M99.5639 127.991H39.2383V82.7697H99.5007L99.5639 127.991Z" fill="white" stroke="#042879"/>
<path d="M36.044 142.467C36.044 141.397 36.4933 139.123 36.7179 137.785C33.3484 136.447 34.0223 132.434 33.3484 132.434C32.6744 132.434 27.957 133.103 27.957 135.109C27.957 137.116 34.0223 147.149 36.7179 147.818C39.4136 148.487 40.0875 147.149 39.4136 146.48C38.9371 146.007 36.044 143.805 36.044 142.467Z" stroke="#042879"/>
<path d="M57.5811 76.5178L113.357 76.5179L99.9558 82.9158L41.6568 81.8237L57.5811 76.5178Z" fill="#042879" stroke="#042879" stroke-linejoin="round"/>
<path d="M115.5 119.411L100.5 127.655V83.3368L115.5 77.2431V119.411ZM14.4997 98.6331L12.8121 103.1L10.1756 102.577C10.0889 102.161 10.0029 101.606 9.97349 101.039C9.93502 100.297 9.99938 99.6283 10.2071 99.216C10.5965 98.4431 11.0059 97.8738 11.2624 97.5621L14.4997 98.6331Z" fill="white" stroke="#042879"/>
<path d="M3.02175 110.362C4.10001 109.292 7.9638 105.011 9.76091 103.004C8.41307 99.6602 11.1087 96.9847 11.1087 96.9847C11.1087 96.9847 6.39133 94.9781 5.71741 94.9781C5.0435 94.9781 1 107.686 1 109.693C1 111.7 1.67392 111.7 3.02175 110.362Z" stroke="#042879"/>
<path d="M101.266 83.1942L115.37 76.6126L124.249 86.8481L110.62 95.8222L101.266 83.1942Z" fill="white" stroke="#042879"/>
<path d="M62.3765 98.6163C62.3765 98.6164 62.3746 98.6176 62.3708 98.6196C62.3746 98.6171 62.3764 98.6162 62.3765 98.6163ZM89.031 68.5944C93.5499 72.6858 96.6116 78.271 97.4462 82.4383L89.3677 82.4384C89.3023 82.409 89.2141 82.3529 89.0745 82.2481C89.0403 82.2224 89.0031 82.1939 88.9631 82.1633C88.8154 82.05 88.6305 81.9082 88.4208 81.7751C87.8585 81.4182 87.0924 81.1008 85.9116 81.1008C85.5466 81.1008 85.2556 81.3045 85.0431 81.5293C84.8266 81.7582 84.6326 82.0692 84.4548 82.4249C84.0976 83.1396 83.7531 84.1429 83.419 85.3324C82.7488 87.7185 82.0925 90.9573 81.4606 94.3857C81.1069 96.305 80.758 98.2996 80.4182 100.243C80.1522 101.764 79.8917 103.253 79.6387 104.65C79.0585 107.854 78.5156 110.584 78.0199 112.224C77.7986 112.956 77.2031 113.883 76.2588 114.969C75.3235 116.044 74.082 117.234 72.6231 118.49C69.7059 121.001 65.9538 123.748 62.1287 126.334C58.3054 128.92 54.4187 131.339 51.2374 133.193C49.6466 134.121 48.2348 134.906 47.0973 135.5C46.155 135.991 45.4193 136.342 44.9302 136.536C42.8879 134.483 39.3665 130.621 37.4852 128.53C43.7099 124.639 55.6284 117.175 57.2091 116.129C57.5714 115.89 57.8941 115.427 58.1828 114.906C58.4835 114.362 58.7902 113.673 59.0943 112.895C59.7031 111.337 60.319 109.375 60.8687 107.402C61.4189 105.428 61.9057 103.433 62.2553 101.803C62.4301 100.988 62.5713 100.261 62.6691 99.6726C62.765 99.095 62.8246 98.619 62.8246 98.3223C62.8246 98.2311 62.8149 98.0696 62.7206 97.9198C62.6672 97.8348 62.5858 97.753 62.4725 97.7011C62.3614 97.6502 62.2526 97.6429 62.1656 97.6521C62.0094 97.6686 61.8845 97.7418 61.8125 97.7898C61.7296 97.845 61.6485 97.9139 61.5722 97.9858C61.2749 98.2662 60.8749 98.7616 60.4186 99.3706C59.6678 100.373 58.7003 101.771 57.6654 103.266C57.4278 103.609 57.1866 103.958 56.9437 104.308C55.6371 106.19 54.2768 108.121 53.1193 109.581C52.5394 110.312 52.0213 110.91 51.5938 111.322C51.3795 111.529 51.2002 111.676 51.0574 111.769C50.9223 111.857 50.8633 111.867 50.8635 111.868C50.8635 111.868 50.865 111.868 50.868 111.868C50.646 111.868 49.9184 111.809 48.7698 111.697C47.6367 111.586 46.1252 111.427 44.3623 111.234C40.8369 110.847 36.3108 110.325 31.8055 109.782C27.2998 109.238 22.817 108.674 19.3774 108.205C17.6572 107.97 16.2009 107.759 15.1343 107.586C14.6004 107.499 14.1686 107.423 13.8518 107.359C13.693 107.327 13.568 107.299 13.4757 107.275C13.4505 107.268 13.4298 107.262 13.4129 107.257C13.4075 107.233 13.4018 107.198 13.3977 107.149C13.3815 106.955 13.403 106.663 13.4716 106.272C13.6076 105.497 13.9054 104.455 14.2936 103.297C15.0194 101.13 16.0368 98.6268 16.8062 96.859C20.2907 97.3021 25.4115 97.9099 29.9109 98.3517C32.2412 98.5804 34.4101 98.7652 36.1004 98.8591C36.9449 98.906 37.6765 98.9307 38.252 98.9262C38.8003 98.922 39.2798 98.8924 39.5685 98.7969C39.777 98.728 39.9812 98.5945 40.1692 98.4453C40.3636 98.2911 40.572 98.0946 40.7897 97.8676C41.2254 97.4133 41.7252 96.809 42.262 96.1074C43.3369 94.7025 44.5875 92.8718 45.8118 90.9863C48.2576 87.2195 50.6281 83.1882 51.3145 81.8257C51.3759 81.7039 51.4442 81.5656 51.5199 81.4122C53.1013 78.2093 57.9356 68.4183 71.2433 64.0162C78.093 61.7504 84.3128 64.3226 89.031 68.5944ZM13.4271 107.303C13.4271 107.303 13.4263 107.302 13.425 107.299C13.4265 107.302 13.4272 107.303 13.4271 107.303Z" fill="white" stroke="#042879"/>
<path d="M54 76.5C59.8406 80.7361 68.4999 90.8574 84 83.5" stroke="#042879"/>
<ellipse cx="79.1739" cy="32.7739" rx="15.5001" ry="15.3837" fill="#FFE4E5"/>
<path d="M44.3047 38.1254C44.3047 41.9091 41.2131 44.9828 37.3916 44.9828C33.57 44.9828 30.4785 41.9091 30.4785 38.1254C30.4785 34.3417 33.57 31.2679 37.3916 31.2679C41.2131 31.2679 44.3047 34.3417 44.3047 38.1254Z" stroke="#ED3237"/>
<ellipse cx="53.5654" cy="7.35744" rx="7.41307" ry="7.35744" fill="#FFE4E5"/>
<path d="M115.74 45.4826C115.74 48.1581 113.553 50.3334 110.848 50.3334C108.143 50.3334 105.957 48.1581 105.957 45.4826C105.957 42.8071 108.143 40.6317 110.848 40.6317C113.553 40.6317 115.74 42.8071 115.74 45.4826Z" stroke="#ED3237"/>
<path d="M79.08 27.704C80.136 27.704 80.9893 28.0027 81.64 28.6C82.2907 29.1973 82.616 29.9973 82.616 31C82.616 32.12 82.2693 32.952 81.576 33.496C80.8827 34.0293 79.944 34.296 78.76 34.296L78.712 35.816H77.448L77.384 33.288H77.848C78.904 33.288 79.7307 33.128 80.328 32.808C80.9253 32.488 81.224 31.8853 81.224 31C81.224 30.36 81.032 29.8533 80.648 29.48C80.264 29.1067 79.7467 28.92 79.096 28.92C78.4347 28.92 77.912 29.1013 77.528 29.464C77.1547 29.816 76.968 30.3013 76.968 30.92H75.592C75.592 30.28 75.736 29.72 76.024 29.24C76.312 28.7493 76.7173 28.3707 77.24 28.104C77.7733 27.8373 78.3867 27.704 79.08 27.704ZM78.072 39.096C77.7947 39.096 77.56 39 77.368 38.808C77.176 38.616 77.08 38.3813 77.08 38.104C77.08 37.8267 77.176 37.592 77.368 37.4C77.56 37.208 77.7947 37.112 78.072 37.112C78.3387 37.112 78.5627 37.208 78.744 37.4C78.936 37.592 79.032 37.8267 79.032 38.104C79.032 38.3813 78.936 38.616 78.744 38.808C78.5627 39 78.3387 39.096 78.072 39.096Z" fill="#042879"/>
</svg>

          <div style={{fontSize:'15px'}}> Sorry, no matching records found.</div> 
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
    // console.log("currentPage", currentPage);
    setCurrentPage(currentPage);
    // console.log("data", data);
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
// console.log('response',response)
      if (response?.data?.status == true) {
        setAtmMasterList(response?.data?.arrayList);
        settotalRecord(response?.data?.totalRecords);
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
    // console.log("data", data);
    let payload = {
      username: user?.username,
      sessionId: user?.sessionId,
      fromDate: convertDate(watch("fromDate"), 1)
        ? convertDate(watch("fromDate"), 1)
        : convertDate(new Date()),
    };
    // console.log("payload", payload);
    getTransactionList(1, payload);
    //  setpalyalodData(payload)
    //  reset(defaultFormData);
  };

    const onDownloadExcel = async (data) => {
      setIsloading(true);
      try {
        const response = await axiosGetApiData(apiList.DASHBOARD_DOWNLOAD_EXCEL,{
          responseType: 'arraybuffer'
      });
        const arrayBuffer =response.data;
        const blob = new Blob([arrayBuffer]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Acquirer Transaction${convertDate(new Date(),1)}.xlsx`;  
        // link.download = `Sample File.csv`;  
        // link.download = `${value}.xlsx`;
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
        setIsloading(false);
      } catch (err) {
        console.log(err);
      }
    };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#AA1313",
    backgroundColor: "#042879",
    fontFamily:'Poppins',
    boxShadow:' 0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
    fontSize:'15px',
    
    // border: "1px solid #CCC",
    border:'none',
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "110px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));


  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' });
  const year = today.getFullYear();
  
  const TodaysDate = `${day}-${month}-${year}`;
  
  console.log(TodaysDate); // Output: 16-Apr-2024

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.Sbox}>
        <div className={classes.heading}>Overview</div>
        <div className={classes.DashboardContainer}>
          <div style={{ flex: 1 }}>
            <div className={classes.boxs}>
              {/* {CardList.map((card, index) => {
                return <DashboarCard card={card} index={index} />;
              })} */}
              <DashboarCards/>
            </div>

            <div className={classes.MiddleContent}>
              {/* <Box
                className={classes.mainContainer}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "20px 0 10px 0" }}
              >
                <div className={classes.Sbox}>
                  <div className={classes.bluerow}>Bank Name</div>
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
                               Bank Name
                              <sup className={classes.required}>*</sup> 
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

                        <Grid item xs={2} sm={6} md={4}>
                      <div className={classes.gridimage}>
                        {" "}
                        <img src={refresh} alt="headerLogo" />
                      </div>
                    </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Box> */}

              {/* {watch("bankcode") ? (
                <div className={classes.boxs}>
                  {CardMiddleList.map((card, index) => {
                    return <DashboardMiddleCard card={card} index={index} />;
                  })}
                </div>
              ) : (
                ""
              )} */}
              

              <div className={classes.BottomContainer}>
              <div className={classes.BottomContainerDownload}>
                  <div >
                  <div className={classes.heading} style={{marginLeft:'10px'}}>Transaction Summary
          <span className={classes.heading}  >  ({TodaysDate})</span></div>
                  </div>
                  <div style={{marginRight:'5px'}}>
                  <ColorButton1 variant="contained" type="submit" onClick={()=>onDownloadExcel()}>
                   XLSX<span style={{marginLeft:'5px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M14 9.5V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V9.5C2 9.36739 2.05268 9.24021 2.14645 9.14645C2.24021 9.05268 2.36739 9 2.5 9C2.63261 9 2.75979 9.05268 2.85355 9.14645C2.94732 9.24021 3 9.36739 3 9.5V13H13V9.5C13 9.36739 13.0527 9.24021 13.1464 9.14645C13.2402 9.05268 13.3674 9 13.5 9C13.6326 9 13.7598 9.05268 13.8536 9.14645C13.9473 9.24021 14 9.36739 14 9.5ZM7.64625 9.85375C7.69269 9.90024 7.74783 9.93712 7.80853 9.96228C7.86923 9.98744 7.93429 10.0004 8 10.0004C8.06571 10.0004 8.13077 9.98744 8.19147 9.96228C8.25217 9.93712 8.30731 9.90024 8.35375 9.85375L10.8538 7.35375C10.9002 7.3073 10.9371 7.25214 10.9622 7.19145C10.9873 7.13075 11.0003 7.0657 11.0003 7C11.0003 6.9343 10.9873 6.86925 10.9622 6.80855C10.9371 6.74786 10.9002 6.6927 10.8538 6.64625C10.8073 6.59979 10.7521 6.56294 10.6914 6.5378C10.6308 6.51266 10.5657 6.49972 10.5 6.49972C10.4343 6.49972 10.3692 6.51266 10.3086 6.5378C10.2479 6.56294 10.1927 6.59979 10.1462 6.64625L8.5 8.29313V2.5C8.5 2.36739 8.44732 2.24021 8.35355 2.14645C8.25979 2.05268 8.13261 2 8 2C7.86739 2 7.74021 2.05268 7.64645 2.14645C7.55268 2.24021 7.5 2.36739 7.5 2.5V8.29313L5.85375 6.64625C5.75993 6.55243 5.63268 6.49972 5.5 6.49972C5.36732 6.49972 5.24007 6.55243 5.14625 6.64625C5.05243 6.74007 4.99972 6.86732 4.99972 7C4.99972 7.13268 5.05243 7.25993 5.14625 7.35375L7.64625 9.85375Z" fill="white"/>
</svg>
                    </span>
                  </ColorButton1>
                  </div>
                </div>
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

                          maxDate:new Date()
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
