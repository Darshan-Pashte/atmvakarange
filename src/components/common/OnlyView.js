import * as React from 'react';
import Box from '@mui/material/Box';
import classes from '../../containers/MainContainer/AtmPortal/Airtel.module.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ClassNames } from '@emotion/react';
import { styled } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';



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


export default function OnlyView({ open, handleOpen, handleClose, closeSignModal,rowDataToDisplay, data,show ,title}) {
    const { headers, rowData } = rowDataToDisplay;

    console.log("rowData",rowData)
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

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
               <Box sx={style} className={classes.popup}>
                    <div className={classes.header}>
                    <div className={classes.headerTitle}>{title}</div>
                    <Button className={classes.headerLogo} onClick={closeSignModal}><CancelRoundedIcon/></Button>
                    </div>
                    <div className={classes.modalContent} style={{width:'100%'}}>
                        <table style={{width:'100%'}}>
                            <tbody style={{border:'1px solid lightgrey'}}>
                                {headers.map((header, i) => (
                                    <tr key={i} style={{border:'1px solid lightgrey'}}>
                                        <td className={classes.tableHead} style={{border:'1px solid lightgrey',textAlign:'center'}}>{header}</td> 
                                        {
                                            show==="1" ? <td style={{textAlign:'center'}}>{mappedRowData[i]}</td> : <td style={{textAlign:'center'}}>{mappedRowData[i+1]}</td>
                                            // <td>{rowData[i+(Number(show)-1)]}</td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}