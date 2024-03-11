import React from "react";
import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";
import classes from "./accounts.module.css";
import { userData } from "./userData";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SavingAccount from "../../../../assets/AccountsPics/SavingAccount.svg";
import CurrentAccount from "../../../../assets/AccountsPics/CurrentAccount.svg";
import FixedDeposit from "../../../../assets/AccountsPics/FixedDeposit.svg";
import LinkFD from "../../../../assets/AccountsPics/LinkFD.svg";
import PrematureWithdrawal from "../../../../assets/AccountsPics/PrematureWithdrawal.svg";
import RecurringDeposits from "../../../../assets/AccountsPics/RecurringDeposits.svg";
import NetBanking from "../../../../assets/AccountsPics/NetBanking.svg";
import CreditCard from "../../../../assets/AccountsPics/CreditCard.svg";
import DebitCard from "../../../../assets/AccountsPics/DebitCard.svg";
import AllOffers from "../../../../assets/AccountsPics/AllOffers.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// import DataTable from "./tableTab2";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { useState } from "react";
import Loader from "../../../../components/common/loader";
import DataTable from "../Home/tableTab2Home";
import LoanTab from "../Home/LoanTab";
import AccountStatementHome from "../Home/AccountStatementHome";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #DAE2F6",
    color: "#323232",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

function createData(
  name,
  account,
  accountType,
  balance,
  withdrawable,
  currency,
  uncleared,
  amb
) {
  return {
    name,
    account,
    accountType,
    balance,
    withdrawable,
    currency,
    uncleared,
    amb,
  };
}

const rows = userData[0].transhistory.map((data) =>
  createData(...Object.values(data))
);

