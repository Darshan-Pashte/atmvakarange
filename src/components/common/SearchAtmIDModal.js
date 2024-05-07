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
  minWidth: '50vw',
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
  backgroundColor: "#042879",
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

  // console.log('user',user)

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
  // console.log("otpdata", otpdata);

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


  const getTransactionListView = async (currentPage,data = payloadData) => {
    // console.log('currentPage',currentPage);
    setCurrentPage(currentPage)
    // console.log('data',data)
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
    // console.log("payload",payload);
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }
  return (
    <div>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box
          sx={style}
        className={classes.searchpopup}
        component="form"
        // onSubmit={handleSubmit(onSubmitModal)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>
            <div className={classes.bluerowtext}>ATM List</div>
            <Button className={classes.headerLogo} onClick={()=>handleClose()}><CancelRoundedIcon/></Button>
          </div>
          <div>
            <div className={classes.formbox}>
              <Grid container columnSpacing={2} rowSpacing={2}>


                <Grid item xs={12} sm={6} md={4}>
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
                        regExp={/^[A-Z0-9]+$/}
                        // rules={{
                        //   required:
                        //     "Luno" + errorMessages.error_autocomplete_message,
                        // }}
                        required={false}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
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

                <Grid item xs={12} sm={6} md={4}>
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
                          inputProps : {maxLength: 40}
                        }}
                        // regExp={/^[a-zA-Z0-9. ]+$/}
                      // regExp={/.*/}
                      regExp={/^[A-Za-z0-9]*$/}

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
                <Grid item xs={12} sm={6} md={4}>
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

                {/* <Grid
                  item
                  xs={12}
                  sm={0}
                  md={8.5}
                //   style={{ paddingTop: "42px" }}
                ></Grid>   */}
           
                <Grid item xs={12} sm={3} md={2} 
                style={{ paddingTop: "37px" }}
                >
                  <ColorButton   loading={isLoading} variant="contained" onClick={onSubmitModal}>
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
