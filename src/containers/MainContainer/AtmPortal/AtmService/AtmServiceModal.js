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
            atmId:rowData[0]
          };
          const response = await postApiData(apiList.ATM_SERVICE_DATA+`${apipath}`, payload);
          if(response?.data?.status == true){
            setBankCode(response?.data?.message);
            setBankData(response?.data);
          setIsloading(false);
          }else{
            setBankCode(response?.data?.message);
          }
          
        } catch (err) {
          console.log(err);
        } 
      };

      console.log('bankdata',bankdata)
    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
               <Box sx={style} className={classes.popup}>
                    <div className={classes.header}>
                    <div className={classes.headerTitle} style={{fontSize:'18px',padding:'8px'}}>ATM ID - {rowData[0]}</div>
                    <Button className={classes.headerLogo}  style={{transform:'scale(1.6)'}} onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                    <div className={classes.modalContent} style={{width:'100%'}}>
                        <div style={{fontSize:'14px',padding:'8px',fontWeight:'600'}} >

                        {bankcode}
                        
                        </div>
                        <div style={{fontSize:'18px',padding:'8px'}}  >

                       {titletext} : {bankdata[2]}
                        </div>
                        

                    </div>
                </Box>
            </Modal>
        </div>
    );
}