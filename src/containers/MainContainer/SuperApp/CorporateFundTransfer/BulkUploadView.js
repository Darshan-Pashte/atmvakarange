// import classes from "../../corporatePages/authorize/Authorize.module.css";
import classes from "../../../MainContainer/authorizeApprove/Authorize.module.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import { Box, Checkbox, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../../components/common/datePickerForm";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import ServerInstance, {
  apiList,
} from "../../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../../components/utilities/formValidation";
import { convertDate } from "../../../../components/utilities/convertDate";
import AutocompleteForm from "../../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../../components/common/sweetAlertPopup";
import Loader from "../../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../../components/common/commonArray";
import MUIDataTable from "mui-datatables";
import GridTablePagination from "../../../../components/common/gridTablePagination";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkUploadViewModal from "./BulkUploadViewModal";


const defaultFormData = {
  fromDate: "",
  toDate: "",
  transtype: "",
  bulkNumber: ""
};

const TransactionType = [
  {
    code: "all",
    value: "ALL ",
  },
  {
    code: "IMPS",
    value: "IMPS",
  },
  {
    code: "NEFT",
    value: "NEFT",
  },
  {
    code: "RTGS",
    value: "RTGS",
  },
];

const bulkNumberList = [
  // {
  //   code: "2",
  //   value: "2",
  // },
  // {
  //   code: "10",
  //   value: "10",
  // },
  {
    code: "50",
    value: "50",
  },
  {
    code: "100",
    value: "100",
  },
  {
    code: "150",
    value: "150",
  },
];


