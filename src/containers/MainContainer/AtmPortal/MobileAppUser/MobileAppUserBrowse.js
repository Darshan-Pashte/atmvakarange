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

import EditsIcons from "../../../../components/common/EditIcon";
import ATMMasterListView from "../../../../components/common/ATMMasterListView";


const defaultFormData = {
userid:''
};

const MobileAppUserBrowse = () => {
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

  const url = "/mobapp/modify";
  const url1 = "/mobappuser";
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

  
  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const [payloadData, setPayloadData] = useState({})

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log("user", user);


 



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
    {
      name: "Modify",
      label: "Modify",
      options: {
          filter: false,
          sort: false,
          customBodyRender: (value, { rowIndex }) => {
              return (
                  <>
                      <EditsIcons rowIndex={rowIndex} data={atmMasterList}  handleNavigate={handleNavigate} url={url} topLevelPath={topLevelPath} url1={url1} />
                  </>
              );
          },
      }
  },
    {
      name: "userId",
      label: "User ID",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mobileNo",
      label: "Mobile No.",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "emailId",
      label: "Email Id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "dept",
      label: "Department",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "usrLvlCode",
      label: "User Code",
      options: {
        filter: true,
        sort: false,
        display:true
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
        
          onPageChange={(page) => {
            getTransactionListView(page)
          }}
        />
      );
    },
  };


  useEffect(()=>{
    getTransactionListView()
    onSubmit()
  },[])
  

  
  const getTransactionListView = async (currentPage,data = payloadData) => {
console.log('data',data)
  
    setCurrentPage(currentPage)
    setIsloading(true);
    try {
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        userId:data.userId,
        mobileAccess:data.mobileAccess,
        status:data.status
       
      };

      const response = await postApiData(
        apiList.MOBILE_APP_USER_BROWSE + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response.status == true) {
        setAtmMasterList(response.arrayList);
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
    console.log("payloadDatachild", payloadDatachild)
    getTransactionListView(currentpages, payloadDatachild)
    setPayloadData(payloadDatachild)
    

  }
  

  const onSubmit = (data) => {
    let payload = {
      username: user?.username,
      sessionId: user?.sessionId,
      userId:data?.userid,
      mobileAccess:"Y",
      status: "7"
   
      // transtype: data.transtype ? data.transtype.code :"all",
    };
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }


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
            <div className={classes.bluerowtext}>Mobile Application User</div>
            <div>
              <ColorButton1
                onClick={() => navigate("/mobapp/create")}
                variant="contained"
              >
                Create
              </ColorButton1>
            </div>
          </div>
          <div>
            <div className={classes.formbox}>
              <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      User Id
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "userid",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "User Id",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        
                        regExp={/^[a-zA-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Bank code" +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                {/* <Grid
                  item
                  xs={12}
                  sm={2}
                  md={5}
                  style={{ paddingTop: "42px" }}
                ></Grid>
            */}
                
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
                  title={" Mobile Application User Browse List"}
                  data={atmMasterList}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

            {isModalOpen ? (
              <ATMMasterListView
                open={isModalOpen}
                handleClose={closeModal}
                closeSignModal={closeSignModal}
                rowDataToDisplay={rowDataToDisplay}
                show={"2"}
                title={"Mobile Application User Browse List"}
              />
            ) : null}
          </div>
        </div>
      </Box>
    </>
  );
};

export default MobileAppUserBrowse;
