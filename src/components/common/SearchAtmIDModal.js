import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../../containers/MainContainer/AtmPortal/Airtel.module.css";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import { Grid, TextField, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { postApiData } from "../../components/utilities/nodeApiServices";
import { apiList } from "../../components/utilities/nodeApiList";
import { errorMessages } from "../../components/utilities/formValidation";
import OTPInput from "react-otp-input";
import { useState } from "react";
import Loader from "../../components/common/loader";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import TextFieldForm from "../../components/common/textFieldForm";
import GridTablePagination from "../../components/common/gridTablePagination";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
//   width: '50vw',
  bgcolor: "background.paper",
//   border: "0.2px solid #000",
borderRadius:'8px',
  boxShadow: 24,
  p:1,
  boxShadow:' 0 0 0 0px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)',

  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: "#FFFFFF",
  // backgroundColor: "#F84B67",
  backgroundColor: "#AA1313",
  // border: "1px solid #CCC",
  border: "1px solid #CCC",
  borderRadius: "8px",
  paddingLeft: "15px",
  paddingRight: "15px",
  width: "123px",
  height: "35px",
  "&:hover": {
    background: "#808080",
    color: "white",
  },
}));

const defaultFormData = {
  username: "",
  password: "",
  cpassword: "",
  bankcode: "",
  atmid: "",
  companyId: "",
  address:'',
  machineip: "",
  location: "",
  luno: "",
};

export default function SearchAtmIDModal({
  open,
  handleClose,
  responseData,
  payloads,
  userId,
  userName,
  setResData
}) {
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

//   React.useEffect(() => {
//     setValue("username", responseData);
//     // setLastLogin(sessionStorage.getItem("lastLogin"))
//   }, []);

  const [showPassword, setShowPassword] = React.useState(false);
  const [otp, setOtp] = useState("");
  // const [isLoading, setisLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();

  const [atmID, setAtmID] = useState([]);

  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);


  const [payloadData, setPayloadData] = useState({});

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log('user',user)

  const [isLoading, setIsloading] = useState(false);

  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [tries, setTries] = useState("");
  const [msg, setMsg] = useState("");
  const [atmMasterList, setAtmMasterList] = useState([]);

  // const [times,setTimes]=useState('')
  const handleFocus = () => {
    // Clear the input value on focus
    setOtp("");
    setIsOtpEntered(false);
  };

  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { otpdata } = useSelector((state) => state.auth);
  console.log("otpdata", otpdata);

  const popupAlert = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };


  const columns = [
  
    {
      name: "View",
      label: "Select",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, { rowData,rowIndex }, tableMeta) => {
          return (
            <Button
              sx={{
                color: "black",
                minWidth: "100%",
                padding: "5px 5px !important",
              }}
              onClick={() => {
                setResData(atmMasterList[rowIndex])
                handleClose()
              }}
            >
              {" "}
              <Checkbox {...label} />
              {/* <VisibilityIcon /> */}
            </Button>
          );
        },
      },
    },
  

    {
      name: "atmId",
      label: "ATM Id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "luno",
      label: "Luno",
      options: {
        filter: true,
        sort: false,
        display:true
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "location",
      label: "Location",
      options: {
        filter: true,
        sort: false,
        display:true
      },
    },
    {
      name: "atmstatus",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        // customBodyRender: (value) => (
        //   value === "0" ? "InActive" : value === "1" ? "Active" : value === '2' ? 'InActive' :
        //   value === '3' ? ' Block' : value === '7' ? 'New User' : value
        // )
      },
    },
    {
      name: "ip",
      label: "IP",
      options: {
        filter: true,
        sort: false,
       
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


  const getTransactionListView = async (currentPage,data = payloadData) => {
    console.log('currentPage',currentPage);
    setCurrentPage(currentPage)
    console.log('data',data)
    setIsloading(true);
    try {
      const payload = {
        username:user?.username,
        sessionId: user?.sessionId,
        // atmId: data.atmid,
        bankcd: data.bankcd,
        ip:data.ip,
        address:data.address,
        location:data.location,
        luno:data.luno
       
      };

      const response = await postApiData(
        apiList.ATM_MASTER_BROWSE + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
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

  const onSubmitModal = (data) => {
    // console.log("data",data);
    let payload = {
      username: user?.username,
      sessionId: user?.sessionId,
    //   atmid: 'all',
      bankcd: watch("bankcode"),
      // transtype: data.transtype ? data.transtype.code :"all",
      luno: watch("luno"),
      location:watch("location"),
      address: watch("address"),
      ip:watch("machineip")
    };
    console.log("payload",payload);
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }
  return (
    <div>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box
          sx={style}
        className={classes.mainContainer}
        component="form"
        // onSubmit={handleSubmit(onSubmitModal)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>
            <div className={classes.bluerowtext}></div>
            <Button className={classes.headerLogo} onClick={()=>handleClose()}><CancelRoundedIcon/></Button>
          </div>
          <div>
            <div className={classes.formbox}>
              <Grid container columnSpacing={2} rowSpacing={2}>


                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Luno
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "luno",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Luno",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 3}
                        }}
                        regExp={/^[0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Luno" + errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Location
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "location",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Location",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 10}
                        }}
                        regExp={/^[a-zA-Z0-9 ]+$/}
                        // rules={{
                        //   required:
                        //     "Location" +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Address
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "address",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Address",
                          // style: { width: "33vw" },
                          // multiline:true,
                          // rows:3,
                          fullWidth: true,
                          inputProps : {maxLength: 100}
                        }}
                        // regExp={/^[a-zA-Z0-9. ]+$/}
                      // regExp={/.*/}
                      regExp={/^[^<>]*$/}

                        // rules={{
                        //   required:
                        //     "Address" +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      Machine IP
                      {/* <sup className={classes.required}>*</sup> */}
                    </div>
                    <div className={classes.frow1aff}>
                      <TextFieldForm
                        controlerProps={{
                          control: control,
                          name: "machineip",
                          rows: 5,
                          maxRows: 10,
                        }}
                        TextFieldProps={{
                          // label: "Name",
                          placeholder: "Machin IP",
                          // style: { width: "33vw" },
                          fullWidth: true,
                          inputProps : {maxLength: 15}
                        }}
                        regExp={/^[0-9.]+$/}
                        // rules={{
                        //   required:
                        //     "Machine IP" +
                        //     errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={0}
                  md={8.5}
                  style={{ paddingTop: "42px" }}
                ></Grid>  
           
                <Grid item xs={12} sm={3} md={2} style={{ paddingTop: "37px" }}>
                  <ColorButton variant="contained" onClick={onSubmitModal}>
                    Submit
                  </ColorButton>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.parentcomp}>
            <div className={classes.Sbox2}>
              {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
              <div style={{ width: "100%" ,marginBottom:'10px'}}>
                <MUIDataTable
                  title={" ATM List"}
                  data={atmMasterList}
                  columns={columns}
                  options={options}
                />
              </div>
            </div>

           
          </div>
        </div>
      </Box>
      </Modal>
    </div>
  );
}