const BulkUploadView = ({ status, valueTable }) => {

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [selectedBulkNumber, setSelectedBulkNumber] = useState(null);


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
    shouldUnregister: false
  });

  const [isLoading, setIsloading] = useState(false);


  const [responseData, setResponseData] = useState({});
  const [indexId, setIndexId] = useState();
  const [payloadData, setPayloadData] = useState({});
  const [totalRecord, settotalRecord] = useState(0);
  const [goPageNumber, setGoPageNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowDataToDisplay, setRowDataToDisplay] = useState({});
  const [tableHeaders, setTableHeaders] = useState([]);
  // const [payloadData,   setpalyalodData  ] = useState('');
  // const [responseData, setResponseData] = useState({});
  console.log("watch", watch())

  // useEffect(()=>{
  //   getTransactionList()
  // },[])

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setValue("fromDate", new Date());
    setValue("toDate", new Date());
    setValue("transtype", TransactionType ? compareTextAndReturnObject(TransactionType, TransactionType[0]?.value) : '')
    // setValue("bulkNumber", bulkNumberList ? compareTextAndReturnObject(bulkNumberList, bulkNumberList[0]?.value) : '')
  }, []);

  // useEffect(()=>{
  //   setpalyalodData(watch())
  // },[])

  const onSubmit = (data) => {
    let payload = {
      username: user?.userId,
      sessionId: user?.sessionId,
      // fromDt: convertDate(data.fromDate, 1),
      // toDt: convertDate(data.toDate, 1),
      fromDt: data.fromDate,
      toDt: data.toDate,
      status: status,
      transtype: data.transtype ? data.transtype : "all",
      // transtype: data.transtype ? data.transtype.code :"all",
    };
    getTransactionList(1, payload)
    //  setpalyalodData(payload)
    //  reset(defaultFormData);

  }

  // useEffect(()=>{
  //     getTransactionList()
  //   },[valueTable])

  useEffect(() => {
    getTransactionListView(1, payloadData);
  }, [valueTable]);

  useEffect(() => {
    if (watch("bulkNumber")?.value) {
      setGoPageNumber(watch("bulkNumber")?.value)
      // getTransactionListView(1, payloadData);
    }
  }, [watch("bulkNumber")]);

  useEffect(() => {
    if (goPageNumber) {
      getTransactionListView(1, payloadData);
    }
  }, [goPageNumber]);




  const getTransactionListView = async (currentPage, payData = payloadData) => {

    var { fromDt = "", toDt = "", transtype = "" } = payData
    setCurrentPage(currentPage)
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
        // fromDt: convertDate(data.fromDate, 1),
        // toDt: convertDate(data.toDate, 1),
        fromDt: fromDt ? convertDate(fromDt, 1) : convertDate(new Date(), 1),
        toDt: toDt ? convertDate(toDt, 1) : convertDate(new Date(), 1),
        // status: status,
        status: valueTable == "0" ? "all" : valueTable == "1" ? "M" : valueTable == "2" ? "C" : "A",
        transtype: transtype ? transtype.code : "all",
        // transtype: data.transtype ? data.transtype.code :"all",
      };

      const response = await postApiData(
        apiList.CORPORATE_TRANSACTION_VIEW + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
        payload
      );


      if (response.status == true) {
        setResponseData(response.data)
        settotalRecord(response.data.totalRecords)
      } else {
        setResponseData("")
        settotalRecord("")
        SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  console.log("payloadData", payloadData)

  const getTransactionList = (currentpages, payloadDatachild) => {
    console.log("payloadDatachild", payloadDatachild)
    getTransactionListView(currentpages, payloadDatachild)
    setPayloadData(payloadDatachild);
  }

  const openModal = (rowData) => {
    console.log("rowDta", rowData)
    const index = 12;
    if (rowData.length > index) {
      const dateValue = rowData[index];

      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      if (dateRegex.test(dateValue)) {
        const formattedDate = new Date(dateValue).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          // timeZoneName: 'short',
        });

        const modifiedRowData = [...rowData];
        modifiedRowData[index] = formattedDate;
        const headers = columns
          ?.filter((column) => column?.label !== "View" && column?.label !== "Sr. No.")
          .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
          headers: headers,
          rowData: modifiedRowData,
        });
        setIsModalOpen(true);
      } else {
        console.error("Value at index 12 is not in the expected date format");
        const defaultDate = "N/A";
        const modifiedRowData = [...rowData];
        modifiedRowData[index] = defaultDate;
        const headers = columns
          ?.filter((column) => column?.label !== "View" && column?.label !== "Sr. No.")
          .map((column) => column?.label);
        setTableHeaders(headers);
        setRowDataToDisplay({
          headers: headers,
          rowData: modifiedRowData,
        });
        setIsModalOpen(true);
      }
    } else {
      console.error("rowData doesn't have enough items");
    }
  };
  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "153px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#183883",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const columns = [
    {
      name: "View",
      label: "View",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, { rowData }, tableMeta) => {
          return (
            <Button sx={{ color: "black", minWidth: "100%", padding: "5px 5px !important" }} onClick={() => openModal(rowData)}> <VisibilityIcon /></Button>
          );
        },
      }
    },
    {
      name: 'srNo',
      label: 'Sr. No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'rrnNo',
      label: 'RRN No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'cbsreceivedDate',
      label: 'CBS Received Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'cbsSendDate',
      label: 'CBS Send Date',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remarks',
      label: 'Remarks',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'cbsRrn',
      label: 'CBS RRN',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'activitystatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transdate',
      label: 'Transaction Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'responsedesc',
      label: 'Desc',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transactiontype',
      label: 'Transaction Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'amount',
      label: 'Amout',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'beneifsc',
      label: 'Beneficiary IFSC',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'beneAccNo',
      label: 'Benebeficiary Account',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmitterbrCode',
      label: 'Remmitter Code',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmittermob',
      label: 'Remmitter Mo No.',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
    {
      name: 'remmitterAccNo',
      label: 'Remmitter Acc No',
      options: {
        filter: true,
        sort: false,
        display: false
      },
    },
  ];

  const options = { textLabels: {
    body: {
      noMatch: (
        <div
          style={{
            display: "flex",
            height: "30vh",
            justifyContent: "center",
            alignItems: "center",
            fontSize:"larger"
          }}
        >
          Sorry, no matching records found
        </div>
      ),
    },
  },
  filterType: "dropdown",
    responsive: "stacked",
    filter: false,
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
          bulkNumberList={bulkNumberList}
          onPageChange={(page) => {
            getTransactionListView(page)
          }}
        />
      );
    },
};

  // const options = {
  //   filterType: "dropdown",
  //   responsive: "stacked",
  //   filter: false,
  //   download: false,
  //   print: false,
  //   // checkbox:true,
  //   selectableRows: false,
  //   pagination: false,
  //   customFooter: () => {
  //     return (
  //       <GridTablePagination
  //         currentPage={currentPage}
  //         totalCount={totalRecord}
  //         pageSize={goPageNumber}
  //         control={control}
  //         bulkNumberList={bulkNumberList}
  //         onPageChange={(page) => {
  //           getTransactionListView(page)
  //         }}
  //       />
  //     );
  //   },
  // };
  // {
  //   name: "srno",
  //   label: "Sr. No.",
  //   options: {
  //     filter: true,
  //     sort: true,
  //   }
  // },
  // {
  //   name: "batchcode",
  //   label: "Batch Code",

  //   options: {
  //     filter: true,
  //     sort: false,
  //     customBodyRender: (value, { rowIndex }) => {
  //       // console.log(value, rowIndex);
  //       return (
  //         <>
  //           {/* <DeletesIcon rowIndex={rowIndex} data={data} handleDeleteContact={handleDeleteAnnouncement} topLevelPath={topLevelPath} url1={url1} /> */}
  //         </>
  //       );
  //     },
  //   }
  // },
  // {
  //   name: "Edit",
  //   label: "Edit",

  //   options: {
  //     filter: true,
  //     sort: false,
  //     customBodyRender: (value, { rowIndex }) => {
  //       // console.log(value, rowIndex);
  //       return (
  //         <>
  //           <EditsIcon rowIndex={rowIndex} data={data} handleNavigate={handleNavigate} url={url} topLevelPath={topLevelPath} url1={url1}/>
  //         </>
  //       );
  //     },
  //   }
  // },


  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      {/* <div className={classes.mainheading}>Bulk Payment Batch Codes</div>
      <div className={classes.mainheading1}>Preview</div> */}
      <div className={classes.mainupper}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.Sbox}>
              <div>
                <div className={classes.formbox}>
                  <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={2}
                    style={{ padding: "0.1vw" }}
                  >
                    <Grid item xs={12} sm={6} md={3}>
                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>
                          From Date<sup className={classes.required}>*</sup>
                        </div>
                        <DatePickerForm
                          controlerProps={{
                            control: control,
                            name: "fromDate",
                          }}
                          TextFieldProps={
                            {
                              //   fullWidth: true,
                            }
                          }
                          DatePickerProps={{
                            // label: "From Date",
                            fullWidth: true,
                          }}
                          required={false}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>
                          To Date<sup className={classes.required}>*</sup>
                        </div>
                        <DatePickerForm
                          controlerProps={{
                            control: control,
                            name: "toDate",
                          }}
                          TextFieldProps={
                            {
                              //   fullWidth: true,
                            }
                          }
                          DatePickerProps={{
                            // label: "From Date",
                            fullWidth: true,
                            minDate: watch("fromDate"),
                          }}
                          required={false}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>
                          Transaction Type<sup className={classes.required}>*</sup>
                        </div>
                        <AutocompleteForm
                          controlerProps={{
                            control: control,
                            name: "transtype",
                          }}
                          TextFieldProps={{
                            // style: { width: "28vw" },

                            placeholder: "Transaction Type",
                            onKeyDown: (event) => {
                              //const regex = /^[a-zA-Z]*$/;
                              const regex = /^[a-zA-Z\s]*$/;
                              const isBackspace = event.keyCode === 8;
                              const isValidInput = regex.test(event.key);

                              if (!isValidInput && !isBackspace) {
                                event.preventDefault();
                              }
                            },
                          }}
                          rules={{
                            required:
                              "Type " + errorMessages.error_autocomplete_message,
                          }}
                          // data={accountHomebank}
                          data={TransactionType}
                          required={true}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div
                        className={classes.frowtext}
                        style={{ visibility: "hidden" }}
                      >
                        button
                      </div>

                      <ColorButton1 variant="contained" type="submit">
                        Apply
                      </ColorButton1>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
      <div className={classes.mainupper}>
        <div className={classes.mainupperApprove}>
          {/* <div className={classes.bluerow}>Announcement Browse List</div> */}
          <div>
            {/* <Grid
            container
            columnSpacing={4}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >
            <Grid item xs={12} sm={4} md={9}></Grid>
            <Grid item xs={12} sm={4} md={3}>
              <div
                className={classes.frowtext}
                style={{ visibility: "hidden" }}
              >
                button
              </div>

              <ColorButton2 variant="contained" type="button">
                View Batch Status
              </ColorButton2>
            </Grid>
          </Grid> */}
            <Grid item xs={12} sm={4} md={4}>
              <div className={classes.frowdata11}>
                <div className={classes.frowtext}>
                  Sort Page
                  {/* <sup className={classes.required}>*</sup> */}
                </div>
                <AutocompleteForm
                  controlerProps={{
                    control: control,
                    name: "bulkNumber",
                  }}
                  TextFieldProps={{
                    style: { width: "8vw" },
                    placeholder: "Select Number",
                    onKeyDown: (event) => {
                      //const regex = /^[a-zA-Z]*$/;
                      const regex = /^[a-zA-Z\s]*$/;
                      const isBackspace = event.keyCode === 8;
                      const isValidInput = regex.test(event.key);

                      if (!isValidInput && !isBackspace) {
                        event.preventDefault();
                      }
                    },
                  }}
                  // rules={{
                  //   required:
                  //     "Bulk Number " + errorMessages.error_autocomplete_message,
                  // }}
                  // data={accountHomebank}
                  data={bulkNumberList}
                  required={false}
                />
              </div>
            </Grid>
          </div>


          {/* <GridTablePagination
            currentPage={currentPage}
            totalCount={totalRecord}
            pageSize={goPageNumber}
            onPageChange={(page) => {
              getTransactionListView(page)
            }}
          /> */}

        </div>
        <MUIDataTable
          // title={"Announcement List"}
          // data={data ? data : []}
          data={responseData?.translist}
          columns={columns}
          options={options}
        />
        {
          isModalOpen ? <BulkUploadViewModal open={isModalOpen} handleClose={closeModal} rowDataToDisplay={rowDataToDisplay} show={"2"} title={"Transaction Details"} /> : null
        }
      </div>
    </>
  );
};

export default BulkUploadView;
