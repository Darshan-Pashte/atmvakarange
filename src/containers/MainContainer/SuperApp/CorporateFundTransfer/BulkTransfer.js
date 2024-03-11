import classes from "../CorporateFundTransfer/CorporateFundTransfer.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldForm from "../../../../components/common/textFieldForm";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
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
import RadioGroupForm from "../../../../components/common/RedioButtonForm";
import UploadContainer from "../../../../components/common/uploadContainer";
import FinancialOverview from "../../corporatePages/home/FinancialOverview/FinancialOverview";
import GoBackButton from "../../../../components/common/GoBackButton";
import UploadIcon from "../../../../assets/upload.svg";

import { DataGrid } from "@mui/x-data-grid";
import MUIDataTable from "mui-datatables";
import OtpCorporateModal from "./otpModalBulkTranfer";
import { processBase64Format } from "../../../../components/common/fileUploadHelper";
import { processBase64FormatBase64 } from "../../../../components/common/fileUploadHelperBase64";

const defaultFormData = {
  tranferType: "Internal",
  accountNumber: "",
  tranferMethod: "IMPS",
  remark: "",
};


const rows = [
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
  ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],

  // Add more rows as needed
];

const BulkTransfer = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );


  // const options = {
  //   // filterType: "dropdown",
  //   filterType: "checkbox",
  //   responsive: "stacked",
  //   // responsive: 'standard',
  //   filter: false,
  //   download: false,
  //   print: false,
  //   checkbox: false,
  //   // selectableRows: 'single',
  //   // onRowsSelect: (currentRowsSelected, allRowsSelected) => {
  //   //   setSelectedRows(currentRowsSelected);
  //   // },


  // };

  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    filter: false,
    download: false,
    print: false,
    // checkbox:true,
    selectableRows: false
  };

  const [bulkUploadList, setBulkUploadList] = useState([]);
  const [airtelFile, setAirtelFile] = useState(null);
  const [airtelFileUpload, setAirtelFileUpload] = useState([]);
  const [payloadData, setPayloadData] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChangeAirtelFile = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setAirtelFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        dataURL: reader.result,
      });
      setAirtelFileUpload(["bulkpayment", processBase64FormatBase64(reader.result)])
    }
    // setAirtelFile(selectedFile);
  };

  const [selectedRow, setSelectedRow] = useState(null);

  // Handle row click event
  const handleRowClick = (rowData) => {
    // Store the selected row data in the state
    setSelectedRow(rowData);

    // Navigate to the preview page
    navigate(`/payments/bulkFundTransferPreview`, { state: rowData });
  };

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));
  // const accountList = accList && accList?.map(item => ({ "code": item.accNo, "value": item.accNo }));

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

  const [isLoading, setIsloading] = useState(false);
  console.log("transferType", watch("tranferType"));
  useEffect(() => {
    if (accountList) {
      setValue(
        "accountNumber",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

  useEffect(() => {
    getBulkUploadList()
  }, []);

  const navigate = useNavigate()

  const onDownloadExcel = async (data) => {
    try {
      const response = await fetch(apiList.CORPORATE_BULKUPLOAD_SAMPLE);
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Sample File.csv`;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };

  const getBulkUploadList = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
      };

      const response = await postApiData(
        apiList.CORPORATE_BULKUPLOAD_LIST,
        payload
      );

      if (response.status) {
        setBulkUploadList(response.data.bulkfilelst)
      } else {
        SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };

  const onSubmit = async (data) => {

    if (!airtelFile) {
      SweetAlertPopup('Please select a file before submitting.', "Error", "error");
      return;
    }
    setIsloading(true);

    console.log("data", data)
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
      };

      const response = await postApiData(
        apiList.CORPORATE_BULKUPLOAD_OTP,
        payload
      );

      if (response.status) {
        handleOpen()
        setPayloadData(data)
        // setAirtelFile("bulkpayment","")
        reset()
        // SweetAlertPopup(response.message, "Success", "success");
      } else {
        SweetAlertPopup(response.message, "Error", "error");
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
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
    width: "150px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#707070",

    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    background: "#FFF",
    border: "1px solid #707070",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "150px",
    height: "40px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));


  //   // { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "fromAccountNo",
  //     headerName: "From Account No",
  //     width: 200,
  //     editable: true,
  //   },
  //   {
  //     field: "fileName",
  //     headerName: "File Name",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "transferMethod",
  //     headerName: "Transfer Method",
  //     type: "number",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "totalAmount",
  //     headerName: "Total Amount",
  //     type: "number",
  //     width: 200,
  //     editable: true,
  //   },
  // ];

  // const columns = [
  //   {
  //     name: 'Sr. No.',
  //     label: 'Sr. No.',
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: 'Batch Code',
  //     label: 'Batch Code',
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: 'Total Records',
  //     label: 'Total Records',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Total Amount',
  //     label: 'Total Amount',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Transfer Type',
  //     label: 'Transfer Type',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Transfer Method',
  //     label: 'Transfer Method',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Request By',
  //     label: 'Request By',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Transaction Date & Time',
  //     label: 'Transaction Date & Time',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Status',
  //     label: 'Status',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: 'Remark',
  //     label: 'Remark',
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  // ];

  const columns = [
    // {
    //   name: 'Sr. No.',
    //   label: 'Sr. No.',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'fileName',
      label: 'File Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'totalamount',
      label: 'Total Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transferMehtod',
      label: 'Transfer Method',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'fromAccount',
      label: 'From Account',
      options: {
        filter: true,
        sort: false,
      },
    },
  ]

  const apiData = [
    {
      status: true,
      msg: "Success",
      transhistory: [
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },

        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "NEFT",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "NEFT",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },
        {
          fromAccountNo: "409007612866",
          fileName: "ABC123456",
          transferMethod: "IMPS",
          totalAmount: "₹ 20000.00",
        },
      ],
    },
  ];



  const apiRows =
    apiData[0]?.transhistory.map((row, index) => ({ ...row, id: index })) || [];

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <Grid container>
        {/* <Grid item xs={12} sm={12} md={2}> */}
        {/* <GoBackButton></GoBackButton> */}
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={12} md={2}> */}
        <div className={classes.paymentMainHeading}>Payments</div>
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={12} md={5}></Grid>
        <Grid item xs={12} sm={12} md={3}></Grid> */}
      </Grid>
      <div className={classes.gridtitle}>Bulk Payment Upload</div>
      <div className={classes.cardsBox}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              columnSpacing={4}
              rowSpacing={4}
              style={{ padding: "1vw" }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Transfer Type
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <RadioGroupForm
                      controlerProps={{
                        control: control,
                        name: "tranferType",
                      }}
                      data={[
                        // {
                        //   label: "Own Account",
                        //   value: "Own Account",
                        // },
                        {
                          label: "Internal",
                          value: "Internal",
                        },
                        {
                          label: "Other Bank",
                          value: "Other",
                        },
                      ]}
                      errorMessage={
                        "Tranfer Type" + errorMessages.error_autocomplete_message
                      }
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    From Account<sup className={classes.required}>*</sup>
                  </div>
                  <AutocompleteForm
                    controlerProps={{
                      control: control,
                      name: "accountNumber",
                    }}
                    TextFieldProps={{
                      // style: { width: "28vw" },

                      placeholder: "Select Account Number",
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
                        "Account Number " +
                        errorMessages.error_autocomplete_message,
                    }}
                    // data={accountHomebank}
                    data={accountList}
                    required={true}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdata11}>
                  <div className={classes.frowtext}>
                    Choose File<sup className={classes.required}>*</sup>
                  </div>
                  {/* <AutocompleteForm
                    controlerProps={{
                      control: control,
                      name: "accountNumber",
                    }}
                    TextFieldProps={{
                      // style: { width: "28vw" },

                      placeholder: "Select Account Number",
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
                        "Account Number " +
                        errorMessages.error_autocomplete_message,
                    }}
                    // data={accountHomebank}
                    data={accountList}
                    required={true}
                  /> */}


                  <div className={classes.uploadContainer}>
                    <div className={classes.chooseFile}>
                      <input type="file" name="bulkpayment" className={classes.inputfile} accept=".csv" onChange={handleFileChangeAirtelFile} />
                    </div>

                    <div className={classes.uploadFile}>
                      <img src={UploadIcon} alt="upload file" />
                    </div>
                  </div>

                </div>
              </Grid>

              {watch("tranferType") == "Other" ? <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Transfer Method
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <RadioGroupForm
                      controlerProps={{
                        control: control,
                        name: "tranferMethod",
                      }}
                      data={[
                        {
                          label: "IMPS",
                          value: "IMPS",
                        },
                        {
                          label: "NEFT",
                          value: "NEFT",
                        },
                        {
                          label: "RTGS",
                          value: "RTGS",
                        },
                      ]}
                    // errorMessage={
                    //   errorMessages.error_type_message + "Delivery day"
                    // }
                    // required={true}
                    />
                  </div>
                </div>
              </Grid> : null}

              <Grid item xs={12} sm={12} md={6}>
                <div className={classes.frowdataaff}>
                  <div className={classes.frowtextaff}>
                    Remarks
                    <sup className={classes.required}>*</sup>
                  </div>
                  <div className={classes.widthtfield}>
                    <TextFieldForm
                      controlerProps={{
                        control: control,
                        name: "remark",
                        rows: 5,
                        maxRows: 10,
                      }}
                      TextFieldProps={{
                        // label: "Name",
                        placeholder: "Remark",
                        // style: { width: "33vw" },
                        fullWidth: true,
                      }}
                      regExp={/^[a-zA-Z 0-9]+$/}
                      rules={{
                        required:
                          "Remark" +
                          errorMessages.error_autocomplete_message,
                      }}
                      required={true}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}></Grid>
              {/* <Grid item xs={12} sm={12} md={6}></Grid>
              <Grid item xs={12} sm={12} md={2}>
              <ColorButton1 variant="contained" onClick={onDownloadExcel}>
                  Sample File
              </ColorButton1>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <ColorButton2 variant="contained" type="button" onClick={() => reset()}>
                  Reset
                </ColorButton2>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <ColorButton1 variant="contained" type="submit">
                  Submit
                </ColorButton1>
              </Grid> */}
            </Grid>
            <div className={classes.buttonFile}>
              <div>
                <ColorButton1 variant="contained" onClick={onDownloadExcel}>
                  Sample File
                </ColorButton1>
              </div>
              <div>
                <ColorButton1 variant="contained" onClick={reset}>
                  Reset
                </ColorButton1>
              </div>
              <div>
                <ColorButton1 variant="contained"  type="submit" >
                  Submit
                </ColorButton1>
              </div>
            </div>



            <Grid item xs={12} sm={12} md={9}></Grid>

            <Grid item xs={12} sm={12} md={12}>
              <div className={classes.addNewSinglePaymentBG}>
                <div className={classes.addNewSinglePaymentButton}>
                  ⨁ Add Other Single Payment
                </div>

              </div>
            </Grid>


            <Grid container>
              <Grid
                sx={{
                  paddingTop: "1rem",
                  // margin: "2rem",
                  // paddingLeft: "1rem",
                  marginLeft: '1rem'
                }}
                item
                xs={12}
                sm={12}
                md={12}
              >
                {/* <Box sx={{ height: 400, width: "100%" }}> */}
                {/* <DataGrid
                      rows={apiRows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    /> */}
                <MUIDataTable
                  // title={"Announcement List"}
                  // data={data ? data : []}
                  data={bulkUploadList}
                  columns={columns}
                  options={{
                    ...options,
                    onRowClick: (rowData) => {
                      console.log("rowData", rowData)
                      handleRowClick(rowData)
                    },
                  }}
                />
                {/* </Box> */}
              </Grid>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3}></Grid>
              <Grid item xs={12} sm={12} md={3}></Grid>
              <Grid item xs={12} sm={12} md={3}>
                <ColorButton2 variant="contained" type="button">
                  Remove
                </ColorButton2>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <ColorButton1 variant="contained" type="button" onClick={()=>navigate("/payments/bulkFundTransferPreview")}>
                  Preview
                </ColorButton1>
              </Grid> */}

          </Box>
          {open ? (
            <OtpCorporateModal
              open={open}
              handleClose={handleClose}
              payloadData={payloadData}
              fileData={airtelFile}
              airtelFileUpload={airtelFileUpload}
              setAirtelFile={setAirtelFile}
              Transfertype={watch("tranferType")}
            />
          ) : null}
        </div>
      </div >
    </>
  );
};

export default BulkTransfer;
