import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/base";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import classes from "../Home/Home.module.css";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import DataTable from "./tableTab2Home";
import SliderTestimonials from "./HomeSlider/HomeSlider";
import AccountStatement from "../CorporateHome/AccountStatement";
import AccountStatementHome from "./AccountStatementHome";
import Loader from "../../../../components/common/loader";
import LoanTab from "./LoanTab";

const defaultFormData = {
  email: "",
  password: "",
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const Home = () => {
  const [valueTable, setValueTable] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTable(newValue);
  };

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
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [ToggleState, setToggleState] = useState(true)
  const [accList, setAccList] = useState([])
  const [isLoading, setIsloading] = useState(false);


  useEffect(() => {
    const getAccountList = async () => {
      try {
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId
        };
        setIsloading(true)
        const response = await postApiData(apiList.FETCHACC, payload);
        console.log("response", response);
        // setShowBal(response.data?.accBal);
        setAccList(response?.data?.accountlst)
        setIsloading(false)

      } catch (err) {
        console.log(err)
        setIsloading(false)
      }

    };

    getAccountList()
  }, [])

  return (
    <>
      <div className={classes.cardsmainpage}>
        {/* <div className={classes.cardsheader}>Hi,{user?.customerName}</div>
        <div className={classes.cardsheader1}>Welcome to Mahesh Bank</div> */}
        <div className={classes.cardscontent}>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >



            <Grid item xs={12} sm={12} md={12} ><div className={classes.gridtitle}>Hi,{user?.customerName} <span style={{fontWeight:'400'}}>(Welcome to Mahesh Bank) </span></div> </Grid>
            <Grid item xs={12} sm={12} md={6} >
              <div className={classes.gridtitle}>Account Details</div>
              <div className={classes.cardsBox}>
                {isLoading ? (<Loader loading={true} />) : (<><Loader loading={false} /><SliderTestimonials accList={accList} /></>)}
              </div>
            </Grid>


            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.gridtitle}>Account Statement</div>
              <div className={classes.cardsBox}>

                <div className={classes.accountstatement}><AccountStatementHome accList={accList} /></div>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={6} >
              <div className={classes.cardsBox}>
                {isLoading ? (<Loader loading={true} />) : (<><Loader loading={false} /><SliderTestimonials accList={accList} /></>)}
              </div>
            </Grid>


            <Grid item xs={12} sm={12} md={6}>
              <div className={classes.cardsBox}>
                <div className={classes.gridtitle}>Account Statement</div>
                <div className={classes.accountstatement}><AccountStatementHome accList={accList} /></div>
              </div>
            </Grid> */}


            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.gridtitle}>Summary</div>
              <Box className={classes.tableMainBox}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    // color:'var(--common-heading-color)',
                    backgroundColor: "var(--common-background-color)",
                    borderRadius: 2,
                  }}
                >
                  <Tabs
                    value={valueTable}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    <Tab style={{color:'var(--common-heading-color)'}} label="Recent Transactions" {...a11yProps(0)} />
                    <Tab  style={{color:'var(--common-heading-color)'}} label="Loans" {...a11yProps(1)} />
                    {/* <Tab label="Deposits" {...a11yProps(2)} /> */}
                  </Tabs>
                </Box>
                <CustomTabPanel value={valueTable} index={0}>
                  <DataTable></DataTable>
                </CustomTabPanel>
                <CustomTabPanel value={valueTable} index={1}>
                  <LoanTab></LoanTab>
                </CustomTabPanel>
                {/* <CustomTabPanel value={valueTable} index={2}>
                  Item Three
                </CustomTabPanel> */}
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;