export default function Accounts() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [accList, setAccList] = useState([])
  const [balance, setBalance] = useState("")
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);



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
        setBalance(response?.data?.combinedBal)
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
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <Box className={classes.mainBox}>
        <Stack spacing={4}>
          <Grid container className={classes.accountsMainHeadingFlex}>
            <Grid item sm={6} >
              <div className={classes.savingsAccount}>
                Account
              </div>
              <div className={classes.savingsAccountSubHeading}>
            Account Balance Summary
              </div>
            </Grid>
            <Grid item sm={6}>
              <Typography className={classes.savingsAccountBalance}>
                Balance:
                <h2 className={classes.savingsAccountBalancecColor}>
                  ₹{parseFloat(balance).toFixed(2)}
                </h2>
              </Typography>
            </Grid>
          </Grid>
          <Box className={classes.tableMainBox}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Account name</StyledTableCell>
                    <StyledTableCell >Account</StyledTableCell>
                    <StyledTableCell>Account Type</StyledTableCell>
                    <StyledTableCell >Balance</StyledTableCell>
                    {/* <StyledTableCell align="right">Withdrawable</StyledTableCell>
                  <StyledTableCell align="right">Currency</StyledTableCell>
                  <StyledTableCell align="right">Uncleared</StyledTableCell>
                  <StyledTableCell align="right">AMB</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                {accList ? <>  {accList && accList?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.accName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.accNo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.accType}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.accBal}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                      {row.withdrawable}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.currency}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.uncleared}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.amb}</StyledTableCell> */}
                    </StyledTableRow>
                  ))}</>: <div className={classes.nodata}>
                  No data avaliable</div>}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className={classes.tableMainBox}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: " var(--common-background-color)",
                borderRadius: 2,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="primary"
              >
                <Tab  style={{color:'var(--common-heading-color)'}}  label="Mini statement" {...a11yProps(0)} />
                <Tab style={{color:'var(--common-heading-color)'}} label="Loans" {...a11yProps(1)} />
                {/* <Tab label="Deposits" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <DataTable />
              {/* <DataTable></DataTable> */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <LoanTab />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel> */}
          </Box>
          <Grid item xs={12} sm={12} md={6}>
               <div className={classes.gridtitle}>Account Statement</div>
            <div className={classes.cardsBox}>
           
              <div className={classes.accountstatement}><AccountStatementHome /></div>
            </div>
          </Grid>

          <Box>
            <Stack spacing={2}>
              <Typography className={classes.savingsAccountSubHeading1}>
                Set Account Limit
              </Typography>
              <Grid container className={classes.accountsSecondGrid}>
                <Grid
                  onClick={() => navigate("/account/setacclimit")}
                  style={{ cursor: "pointer" }}
                  className={classes.accountsMarginGrid}
                  item
                  sm={2}
                  md={2}
                  sx={{
                    "&:hover": {
                      backgroundColor: "",
                      cursor: "pointer",
                      "& .addIcon": {
                        color: "purple",
                      },
                    },
                  }}
                >


                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img
                        className={classes.iconImagesPaddingType1}
                        src={SavingAccount}
                      />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography1}   >
                        Saving Account
                      </Typography>
                    </div>

                  </div>


                </Grid>

                <Grid className={classes.accountsMarginGrid} item sm={2} md={2}>
                  <div className={classes.accountBox}>
                    <img
                      className={classes.iconImagesPaddingType2}
                      src={CurrentAccount}
                    />
                    <Typography className={classes.iconsTypography2}>
                      Current Account
                    </Typography>
                  </div>


                </Grid>

                <Grid item xs={12} sm={12} md={4}></Grid>
              </Grid>
            </Stack>
          </Box>

          {/* <Box>
          <Stack spacing={2}>
            <Typography className={classes.savingsAccountSubHeading}>
              Deposit Summary
            </Typography>
            <Grid container className={classes.accountsSecondGrid}>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography className={classes.iconsTypography}>
                      Withdrawable Balance:
                    </Typography>
                    <Typography className={classes.savingsAccountBalancecColor}>
                      ₹00.0
                    </Typography>
                  </Stack>

                  <Typography component={Link} to="/">
                    Open a deposit
                  </Typography>
                  <Typography
                    // className={classes.serviceRequestLinkPadding}
                    component={Link}
                    to="/"
                  >
                    Service Request
                  </Typography>
                </Stack>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}></Grid>
            </Grid>
          </Stack>
        </Box> */}

          {/* <Box>
            <Stack spacing={2}>
              <Typography className={classes.savingsAccountSubHeading1}>
                Deposit
              </Typography>
              <Grid container className={classes.accountsSecondGrid}>
                <Grid className={classes.accountsMarginGrid} item sm={2} md={2} onClick={() => navigate("/account/fixeddepositdetails")}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img
                        className={classes.iconImagesPaddingType1}
                        src={FixedDeposit}
                      />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography} >
                        Deposit Account Details
                      </Typography>
                    </div>

                  </div>
                </Grid>

                <Grid className={classes.accountsMarginGrid} item sm={2} md={2} onClick={() => navigate("/account/fixeddepositscheme")}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img
                        className={classes.iconImagesPaddingType2}
                        src={RecurringDeposits}
                      />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography}>
                        Interest Rate
                      </Typography>
                    </div>

                  </div>
                </Grid>

                <Grid className={classes.accountsMarginGrid} item sm={2} md={2} onClick={() => navigate("/account/opendeposit")}>
                  <div className={classes.accountBox}>
                    <div className={classes.accountBoxImage}>
                      <img className={classes.iconImagesPaddingType2} src={LinkFD} />
                    </div>
                    <div className={classes.accountBoxText}>
                      <Typography className={classes.iconsTypography}>
                        Open New Deposit
                      </Typography>
                    </div>

                  </div>
                </Grid>
              </Grid>
            </Stack>
          </Box> */}


          
          {/* 
        <Box>
          <Stack spacing={2}>
            <Typography className={classes.savingsAccountSubHeading}>
              Offers zone
            </Typography>
            <Grid container className={classes.accountsSecondGrid}>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType1}
                  src={NetBanking}
                />
                <Typography className={classes.iconsTypography}>
                  Net Banking
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType1}
                  src={CreditCard}
                />
                <Typography className={classes.iconsTypography}>
                  Credit Card
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img
                  className={classes.iconImagesPaddingType1}
                  src={DebitCard}
                />
                <Typography className={classes.iconsTypography}>
                  Debit Card
                </Typography>
              </Grid>
              <Grid className={classes.accountsMarginGrid} item sm={2}>
                <img className={classes.iconImagesPadding} src={AllOffers} />
                <Typography className={classes.iconsTypography}>
                  All Offers
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box> */}
        </Stack>
      </Box>
    </>
  );
}
