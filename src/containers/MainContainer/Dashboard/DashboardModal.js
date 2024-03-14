import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../AtmPortal/Airtel.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useSelector } from 'react-redux';
import { apiList } from '../../../components/utilities/nodeApiList';
import { postApiData } from '../../../components/utilities/nodeApiServices';
import GridTablePagination from '../../../components/common/gridTablePagination';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vw",
    bgcolor: 'background.paper',
    // boxShadow: 24,
    // p: 4,
    borderRadius:'15px'
};


export default function DashboardModal({ open, handleOpen, handleClose, closeSignModal,rowDataToDisplay, data,show ,title,apipath,titlename}) {
    // const { headers, rowData,apipath,titletext } = rowDataToDisplay;
console.log('apipath',apipath)
console.log('titlename',titlename)
    // console.log("rowData",rowData)
    
    const [isLoading, setIsloading] = React.useState(false);
    const [bankcode, setBankCode] = React.useState([]);

    const [atmMasterList, setAtmMasterList] = React.useState([]);
  

    const [tableHeaders, setTableHeaders] = React.useState([]);
  
    
    const [totalRecord, settotalRecord] = React.useState(0);
    const [goPageNumber, setGoPageNumber] = React.useState(5); 
    const [currentPage, setCurrentPage] = React.useState(1);
    const [payloadData, setPayloadData] = React.useState({})

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
      );


      const columns = [
  
       
        {
          name: "atmId",
          label: "ATM ID",
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
        {
          name: "atmtype",
          label: "ATM Type",
          options: {
            filter: true,
            sort: false,
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
          name: "atmstatus",
          label: "ATM Status",
          options: {
            filter: true,
            sort: false,
          },
        },
        // {
        //   name: "serverip",
        //   label: "Service Ip",
        //   options: {
        //     filter: true,
        //     sort: false,
        //   },
        // },
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
            //   control={control}
            
              onPageChange={(page) => {
                getTransactionListView(page)
              }}
            />
          );
        },
      };
    
      const getMuiTheme = () =>
      createTheme({
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                // boxShadow: "none",
                // backgroundColor: "#f5f6fA",
                // boxShadow:'0 0 3px #999'
                border: "1px solid lightgrey",
              },
            },
          },
          MuiTableHead: {
            root: {
              "& .customTableHead": {
                background: "red", // Replace with your desired background color
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                paddingTop: "8px", // Adjust the top padding value as needed
                paddingBottom: "8px",
                // lineHeight: "1.5",
                border:'1px solid grey'
              },
            },
          },
          MuiTableRow: {
            styleOverrides: {
              root: {
                // Adjust the space between rows by adding margin or padding
                marginBottom: "10px", // Adjust the value as needed
              },
            },
          },
        //   MuiTypography: {
        //     styleOverrides: {
        //       root: {
        //         lineHeight: "3.5", // Adjust the line height as needed
        //       },
        //     },
        //   },
        },
      });
      
      React.useEffect(()=>{
        // getTransactionListView()
        onSubmit()
      },[]) 
    
      
      const getTransactionListView = async (currentPage,data = payloadData) => {
    
      
        setCurrentPage(currentPage)
        setIsloading(true);
        try {
          const payload = {
            username: user?.username,
            sessionId: user?.sessionId,
         
           
          };
    
          const response = await postApiData(
            apiList.DASHBOARD_INSERVICE_BROWSE +`${apipath}` + `?pageNo=${currentPage}&pageSize=${goPageNumber}`,
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
        console.log("payloadDatachild", payloadDatachild)
        getTransactionListView(currentpages, payloadDatachild)
        setPayloadData(payloadDatachild)
        
    
      }
      
    
      const onSubmit = (data) => {
        let payload = {
          username: user?.username,
          sessionId: user?.sessionId,

       
          // transtype: data.transtype ? data.transtype.code :"all",
        };
        getTransactionList(1, payload)
        //  setpalyalodData(payload)
        //  reset(defaultFormData);
    
      }
    
    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
               <Box sx={style} className={classes.popup}>
                    <div className={classes.header} style={{zIndex:'1111'}}>
                    <div className={classes.headerTitle}>{titlename}</div>
                    <Button className={classes.headerLogo} onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                    <div className={classes.modalContent} style={{width:'100%',padding:'10px'}}>
                    <div className={classes.Sbox2} style={{width:'100%'}}>
              {/* <div className={classes.bluerow}>UPI Transaction List</div> */}
              <div style={{ width: "100%" ,marginBottom:'10px'}}>
              <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={titlename}
                  data={atmMasterList}
                  columns={columns}
                  options={options}
                />
                    </ThemeProvider>
              </div>
            </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}