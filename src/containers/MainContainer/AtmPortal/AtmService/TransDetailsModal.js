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
import SweetAlertPopup from '../../../../components/common/sweetAlertPopup';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "35vw",
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

export default function TransDetailsModal({ open, handleOpen, handleClose, closeSignModal,rowDataToDisplay, data,show ,title,details}) {
    

    console.log("payloadInfo",details)
   
   
    const [isLoading, setIsloading] = React.useState(false);
    const [bankcode, setBankCode] = React.useState([]);
    const [bankdata, setBankData] = React.useState([]);

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
      );

      
 function getTime(value){
    const formattedDate = new Date(value).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const formattedTime = new Date(value).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const formattedDateTime = `${formattedDate.replace(/\s/g, '-')}, ${formattedTime}`;
    return (
        
          formattedDateTime
    
      );
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
                <>
               <Box sx={style} className={classes.popup}>
               <div className={classes.header}>
                    <div className={classes.headerTitle} style={{fontSize:'18px',padding:'8px'}}>Last Transaction Details</div>
                    <Button className={classes.headerLogo}  style={{transform:'scale(1.6)'}} onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                  
                    <div className={classes.modalContent} style={{width:'100%'}}>
 
                    <table style={{width:'100%'}}>
        {/* <thead>
            <tr>
                <th>Attribute</th>
                <th>Value</th>
            </tr>
        </thead> */}
        <tbody>
            <tr>
                <td style={{fontSize:'14px',fontWeight:'500'}}>ATM ID</td>
                <td style={{fontSize:'14px',fontWeight:'500'}}>{details[0]?.atmId}</td>
            </tr>
            <tr>
                <td style={{fontSize:'14px',fontWeight:'500'}}>Last Transaction Date</td>
                <td style={{fontSize:'14px',fontWeight:'500'}}>{getTime(details[0]?.lastTransDateTime)}</td>
            </tr>
            <tr>
                <td style={{fontSize:'14px',fontWeight:'500'}}>Total Transaction Till Now(Today)</td>
                <td style={{fontSize:'14px',fontWeight:'500'}}>{details[0]?.totalTrans}</td>
            </tr>
            <tr>
                <td style={{fontSize:'14px',fontWeight:'500'}}>Total Transaction in Last 10 Min.</td>
                <td style={{fontSize:'14px',fontWeight:'500'}}>{details[0]?.transLast10min}</td>
            </tr>
            <tr>
                <td style={{fontSize:'14px',fontWeight:'500'}}>Machine Status</td>
                <td style={{fontSize:'14px',fontWeight:'500'}}>{details[0]?.atmStatus}</td>
            </tr>
          
          
         
        </tbody>
    </table>


                    </div>
                </Box>
                </>
            </Modal>
        </div>
    );
}