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
    width: "30vw",
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

export default function RegenerateFileModal({ open, handleOpen, handleClose, closeSignModal,rowDataToDisplay, data,show ,title,payload}) {
    

    console.log("payloadInfo",payload)
   
   
    const [isLoading, setIsloading] = React.useState(false);
    const [bankcode, setBankCode] = React.useState([]);
    const [bankdata, setBankData] = React.useState([]);

    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
      );

      
  const getFileGenerate = async (data) => {
    console.log('data',data)
    setIsloading(true);
    try {
    //   const payload = {
    //     payload
    //   };

      const response = await postApiData(
        apiList.LOCAL_ACQUIRE_FILE_GENERATE,
        payload
      );

console.log('response',response)
      if (response?.data?.status == true) {
        SweetAlertPopup(response?.data?.message, "Success", "success");
                    setIsloading(false);
                    handleClose()
    
      } else {
     
        SweetAlertPopup(response.data.message, "Error", "error");
        handleClose()
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
      handleClose()
    }
  };



     
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
                    <div className={classes.headerTitle} style={{fontSize:'18px',padding:'8px'}}>File already exists</div>
                    <Button className={classes.headerLogo}  style={{transform:'scale(1.6)'}} onClick={handleClose}><CancelRoundedIcon/></Button>
                    </div>
                  
                  <div style={{fontSize:'16px',marginTop:'10px',fontWeight:'500'}}>If you want to download again click on yes</div>

                  <div style={{display:'flex',gap:'15px',margin:'15px 0 25px 0'}}>

                  <div style={{display:'flex',justifyContent:'center',alignContent:'center',gap:'5px'}}>
                    
                  <input type="radio" id="yes" name="fav_language" value="yes" onClick={getFileGenerate}/>
<label for="yes" style={{fontSize:'15px',fontWeight:'500'}}>Yes</label>
                  </div>



                  
                  <div style={{display:'flex',justifyContent:'center',alignContent:'center',gap:'5px'}}>
<input type="radio" id="no" name="fav_language" value="no" onClick={handleClose}/>
<label for="no" style={{fontSize:'15px',fontWeight:'500'}}>No</label>
</div>
</div>
                </Box>
                </>
            </Modal>
        </div>
    );
}