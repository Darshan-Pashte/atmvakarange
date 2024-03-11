import React from 'react'
import { useNavigate } from 'react-router-dom';
import classes from '../common/GoBackButton.module.css'
import { Button } from '@mui/material';
import styled from 'styled-components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const GoBackButton = () => {

    const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This will go back to the previous page or route
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
   
     background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    // width: "183px",
    // height: "40px",
    // "&:hover": {
    //   background: "#808080",
    //   color: "white",
    // },
  }));


  return (
   <>
   
   
<div className={classes.mainbuttonpage} >  
<ColorButton1 style={{ color:"var(--button-color)",fontSize:'13px'}} onClick={goBack}><KeyboardBackspaceIcon/>Back</ColorButton1>
</div>
   
   
   </>
  )
}

export default GoBackButton
