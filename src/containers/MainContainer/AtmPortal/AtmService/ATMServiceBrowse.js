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
import ATMServiceModal from "./AtmServiceModal";
import EditIcon from '@mui/icons-material/Edit';


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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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
              <EditIcon />
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



  const BankcodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));
  BankcodeList && BankcodeList?.unshift({ "code": "all", "value": "ALL" });
  
  
  const AtmIDList=atmID && atmID?.map((item)=>({"code":item.atmId,'value':item.atmId}));

  AtmIDList && AtmIDList?.unshift({ "code": "all", "value": "ALL" });


 console.log('BankcodeList',BankcodeList)


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

  console.log('Type of AtmIDList',typeof (AtmIDList));  

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

  useEffect(()=>{
    getBankCode()
    // getATMid()
  },[])

  useEffect(()=>{
    if (watch('bankcode')) {
      getATMid()
        }
    
  },[watch('bankcode')])
  
  const getBankCode = async () => {
    setIsloading(true);
    try {
      const payload = {
        
        username: user?.username,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.GET_BANKCODE, payload);
      setBankCode(response?.bankCodes);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getATMid = async () => {
     setIsloading(true);
    try {
      const payload = {
        
        username: user?.username,
        sessionId: user?.sessionId,
        bankcd:watch('bankcode')?.code

      };
      const response = await postApiData(apiList.GET_ATMID, payload);
      setAtmID(response?.atmMasterModels);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };


  
  // useEffect(()=>{
  //   getTransactionListView()
  //   onSubmit()
  // },[])

  const getTransactionListView = async (currentPage,data = payloadData) => {
    console.log('currentPage',currentPage);
    setCurrentPage(currentPage)
    console.log('data',data)
    setIsloading(true);
    try {
      const payload = {
        username:user?.username,
        sessionId: user?.sessionId,
        atmId: data.atmid,
        bankcd: data.bankcd,
       
      };

      const response = await postApiData(
        apiList.ATM_SERVICE_BROWSE + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response.status == true) {
        setAtmMasterList(response.atmMasterNewsLst);
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
      atmid: data?.atmid?.code,
      bankcd: data?.bankcode?.code,
      // transtype: data.transtype ? data.transtype.code :"all",
    };
    console.log("payload",payload);
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
    color: "#000000",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    backgroundColor: "#fff",
    border: "1px solid #000",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "140px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

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

              <Grid item xs={12} sm={5} md={4}>
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
                </Grid>

                <Grid item xs={12} sm={5} md={4}>
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
                </Grid>

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
            
          </div>
        </div>
      </Box>
    </>
  );
};

export default ATMServiceBrowse;
