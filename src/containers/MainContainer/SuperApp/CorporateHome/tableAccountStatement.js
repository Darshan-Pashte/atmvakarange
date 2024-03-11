import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CreditIcon from "../../../../assets/CreditIcon.svg";
import DebitIcon from "../../../../assets/DebitIcon.svg";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Grid, Typography } from "@mui/material";

import Loader from "../../../../components/common/loader";

import { useSelector } from "react-redux";
import { apiList } from "../../../../components/utilities/nodeApiList";

const columns = [
  { field: "transDate", headerName: "Date", width: 130 },
  { field: "transNarrative", headerName: "Particulars", width: 130 },
  { field: "transNarrative", headerName: "Deposits", width: 130 },
  { field: "transNarrative", headerName: "Withdrawals", width: 130 },
  { field: "transNarrative", headerName: "Deposits", width: 130 },
  {
    field: "transDRCR",
    headerName: "Status",
    width: 80,
    renderCell: (params) => (
      <>
        {params.row.transDRCR === "D" ? (
          <img src={CreditIcon} style={{ height: 20, width: 20 }} />
        ) : (
          <img src={DebitIcon} style={{ height: 20, width: 20 }} />
        )}
      </>
    ),
  },
  {
    field: "transAmount",
    headerName: "Balance",
    type: "number",
    width: 130,
    renderCell: (params) => (
      <span style={{ color: params.row.transDRCR === "D" ? "green" : "red" }}>
        {params.value}
      </span>
    ),
  },
];

export default function DataTable() {
  const [accountType, setAccountType] = useState([]);
  const [selectedAccountNo, setSelectedAccountNo] = useState("");
  const [miniStatementData, setMiniStatementData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // const [username, setUserName] = useState("");
  // const [token, setToken] = useState("");u

  // useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"));
  //   setToken(sessionStorage.getItem("TOKEN"));
  // }, []);

  //   Bank Account fetching API-->Fetch all the Bank accounts and update in DropDown
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setIsloading(true);
        const response = await axios.post(
          apiList.FETCH_ACC_CORPORATE,
          {
            username: user.userId,
            sessionId: user.sessionId,
          }
        );
        //Set data in Account Type
        setAccountType(response.data);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    fetchAccountData();
  }, [user.userId, user.sessionId]);

  //Handle the drop down and updating Selected Account
  const handleAccountDropDown = (event) => {
    setSelectedAccountNo(event.target.value);
  };

  // API to Update Mini Statement Using "SelectedAccountNo" which is passed in payload
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const response = await axios.post(
          apiList.CORPORATE_FETCH_MINI_STATEMENT,
          {
            username: user.userId,
            accNo: selectedAccountNo, // Here we are setting the selected account
            sessionId: user.sessionId,
            brCode: user.accountDetails[0].brCode,
            acType: "casa", // Using "CASA " as mentioned in API documentation
          }
        );

        setMiniStatementData(response.data);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    if (selectedAccountNo) {
      fetchData();
    }
  }, [selectedAccountNo, user.userId, user.sessionId, user.accountDetails]);

  useEffect(() => {
    if (accountType?.data?.accountlst.length > 0) {
      setSelectedAccountNo(accountType.data.accountlst[0].accNo);
    }
  }, [accountType]);

  //Adding ministatemnet data to apiRows

  const apiRows =
    (miniStatementData?.data?.miniStatement || [])
      .slice(0, 10)
      .map((row, index) => ({
        ...row,
        id: index,
      })) || [];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div style={{ height: 430, width: "100%" }}>
        <Grid container>
          <Grid item sm={9}></Grid>
          <Grid item sm={3}>
            <Box sx={{ margin: ".3rem" }}>
              <Typography sx={{ fontWeight: "500" }}>
                Select Account{" "}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAccountNo}
                  onChange={handleAccountDropDown}
                  style={{ width: 250, height: 40 }}
                >
                  {accountType?.data?.accountlst.map((item) => (
                    <MenuItem key={item.accNo} value={item.accNo}>
                      {item.accNo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <DataGrid
          rows={apiRows}
          sx={{ maxHeight: "23rem" }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
}
