import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../../AtmPortal/Airtel.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useSelector } from 'react-redux';
import { apiList } from '../../../../components/utilities/nodeApiList';
import { postApiData } from '../../../../components/utilities/nodeApiServices';
import Loader from '../../../../components/common/loader';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40vw",
    bgcolor: 'background.paper',
    // boxShadow: 24,
    // p: 4,
    borderRadius:'15px'
};

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

export default function ATMServiceModal({ open, handleOpen, handleClose, closeSignModal,rowDataToDisplay, data,show ,title}) {
    const { headers, rowData,apipath,titletext } = rowDataToDisplay;

    // console.log("rowData",rowData)
    const mappedRowData = rowData.map((value) => {
        if (value === "Y") {
          return "YES";
        } else if (value === "N") {
          return "NO";
        } else {
          return value;
        }
      });
    // const filteredRowData = rowData.filter((_, index) => headers.includes(rowDataToDisplay.headers[index]));
    // const headerDataMap = {};
    // headers.forEach((header, index) => {
    //   headerDataMap[header] = rowData[index];
    // });
    const [isLoading, setIsloading] = React.useState(false);
    const [bankcode, setBankCode] = React.useState([]);
    const [bankdata, setBankData] = React.useState([]);

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
      );

      React.useEffect(()=>{
getData()
      },[])

      const getData = async () => {
        setIsloading(true);
        try {
          const payload = {
            
            username: user?.username,
            sessionId: user?.sessionId,
            atmId:rowData[1]
          };
          const response = await postApiData(apiList.ATM_SERVICE_DATA+`${apipath}`, payload);
          if(response?.data?.status == true){
            setBankCode(response?.data?.message);
            setBankData(response?.data);
          setIsloading(false);
          }else{
            setBankCode(response?.data?.message);
            setIsloading(false);
          }
          
        } catch (err) {
          console.log(err);
        } 
      };

      const responseArray = Object.values(bankdata);
    //  const  dummyData = 'State Data : {"StateTabledata27":"22|007||9","StateTabledata28":"22|007||9","StateTabledata17":"22|007||9","StateTabledata29":"22|007||9","StateTabledata18":"22|007||9","StateTabledata19":"22|007||9","StateTabledata23":"22|007||9","StateTabledata34":"22|007||9","StateTabledata24":"22|007||9","StateTabledata35":"22|007||9","StateTabledata25":"22|007||9","StateTabledata36":"22|007||9","StateTabledata26":"22|007||9","StateTabledata4":"22|007||9","StateTabledata30":"22|007||9","StateTabledata20":"22|007||9","StateTabledata31":"22|007||9","StateTabledata32":"22|007||9","StateTabledata22":"22|007||9","StateTabledata5":"22|007||9","StateTabledata33":"22|007||9","StateTabledata2":"22|007||9","StateTabledata1":"22|007||9","StateTabledata7":"22|007||9"}'
      const convertedData = responseArray && responseArray[2]?.replace(/,/g,",\n")
      console.log('bankdata',bankdata)
      console.log('convertedData',convertedData)
    return (
        <div>
              {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
               <Box sx={style} className={classes.popup}>
                    <div className={classes.header}>
                    <div className={classes.headerTitle} style={{fontSize:'18px',padding:'8px'}}>ATM ID - {rowData[1]}</div>
                    <Button className={classes.headerLogo}  style={{transform:'scale(1.6)'}} onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                    <div className={classes.modalContent} style={{width:'100%'}}>
                        <div style={{fontSize:'14px',padding:'8px',fontWeight:'600'}} >

{/* {
  !convertedData == undefined ? bankcode : ''
}
                         */}
                     

                     {bankcode}
                        </div>
                        <div style={{fontSize:'18px',padding:'8px',lineBreak:'anywhere'}}  >

                       {titletext} : {convertedData}
                        </div>
                        <div style={{display:"flex",justifyContent:"center",marginTop:"1vw"}}>
                        <ColorButton1 onClick={handleClose} style={{display:"flex",justifyContent:"center"}}>
                          OK
                        </ColorButton1>
                        </div>
                    </div>                   
                </Box>
            </Modal>
        </div>
    );
}