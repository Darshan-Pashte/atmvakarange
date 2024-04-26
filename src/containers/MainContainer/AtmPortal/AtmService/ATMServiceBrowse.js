import classes from "../Airtel.module.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
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
import { useSelector } from "react-redux";
import ATMMasterListView from "../../../../components/common/ATMMasterListView";
import EditsIcons from "../../../../components/common/EditIcon";
import ATMServiceModal from "./AtmServiceModal";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchAtmIDModal from "../../../../components/common/SearchAtmIDModal";

import SearchIcon from '@mui/icons-material/Search';
import Textfield from "../../../../components/common/textField";


const defaultFormData = {
  bankcode: "",
  atmid: "",
  companyId: "",
};

const ATMServiceBrowse = () => {
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

  const [isLoading, setIsloading] = useState(false);

  const url = "/atmmaster/modify";
  const url1 = "/atmmaster";
  const location = useLocation();


  const currentPath = location.pathname;
  const topLevelPath = "/" + currentPath.split("/")[1];

  const [atmMasterList, setAtmMasterList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowDataToDisplay, setRowDataToDisplay] = useState({});
  const [tableHeaders, setTableHeaders] = useState([]);


  const [bankcode, setBankCode] = useState([]);
  const [atmID, setAtmID] = useState([]);

  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);


  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const [payloadData, setPayloadData] = useState({});
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // console.log("user", user);


  const [resData, setResData] = useState({});
  // console.log("resData", resData);

  useEffect(() => {
    setValue("atmid", resData?.atmId);

  }, [resData]);
  // useEffect(() => {
  //   if (AtmIdList) {
  //     setValue("atmid", AtmIdList ? compareTextAndReturnObject(AtmIdList, AtmIdList[0]?.value) : '')
  //   }
  // }, []);

  // useEffect(() => {
  //   if (BankCodeList) {
  //     setValue("bankcode", BankCodeList ? compareTextAndReturnObject(BankCodeList, BankCodeList[0]?.value) : '')
  //   }
  // }, []);



 
 

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/auth/login");
  };

  const create = () => {
    navigate("/company/accountadd");
  };

 
// useEffect(()=>{
//   if(watch("atmid") !== undefined)
// onSubmit()
// },[])


// const openModal = (rowData) => {
//   // const headers = columns.map((column) => column.label);
//   const headers = columns?.filter((column) => column?.label !== "View" && column?.label !== "Modify").map((column) => column?.label);
//   setTableHeaders(headers);
//   setRowDataToDisplay({
//       headers: headers,
//       rowData: rowData,
//   });
//   setIsModalOpen(true);
// };
// const closeModal = () => {
//   setIsModalOpen(true);
// };
// const closeSignModal = () => {
//   setIsModalOpen(false);
// };


const openModal = (rowData,apipath,titletext) => {
  // const headers = columns.map((column) => column.label);
  const headers = columns?.filter((column) => column?.label !== "View" && column?.label !== "Modify" && column?.label !== "Sr.No").map((column) => column?.label);
  setTableHeaders(headers);
  setRowDataToDisplay({
      headers: headers,
      rowData: rowData,
      apipath:apipath,
      titletext:titletext
  });
  setIsModalOpen(true);
};


