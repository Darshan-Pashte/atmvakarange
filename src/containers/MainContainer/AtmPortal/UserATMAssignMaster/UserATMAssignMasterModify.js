import classes from "../Airtel.module.css";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { Controller, useForm } from "react-hook-form";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import Loader from "../../../../components/common/loader";
import TextFieldFormNew from "../../../../components/common/textFieldFormNew";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { REMOVE_USER } from "../../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { convertDate } from "../../../../components/utilities/convertDate";
import { useSelector } from "react-redux";
import GoBackButton from "../../../../components/common/GoBackButton";
import {
  compareIdAndReturnObject,
  compareTextAndReturnObject,
} from "../../../../components/common/commonArray";

const defaultFormData = {
    userid:"",
    atmid:""
};

const UserATMAssignMasterModify = () => {
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

  // const { state: user } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [upiList, setUpiList] = useState([]);
  const [banksCode, setbanksCode] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isBankLoading, setIsBankloading] = useState(false);
  const [isMidLoading, setIsMidloading] = useState(false);
  const [bankNamee, setbankNamee] = useState([]);
  const navigate = useNavigate();
  // const { dispatch: authDispatch } = useContext(AuthContext);
  const [clientId, setClientId] = useState("");
  const [openPop, setOpenPop] = useState(false);
  const [atmID, setAtmID] = useState([]);

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  console.log("user", user);

  const { state } = useLocation();
  console.log("state", state);

  useEffect(() => {
    setUserName(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("TOKEN"));
  }, []);

 

  const handleOpen = () => {
    setOpenPop(!openPop);
  };

  const filteredData =
    bankNamee &&
    bankNamee
      ?.filter((item) => item.hasOwnProperty("bankcode"))
      ?.map((item) => ({ code: item.bankcode, value: item.bankname }));


      const AtmIDList=atmID && atmID?.map((item)=>({"code":item.atmId,'value':item.atmId}));

      useEffect(()=>{
     
        getATMid()
       
      },[])
      
      useEffect(() => {
        // setValue("smsid", compareTextAndReturnObject(SMSIDList, state?.smsId));
    
        setValue("userid", state?.userId);
        setValue("atmid", compareTextAndReturnObject(AtmIDList,state?.atmid));
        
      }, [state && AtmIDList]);
    
      const getATMid = async () => {
        setIsloading(true);
        try {
          const payload = {
            
            username: user?.username,
            sessionId: user?.sessionId,
          };
          const response = await postApiData(apiList.GET_ATMID, payload);
          setAtmID(response?.atmMasterModels);
          setIsloading(false);
        } catch (err) {
          console.log(err);
        }
      };


  const onSubmits = async (data) => {
    try {
      setIsloading(true);
      const payload = {
      

    username: user?.username,
    sessionId: user?.sessionId,
    userId: data.userid,
    atmId: data.atmid.code

      };
      console.log("payload", payload);
      const response = await postApiData(apiList.USER_ATM_ASSIGN_MODIFY, payload);
      if (response?.status == true) {
        SweetAlertPopup(response.message, "Success", "success");
        // reset()
        navigate("/mobapp/useratmmaster");
        setIsloading(false);
      } else {
        SweetAlertPopup(response.message, "Error", "error");
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

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

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <GoBackButton />
      <Box
        className={classes.mainContainer}
        component={"form"}
        onSubmit={handleSubmit(onSubmits)}
      >
        <div className={classes.Sbox}>
          <div className={classes.bluerow}>ATM Alloaction Modify</div>
          <div>
            <div className={classes.formbox}>
              <Grid
                container
                columnSpacing={3}
                rowSpacing={2}
                style={{ paddingRight: "2vw" }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      User ID<sup className={classes.required}>*</sup>
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
                          disabled:true
                        }}
                        backgroundColor={true}
                        regExp={/^[A-Z0-9a-z ]*$/}
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
                
                <Grid item xs={12} sm={6} md={4}>
                  <div className={classes.frowdataaff}>
                    <div className={classes.frowtextaff}>
                      ATM ID<sup className={classes.required}>*</sup>
                    </div>

                    <div className={classes.frow1aff}>
                      <AutocompleteForm
                        controlerProps={{
                          control: control,
                          name: "atmid",
                        }}
                        TextFieldProps={{
                          placeholder: "Select ",
                          onKeyDown: (event) => {
                            const regex = /^[a-zA-Z0-9]*$/;
                            // const regex = /^[a-zA-Z0-9\s]*$/;
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
               
              </Grid>

              <div className={classes.fbut}>
                <ColorButton
                  variant="contained"
                  type="button"
                  onClick={() => reset()}
                >
                  RESET
                </ColorButton>
                <ColorButton1 variant="contained" type="submit">
                  Submit
                </ColorButton1>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default UserATMAssignMasterModify;
