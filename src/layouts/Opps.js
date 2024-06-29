import classes from './opps.module.css';

import styled from 'styled-components';

import { Button } from '@mui/base';


const Opps = () => {
 

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFF",
    
    // backgroundColor: "#F84B67",
    // backgroundColor: "#AA1313",
    backgroundColor: "#042879",
    fontFamily:'Poppins',
    boxShadow:' 0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
    fontSize:'15px',
    
    // border: "1px solid #CCC",
    border:'none',
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "20%",
    height: "38px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));




  return (
    <>
     
      <div className={classes.Opps}>
       Opps............
      
      </div>

      <div className={classes.OppsButton}>
      <ColorButton1>Login Again</ColorButton1>
      </div>
    </>

  );
};

export default Opps;