const closeModal = () => {
     setIsModalOpen(false);
   }
   
   
  // const handleNavigate = (rowData) => {
  //   navigate("/atmmaster/modify", { state: rowData });
  // };

  const handleNavigate = (route, rowData) => {
    navigate(route, { state: rowData })
}


  const columns = [
  
    // {
    //   name: "View",
    //   label: "View",
    //   options: {
    //     filter: true,
    //     sort: false,
  
    //       customBodyRender: (value, { rowData }, tableMeta ) => {
    //         const additionalProp = 'outofservice'; 
    //         return (
    //           <Button
    //             sx={{
    //               color: "black",
    //               minWidth: "100%",
    //               padding: "5px 5px !important",
    //             }}
              
    //             onClick={() => openModal(rowData,additionalProp )}
    //           >
    //             {" "}
    //             <VisibilityIcon />
    //           </Button>
    //         );
    //       },
    //   },
    // },



  //   {
  //     name: "Modify",
  //     label: "Modify",
  //     options: {
  //         filter: true,
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
    name: "atmId",
    label: "ATM ID",
    options: {
      filter: true,
      sort: false,
      display:true
    },
  },
    {
      name: "atmstatus",
      label: "ATM Status",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "Out of Service",
      label: "Out of Service",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'outofservice'; 
          const titletext='Out of Service'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
  <path d="M15.9018 10.6879H16.1202L17.8654 11.7024C18.5466 11.4629 19.1782 11.0919 19.7269 10.6091L19.7356 8.56757C19.7727 8.50406 19.8093 8.43941 19.8448 8.3742L21.584 7.34778C21.7211 6.62775 21.7211 5.88682 21.584 5.16679L19.8443 4.13811C19.8104 4.07233 19.7738 4.00825 19.735 3.94473L19.7285 1.90325C19.179 1.42185 18.5469 1.05245 17.8654 0.814453L16.1175 1.82896H15.899L14.1512 0.814453C13.4695 1.05367 12.8376 1.42443 12.2886 1.90722L12.2798 3.9487C12.2427 4.01222 12.2061 4.07686 12.1706 4.14208L10.4315 5.16849M5.70272 14.364C5.29054 13.5895 5.11952 12.7016 5.21317 11.8221C5.30682 10.9427 5.66055 10.115 6.22572 9.45274C6.79089 8.7905 7.53976 8.32626 8.36939 8.12384C9.19902 7.92142 10.0687 7.99077 10.8588 8.32233L8.28076 11.223L8.64555 12.9855L10.3432 13.3643L13.1371 10.6877C13.4565 11.508 13.5233 12.4109 13.3283 13.2723C13.1334 14.1336 12.6862 14.9111 12.0483 15.4978C11.4105 16.0846 10.6132 16.4518 9.76613 16.5491C8.91906 16.6463 8.06378 16.4688 7.31786 16.0408L3.70474 20.3902C3.41415 20.6919 3.02003 20.8614 2.60908 20.8614C2.19812 20.8614 1.804 20.6919 1.51341 20.3902C1.22282 20.0885 1.05957 19.6793 1.05957 19.2527C1.05957 18.826 1.22282 18.4168 1.51341 18.1151L5.70272 14.364ZM18.1932 6.25842C18.1932 7.51118 17.215 8.52674 16.0084 8.52674C14.8017 8.52674 13.8235 7.51118 13.8235 6.25842C13.8235 5.00566 14.8017 3.9901 16.0084 3.9901C17.215 3.9901 18.1932 5.00566 18.1932 6.25842Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              {/* <AddBoxOutlinedIcon /> */}
            </Button>
          );
        },
      },
    },
    {
      name: "Config Data",
      label: "Config Data",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'configdataservice'; 
          const titletext='Config Data'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14.25 3V8.25H19.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 21H18.75C18.9489 21 19.1397 20.921 19.2803 20.7803C19.421 20.6397 19.5 20.4489 19.5 20.25V8.25L14.25 3H5.25C5.05109 3 4.86032 3.07902 4.71967 3.21967C4.57902 3.36032 4.5 3.55109 4.5 3.75V12M9.50911 18.6198C9.50911 19.5403 8.76292 20.2865 7.84245 20.2865C6.92197 20.2865 6.17578 19.5403 6.17578 18.6198C6.17578 17.6993 6.92197 16.9531 7.84245 16.9531C8.76292 16.9531 9.50911 17.6993 9.50911 18.6198ZM7.92779 21.8737C7.87196 21.8737 7.81571 21.8737 7.76113 21.8737L6.42571 22.6191C5.90585 22.4443 5.42366 22.1729 5.00446 21.8191L4.99946 20.3191C4.96988 20.2725 4.94196 20.2254 4.91613 20.1771L3.58821 19.4208C3.48362 18.8918 3.48362 18.3474 3.58821 17.8183L4.91488 17.0641C4.94196 17.0162 4.96988 16.9687 4.99821 16.9221L5.00488 15.4221C5.4237 15.0673 5.90576 14.7949 6.42571 14.6191L7.75904 15.3646C7.81488 15.3646 7.87113 15.3646 7.92571 15.3646L9.25904 14.6191C9.77891 14.794 10.2611 15.0654 10.6803 15.4191L10.6853 16.9191C10.7149 16.9658 10.7428 17.0129 10.7686 17.0612L12.0957 17.8171C12.2003 18.3461 12.2003 18.8905 12.0957 19.4196L10.769 20.1737C10.742 20.2216 10.714 20.2691 10.6857 20.3158L10.679 21.8158C10.2605 22.1706 9.77873 22.4432 9.25904 22.6191L7.92779 21.8737Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "Enhance Config",
      label: "Enhance Config",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'enhanceconfigdataservice'; 
          const titletext='Enhance Config'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19.5833 14.75C19.5833 16.2688 17.3261 17.5 14.5417 17.5C11.7572 17.5 9.5 16.2688 9.5 14.75M19.5833 14.75C19.5833 13.2312 17.3261 12 14.5417 12C11.7572 12 9.5 13.2312 9.5 14.75M19.5833 14.75L19.5833 17.5M9.5 14.75V17.5M9.5 17.5C9.5 19.0188 11.7573 20.25 14.5417 20.25C17.326 20.25 19.5833 19.0188 19.5833 17.5M9.5 17.5V20.25C9.5 21.7688 11.7573 23 14.5417 23C17.326 23 19.5833 21.7688 19.5833 20.25V17.5M8.49568 11H6.99568C6.49941 10.9994 6.00894 10.8932 5.55681 10.6886C5.10469 10.484 4.70126 10.1855 4.37328 9.81308C4.0453 9.44063 3.80028 9.00269 3.65447 8.52831C3.50866 8.05394 3.4654 7.55398 3.52756 7.06162C3.58972 6.56925 3.75588 6.09573 4.01501 5.67248C4.27414 5.24923 4.62032 4.88592 5.03057 4.60667C5.44083 4.32742 5.90577 4.13861 6.39457 4.05276C6.88336 3.96692 7.38483 3.986 7.86568 4.10875M7.49561 6C7.49561 5.20774 7.68387 4.42682 8.04489 3.7216C8.40591 3.01637 8.92934 2.40703 9.57205 1.94379C10.2148 1.48055 10.9584 1.17667 11.7416 1.05719C12.5248 0.937706 13.3251 1.00605 14.0767 1.25658C14.8283 1.50712 15.5097 1.93267 16.0645 2.49817C16.6194 3.06368 17.0319 3.75294 17.2682 4.50916C17.5044 5.26539 17.5575 6.06692 17.4232 6.84771C17.2889 7.6285 16.971 8.36619 16.4956 9M9.99561 7L11.9956 5M11.9956 5L13.9956 7M11.9956 5V10" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "Fit Data",
      label: "Fit Data",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'fitdataservice'; 
          const titletext='Fit Data'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 12C16.5563 12 20.25 9.98528 20.25 7.5C20.25 5.01472 16.5563 3 12 3C7.44365 3 3.75 5.01472 3.75 7.5C3.75 9.98528 7.44365 12 12 12Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.75 7.5V12C3.75 14.4853 7.44375 16.5 12 16.5C16.5562 16.5 20.25 14.4853 20.25 12V7.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.75 12V16.5C3.75 18.9853 7.44375 21 12 21C16.5562 21 20.25 18.9853 20.25 16.5V12" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "type2count",
      label: "Offus fit Data",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'offusdataservice'; 
          const titletext='Offus Fit Data'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3.15012 13.6406C2.75961 11.5328 3.1343 9.35478 4.20675 7.49862C5.27919 5.64246 6.97897 4.23005 9.00012 3.51562V10.2656L3.15012 13.6406Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.9999 12.0394V3C13.5767 3.00024 15.1258 3.41475 16.492 4.20202C17.8583 4.9893 18.9937 6.12171 19.7846 7.48585C20.5755 8.84999 20.9941 10.398 20.9985 11.9748M12.0503 20.9999C10.4735 21.0089 8.92196 20.6036 7.55111 19.8243C6.18026 19.0451 5.03818 17.9195 4.23926 16.56L19.7943 7.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.3335 20.6669C19.1745 20.6669 20.6669 19.1745 20.6669 17.3335C20.6669 15.4924 19.1745 14 17.3335 14C15.4924 14 14 15.4924 14 17.3335C14 19.1745 15.4924 20.6669 17.3335 20.6669Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.6909 19.6904L22.0006 22.0001" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "Screen Data",
      label: "Screen Data",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'screendataservice'; 
          const titletext='Screen Data'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15 17.25L18 21M9 17.25L6 21M12 4.5V2.25M14.6998 8.30078L9.2998 13.7008M3.75 4.5H20.25C20.6642 4.5 21 4.83579 21 5.25V16.5C21 16.9142 20.6642 17.25 20.25 17.25H3.75C3.33579 17.25 3 16.9142 3 16.5V5.25C3 4.83579 3.33579 4.5 3.75 4.5ZM11.1 9.05C11.1 9.6299 10.6299 10.1 10.05 10.1C9.4701 10.1 9 9.6299 9 9.05C9 8.4701 9.4701 8 10.05 8C10.6299 8 11.1 8.4701 11.1 9.05ZM15.0004 12.9504C15.0004 13.5303 14.5303 14.0004 13.9504 14.0004C13.3705 14.0004 12.9004 13.5303 12.9004 12.9504C12.9004 12.3705 13.3705 11.9004 13.9504 11.9004C14.5303 11.9004 15.0004 12.3705 15.0004 12.9504Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "Terminal Data",
      label: "Terminal Data",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'termdataservice'; 
          const titletext='Terminal Data'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7.5 9L11.25 12L7.5 15" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.75 15H16.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "State Data",
      label: "State Data",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'statedataservice'; 
          const titletext='State Data'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4.5 19.5V12.75H9" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 19.5H3" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 19.5V8.25H14.25" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.25 19.5V3.75H19.5V19.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },

   
   
    {
      name: "Key Download",
      label: "Key Download",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'loadkeyservice'; 
          const titletext='Key Download'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.73469 11.5152C8.15538 10.0719 8.09226 8.47278 8.55601 6.98827C9.01976 5.50375 9.98192 4.22492 11.2798 3.368C12.5777 2.51107 14.1317 2.12863 15.6791 2.28534C17.2264 2.44204 18.6722 3.12828 19.7719 4.22802C20.8717 5.32776 21.5579 6.77352 21.7146 8.32087C21.8713 9.86823 21.4889 11.4222 20.6319 12.7201C19.775 14.018 18.4962 14.9802 17.0117 15.4439C15.5272 15.9077 13.928 15.8446 12.4847 15.2652L11.25 16.4999H9V18.7499H6.75V20.9999H3V17.2499L8.73469 11.5152Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.2537 8.25 16.875 8.25Z" fill="black"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "Supply Counter",
      label: "Supply Counter",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'supplycounterservice'; 
          const titletext='Supply Counter'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 12.1024V21.7474M12 12.1024L3.06563 7.2115M12 12.1024L20.9344 7.2115M7.64625 4.52931L16.5 9.37525V14.2503M20.61 17.1415L12.36 21.6584C12.2496 21.7188 12.1258 21.7504 12 21.7504C11.8742 21.7504 11.7504 21.7188 11.64 21.6584L3.39 17.1415C3.2722 17.077 3.17386 16.9821 3.10526 16.8667C3.03666 16.7513 3.0003 16.6195 3 16.4853V7.51713C3.0003 7.38284 3.03666 7.25111 3.10526 7.13567C3.17386 7.02023 3.2722 6.92533 3.39 6.86088L11.64 2.344C11.7504 2.28361 11.8742 2.25195 12 2.25195C12.1258 2.25195 12.2496 2.28361 12.36 2.344L20.61 6.86088C20.7278 6.92533 20.8261 7.02023 20.8947 7.13567C20.9633 7.25111 20.9997 7.38284 21 7.51713V16.4834C21 16.618 20.9638 16.7501 20.8952 16.8659C20.8266 16.9817 20.7281 17.0769 20.61 17.1415Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
    {
      name: "Inservice",
      label: "Inservice",
      options: {
        filter: true,
        sort: false,
        display:true,
        customBodyRender: (value, { rowData }, tableMeta ) => {
          const apipath = 'inservice'; 
          const titletext='Inservice'
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
            
              onClick={() => openModal(rowData,apipath,titletext )}
            >
              {" "}
              {/* <AddBoxOutlinedIcon /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.2702 6.89562C12.1708 7.79483 12.3523 8.70275 12.7899 9.49459L9.22388 12.7565C8.42535 12.3313 7.51471 12.1638 6.61715 12.2772C5.7196 12.3906 4.87919 12.7792 4.21146 13.3896C3.54373 14 3.08146 14.8022 2.8882 15.686C2.69493 16.5698 2.78015 17.4918 3.13216 18.3252L6.05522 15.5427L7.86315 15.9019L8.27834 17.6978L5.588 20.7059C6.43193 21.0319 7.3561 21.0884 8.23347 20.8678C9.11084 20.6472 9.89834 20.1602 10.4877 19.4739C11.0771 18.7875 11.4394 17.9354 11.5248 17.0348C11.6103 16.1341 11.4147 15.2291 10.9649 14.4442L14.5044 11.2091C15.2963 11.6467 16.2042 11.8282 17.1034 11.7288C18.0026 11.6294 18.849 11.2539 19.5261 10.654C20.2032 10.054 20.6779 9.25903 20.8849 8.37834C21.0918 7.49765 21.0209 6.57447 20.6819 5.7357L17.716 8.47243L15.9138 8.08518L15.5266 6.28305L18.2633 3.31713C17.4246 2.97811 16.5014 2.90721 15.6207 3.11417C14.74 3.32114 13.945 3.79582 13.3451 4.47295C12.7451 5.15008 12.3696 5.99642 12.2702 6.89562Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </Button>
          );
        },
      },
    },
 
   
  
 
  ];

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
        
          onPageChange={(page ) => {
            getTransactionListView(page)
          }}
        />
      );
    },
  };



  const BankcodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));
  BankcodeList && BankcodeList?.unshift({ "code": "all", "value": "ALL" });
  
  
  const AtmIDList=atmID && atmID?.map((item)=>({"code":item.atmId,'value':item.atmId}));

  AtmIDList && AtmIDList?.unshift({ "code": "all", "value": "ALL" });


//  console.log('BankcodeList',BankcodeList)


  // const BankCodeList = [
  //   {
  //     code: "all",
  //     value: "ALL",
  //   },
  //   ...BankcodeList,
  // ];

  // useEffect(() => {
  //   if (BankCodeList) {
  //     setValue("bankcode", BankCodeList ? compareTextAndReturnObject(BankCodeList, BankCodeList[0]?.value) : '')
  //   }
  // }, [BankCodeList]);

  // console.log('Type of AtmIDList',typeof (AtmIDList));  

  // const ATMIDList = [
  //   {
  //     code: "all",
  //     value: "ALL",
  //   },
    
  //   ...AtmIDList,
  // ];


  // useEffect(() => {
  //   if (ATMIDList) {
  //     setValue("atmid", ATMIDList ? compareTextAndReturnObject(ATMIDList, ATMIDList[0]?.value) : '')
  //   }
  // }, [ATMIDList]);

  // useEffect(()=>{
  //   getBankCode()
  //   // getATMid()
  // },[])

  // useEffect(()=>{
  //   if (watch('bankcode')) {
  //     getATMid()
  //       }
    
  // },[watch('bankcode')])
  
  // const getBankCode = async () => {
  //   setIsloading(true);
  //   try {
  //     const payload = {
        
  //       username: user?.username,
  //       sessionId: user?.sessionId,
  //     };
  //     const response = await postApiData(apiList.GET_BANKCODE, payload);
  //     setBankCode(response?.bankCodes);
  //     setIsloading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const getATMid = async () => {
  //    setIsloading(true);
  //   try {
  //     const payload = {
        
  //       username: user?.username,
  //       sessionId: user?.sessionId,
  //       bankcd:watch('bankcode')?.code

  //     };
  //     const response = await postApiData(apiList.GET_ATMID, payload);
  //     setAtmID(response?.atmMasterModels);
  //     setIsloading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  
  // useEffect(()=>{
  //   getTransactionListView()
  //   onSubmit()
  // },[])

  const getTransactionListView = async (currentPage,data = payloadData) => {
    // console.log('currentPage',currentPage);
    setCurrentPage(currentPage)
    // console.log('data',data)
    setIsloading(true);
    try {
      const payload = {
        username:user?.username,
        sessionId: user?.sessionId,
        atmId: data.atmid,
        // bankcd: data.bankcd,
       
      };

      const response = await postApiData(
        apiList.ATM_SERVICE_BROWSE + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response?.data?.status == true) {
        setAtmMasterList(response?.data?.atmMasterNewsLst);
        settotalRecord(response?.data?.totalRecords);
        //             setIsloading(false);
        // settotalRecord(response.data.totalRecords)
      } else {
        setAtmMasterList([])
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
  }

  const onSubmit = (data) => {
    // console.log("data",data);
    let payload = {
      username: user?.username,
      sessionId: user?.sessionId,
      atmid: data?.atmid,
      // bankcd: data?.bankcode?.code,
      // transtype: data.transtype ? data.transtype.code :"all",
    };
    // console.log("payload",payload);
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }
  // const onSubmit = async (data) => {
  //   try {
  //     setIsloading(true);
  //     const payload = {
  //       username: user?.username,
  //       sessionId: user?.sessionId,
       
  //       atmid: data?.atmid?.code,
  //       bankcd: data?.bankcode?.code,
  //     };
  //     const response = await postApiData(apiList.ATM_MASTER_BROWSE, payload);
  //     if (response?.status == true) {
  //       setAtmMasterList(response.atmMasterList);
  //       setIsloading(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setIsloading(false);
  //   }
  // };

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
  // const FinalBankCodeList = [...BankcodeList, AtmIdList]
  // const FinalAtmIDList = [...AtmIDList, AtmIdList]

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <Box
        className={classes.mainContainer}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>
            <div className={classes.bluerowtext}>ATM Service</div>
            {/* <div>
              <ColorButton1
                onClick={() => navigate("/atmmaster/create")}
                variant="contained"
              >
                Create
              </ColorButton1>
            </div> */}
          </div>
          <div>
            <div className={classes.formbox}>
              <Grid container columnSpacing={2} rowSpacing={2}>

              {/* <Grid item xs={12} sm={5} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Code
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "bankcode",
                        }}
                        TextFieldProps={{
                          placeholder: "Select Bank Code",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[a-zA-Z0-9 \s]*$/;
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
                        // data={FinalBankCodeList}
                        data={BankcodeList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid> */}


                <Grid item xs={12} sm={5} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ATM ID
                      <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                    <Controller
                      name="atmid" // The name should match the key in 'data' object in onSubmit
                      control={control}
                      defaultValue="" // Set an initial value if needed
                      // rules={{
                      //   required:
                      //     "ATM ID " +
                      //     errorMessages.error_autocomplete_message,
                      //     // pattern: {
            
                      //     //   value: /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\d).{8,}$/, // Password should have alteast 2 special character and 1 Uppercase amd 1 digit   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      //     //   message: "2 special character,1 Uppercase,1 digit",
                      //     // },
                      // }}
                      render={({ field, fieldState }) => {
                        const handleInputChange = (event) => {
                          const regex = /^[A-Z0-9]+$/;
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
                          <Textfield
                            id="standard-adornment-password"
                            fullWidth="true"
                            placeholder="ATM ID"
                            // type={showPassword ? "text" : "password"}
                            {...field} // Spread the 'field' props to bind it to the form's state
                            sx={{
                              "& fieldset": { border: "none" },
                              ".MuiInputBase-root": {
                                borderRadius: "6px",
                                
                                height: "34px",
                                //   backgroundColor: "rgb(238, 239, 247)",
                                backgroundColor: "#FFF",
                                fontSize: "13px",

                                color: "#888",
                                fontWeight: "500",
                                border: "1px solid",
                                marginTop:'4px'
                                //   width:'130%'
                              },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                  >
                                   <SearchIcon onClick={() => handleOpenSearch()}/>
                                  </IconButton>
                                </InputAdornment> 
                              ),
                              inputProps : {maxLength: 10}
                            }}
                            // error={!!fieldState.error}
                            // helperText={fieldState.error?.message}
               
                          />
                        );
                      }}
                    />
                    </div>
                  </div>
                </Grid>

                {/* <Grid item xs={12} sm={5} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>ATM ID
                    <sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmid",
                        }}
                        TextFieldProps={{
                          placeholder: "Select ATM ID",
                          onKeyDown: (event) => {
                            //const regex = /^[a-zA-Z]*$/;
                            const regex = /^[a-zA-Z0-9 \s]*$/;
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
                        // data={FinalAtmIDList}
                        data={AtmIDList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid> */}

                {/* <Grid
                  item
                  xs={12}
                  sm={2}
                  md={1}
                  style={{ paddingTop: "42px" }}
                ></Grid>  */}
           
           <Grid item xs={12} sm={3} md={3} style={{ paddingTop: "37px" }}>
                  <ColorButton1 variant="contained" type="submit">
                    Submit
                  </ColorButton1>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.parentcomp}>
            <div className={classes.Sbox2}>
              {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
              <div style={{ width: "100%" ,marginBottom:'10px'}}>
                <MUIDataTable
                  title={" ATM Service Browse List"}
                  data={atmMasterList}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {/* {isModalOpen ? (
              <ATMMasterListView
                open={isModalOpen}
                handleClose={closeModal}
                closeSignModal={closeSignModal}
                rowDataToDisplay={rowDataToDisplay}
                show={"2"}
                title={"ATM Service Browse List"}
              />
            ) : null} */}


{isModalOpen ? (
              <ATMServiceModal
                open={isModalOpen}
                handleClose={closeModal}
                // closeSignModal={closeSignModal}
                rowDataToDisplay={rowDataToDisplay}
                // additionalProp={additionalProp}
                show={"2"}
                title={"ATM Service Browse List"}
              />
            ) : null}
            

            {openSearch ? (
              <SearchAtmIDModal
                open={openSearch}
                handleClose={handleCloseSearch}
                setResData={setResData}
                rowDataToDisplay={rowDataToDisplay}
                show={"2"}
                title={"Bank ATM SMS Master Browse List"}
              />
            ) : null}
          </div>
        </div>
      </Box>
    </>
  );
};

export default ATMServiceBrowse;
