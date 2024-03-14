import classes from "../Airtel.module.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useSelector } from "react-redux";
import ATMMasterListView from "../../../../components/common/ATMMasterListView";
import EditsIcons from "../../../../components/common/EditIcon";
// import ATMServiceModal from "./AtmServiceModal";
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultFormData = {
  bankcode: "",
  atmid: "",
  companyId: "",
};

const ATMHealthBrowse = () => {
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


  const [payloadData, setPayloadData] = useState({});
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log("user", user);


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
  const headers = columns?.filter((column) => column?.label !== "View" && column?.label !== "Modify").map((column) => column?.label);
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
    name: "atmid",
    label: "ATM ID",
    options: {
      filter: true,
      sort: false,
     
    },
  },
    {
      name: "paperStatus",
      label: " Receipt Paper Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: 'black',
         
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
    },
},
    {
      name: "ribbonStatus",
      label: "Receipt Ribbon Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "printHeadStatus",
      label: "Receipt Print Head Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "knifeStatus",
      label: "Receipt Knife Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "receipt",
      label: "Receipt Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "journal",
      label: "Journal Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "jnlPaper",
      label: "Journal Paper Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "jnlRibbon",
      label: "Journal Ribbon Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "jnlPrintHead",
      label: "Journal PrintHead Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "jnlKnife",
      label: "Journal Knife Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "cardReader",
      label: "Card Reader Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            // Conditionally set the text color and background color
            const buttonStyles = {
            //   color: value === 'N' ? 'yellow' : 'black',
              backgroundColor: value === 'N' ? 'yellow' : value === 'W' ? 'orange' : value === 'F' ? 'Red' : 'white',
              minWidth: "100%",
              padding: "5px",
              borderRadius:'20px',
              textAlign:'center'
            };
      
            return (
              <div style={buttonStyles}>
                {value}
              </div>
            );
          },
      },
    },
    {
      name: "typedenom1",
      label: "Box1 Denom",
      options: {
        filter: true,
        sort: false,
        
      },
    },
    {
      name: "typedenom2",
      label: "Box2 Denom",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "typedenom3",
      label: "Box3 Denom",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "typedenom4",
      label: "Box4 Denom",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "type1count",
      label: "Box1 Count",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "type2count",
      label: "Box2 Count",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "type3count",
      label: "Box3 Count",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "type4count",
      label: "Box4 Count",
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
            // lineHeight: "1.5",
            border:'1px solid grey'
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            // Adjust the space between rows by adding margin or padding
            marginBottom: "10px", // Adjust the value as needed
          },
        },
      },
    //   MuiTypography: {
    //     styleOverrides: {
    //       root: {
    //         lineHeight: "3.5", // Adjust the line height as needed
    //       },
    //     },
    //   },
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
        
          onPageChange={(page ) => {
            getTransactionListView(page)
          }}
        />
      );
    },
  };


  useEffect(()=>{
    // getTransactionListView()
    onSubmit()
  },[])

  const getTransactionListView = async (currentPage,data = payloadData) => {
    console.log('currentPage',currentPage);
    setCurrentPage(currentPage)
    console.log('data',data)
    setIsloading(true);
    try {
      const payload = {
        username:user?.username,
        sessionId: user?.sessionId,
      
       
      };

      const response = await postApiData(
        apiList.ATM_HEALTH_BROWSE + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response.status == true) {
        setAtmMasterList(response.atmHealthModels);
        settotalRecord(response.totalRecords);
        //             setIsloading(false);
        // settotalRecord(response.data.totalRecords)
      } else {
        
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
    console.log("data",data);
    let payload = {
      username: user?.username,
      sessionId: user?.sessionId,
    };
    console.log("payload",payload);
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }
 



  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <div className={classes.parentcomp}>
            <div className={classes.Sbox2}>
              {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
              <div style={{ width: "100%" ,marginBottom:'10px'}}>
              <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={" ATM Health Browse List"}
                  data={atmMasterList}
                  columns={columns}
                  options={options}
                />
                  </ThemeProvider>
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


{/* {isModalOpen ? (
              <ATMServiceModal
                open={isModalOpen}
                handleClose={closeModal}
                // closeSignModal={closeSignModal}
                rowDataToDisplay={rowDataToDisplay}
                // additionalProp={additionalProp}
                show={"2"}
                title={"ATM Service Browse List"}
              />
            ) : null} */}
            
          </div>
    </>
  );
};

export default ATMHealthBrowse;
