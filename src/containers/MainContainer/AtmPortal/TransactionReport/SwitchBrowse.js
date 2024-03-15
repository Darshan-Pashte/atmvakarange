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
import OnlyView from "../../../../components/common/OnlyView";


const defaultFormData = {
  toacc:'',
  fromacc:'',
  cardreadmode:'',
  binmode:'',
  status:'',
  transno:'',
  transtype:'',
  cardno:'',
  cardbin:'',
  atmid:'',
  bankcode:'',
  toDate:null,
  fromDate:null,
 
};

const SwitchBrowse = () => {
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
  const [cardlist, setCardList] = useState([]);

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
      code: "all",
      value: "ALL",
    },
    {
      code: "S",
      value: "Suspect",
    },
    {
      code: "C",
      value: "Complete",
    },
    {
      code: "F",
      value: "FAIL",
    },
    {
      code: "R",
      value: "Reversal",
    },
  ];


  const BinModeList = [
    {
      code: "all",
      value: "ALL",
    },
    {
      code: "local",
      value: "Local",
    },
    {
      code: "other",
      value: "Other",
    },
    {
      code: "nun",
      value: "Nun",
    },
  ];


  const CardReadModeList = [
    {
      code: "all",
      value: "ALL",
    },
    {
      code: "E",
      value: "EMV",
    },
    {
      code: "M",
      value: "Magstripe",
    },
   
  ];


 
  const TransTypeList = [
    {
      code: "all",
      value: "ALL",
    },
    {
      code: "balanceEnquiry",
      value: "Balance Inquiry",
    },
    {
      code: "cashwithdrawal",
      value: "Cash Withdrawal",
    },
    {
      code: "fastcashwithdrawal",
      value: "Fast Cash Withdrawal",
    },
    {
      code: "fundTransfer",
      value: "Fund Transfer ",
    },
    {
      code: "Generate-Pin",
      value: "Generate-Pin",
    },
    {
      code: "miniStatement",
      value: "Mini Statement",
    },
    {
      code: "pinchange",
      value: "Pinchange",
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

 
// useEffect(()=>{
//   if(watch("atmid") !== undefined)
// onSubmit()
// },[])


const openModal = (rowData) => {
  // const headers = columns.map((column) => column.label);
  const headers = columns?.filter((column) => column?.label !== "View" && column?.label !== "Modify").map((column) => column?.label);
  setTableHeaders(headers);
  setRowDataToDisplay({
      headers: headers,
      rowData: rowData,
  });
  setIsModalOpen(true);
};
const closeModal = () => {
  setIsModalOpen(true);
};
const closeSignModal = () => {
  setIsModalOpen(false);
};


  // const handleNavigate = (rowData) => {
  //   navigate("/atmmaster/modify", { state: rowData });
  // };

  const handleNavigate = (route, rowData) => {
    navigate(route, { state: rowData })
}


  const columns = [
  
    {
      name: "View",
      label: "View",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, { rowData }, tableMeta) => {
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
              onClick={() => openModal(rowData)}
            >
              {" "}
              <VisibilityIcon />
            </Button>
          );
        },
      },
    },
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
      label: "Trans Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          const formattedDate = new Date(value).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
              // hour: '2-digit',
              // minute: '2-digit',
              // second: '2-digit',
          });
          return formattedDate;
          
        },
      },
    },
    {
      name: "transactiontime",
      label: "Trans Time",
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
      name: "acquiringinstidcode",
      label: "Acquire Code",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "transactiondatetime",
      label: "Trans DateTime",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "retrievalreferencenumber",
      label: "RRN No.",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "localtransactiontime",
      label: "Local Trans time",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "atmlocation",
      label: "ATM Location",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "msgtype",
      label: "Message Type",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
   
    {
      name: "processingcode",
      label: "Processing Code",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "responsecode",
      label: "Response Code",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "pan",
      label: "Card No.",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "systemtracenumber",
      label: "System Trace No.",
      options: {
        filter: true,
        sort: false,
        // display:false
      },
    },
    {
      name: "reservedprivate",
      label: "Reserved Private",
      options: {
        filter: true,
        sort: false,
        display:false
      },
    },
    {
      name: "fromaccount",
      label: "From Account",
      options: {
        filter: true,
        sort: false,
        display:false
      },
    },
    {
      name: "toaccount",
      label: "To Account",
      options: {
        filter: true,
        sort: false,
        display:false
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


  useEffect(() => {
    setValue("fromDate", new Date())
    setValue("toDate", new Date())
  }, []);
  

  const BankcodeList=bankcode && bankcode?.map(item => ({ "code": item.bankCd, "value": item.bankCd }));
  BankcodeList && BankcodeList?.unshift({ "code": "all", "value": "ALL" });
  
  
  const AtmIDList=atmID && atmID?.map((item)=>({"code":item.atmId,'value':item.atmId}));

  AtmIDList && AtmIDList?.unshift({ "code": "all", "value": "ALL" });


  const CardBinList=cardlist && cardlist?.map((item)=>({"code":item.bin,'value':item.bin}));
  CardBinList && CardBinList?.unshift({ "code": "all", "value": "ALL" });


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
    getCardBin()
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


  const getCardBin = async () => {
    setIsloading(true);
    try {
      const payload = {
        
        username: user?.username,
        sessionId: user?.sessionId,
      };
      const response = await postApiData(apiList.GET_CARDBIN, payload);
      setCardList(response.biList);
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
        atmid: data.atmid,
        bankcd: data.bankcd,

        toDate: data.toDate,
        fromDate: data.fromDate,
       
       
      };

      const response = await postApiData(
        apiList.SWITCH_BROWSE + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response.status == true) {
        setAtmMasterList(response.list);
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
   
 

    fromDate: convertDate(data.fromDate,1),
    toDate: convertDate(data.toDate,1),
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
            <div className={classes.bluerowtext}>Switch Report</div>
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

             
<Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Bank Code<sup className={classes.required}>*</sup>
                    </div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "bankcode",
                        }}
                        TextFieldProps={{
                          placeholder: "Select",
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
                            "Bank Code " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={BankcodeList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>ATM ID<sup className={classes.required}>*</sup></div>
                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmid",
                        }}
                        TextFieldProps={{
                          placeholder: "Select",
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
                            "ATM ID " +
                            errorMessages.error_autocomplete_message,
                        }}
                        data={AtmIDList}
                        required={true}
                      />
                    </div>
                  </div>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
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
                        maxDate:new Date()
                      }}
                      // rules={{
                      //     required:
                      //       "From Date " + errorMessages.error_autocomplete_message,
                      //   }}
                      required={false}
                    />
            
                  </div>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
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
                        minDate: watch("fromDate"),
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
              
                <Grid
                  item
                  xs={12}
                  sm={0}
                  md={5}
                  style={{ paddingTop: "42px" }}
                ></Grid> 
           
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
                  title={" Switch Report List"}
                  data={atmMasterList}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {isModalOpen ? (
              <OnlyView
                open={isModalOpen}
                handleClose={closeModal}
                closeSignModal={closeSignModal}
                rowDataToDisplay={rowDataToDisplay}
                show={"2"}
                title={"Switch Report List"}
              />
            ) : null}
          </div>
        </div>
      </Box>
    </>
  );
};

export default SwitchBrowse;





