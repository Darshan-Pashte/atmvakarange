import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import classes from "../../containers/MainContainer/AtmPortal/Airtel.module.css";
import { PROTECTED_ROUTES } from '../../routes/Routes';
import { Button } from '@mui/material';
import Routes from '../../routes/Routes';

const EditsIcons = ({ rowIndex, data, handleNavigate, url, topLevelPath , url1}) => {
  const { PROTECTED_ROUTES } = Routes()
  const shouldRenderEditIcon = PROTECTED_ROUTES.some(route => {
    console.log("route?.childRoutes?.length",route?.childRoutes?.length);
    if(route?.childRoutes?.length){
      const childRoute = route.childRoutes?.find(child => child?.url === url1);
      if (childRoute?.grandChild[0]?.arr=="1") {
        // You might need to specify a specific condition to determine if an edit icon should be shown
        return true;
      }
      else return false;
    }
      else{
      if (route?.url === url1 && route?.grandChild[0]?.arr=="1") {
        // You might need to specify a specific condition to determine if an edit icon should be shown
        return true;
      }
      else return false;
      }
    }
   
  );

  return (
    <>
      {shouldRenderEditIcon ? (
        <span
          className={classes.editButton}
        >
         <Button sx={{color:"black"}} onClick={() => handleNavigate(url, data[rowIndex])}><EditIcon /></Button> 
        </span>
      ) : (
        <span><Button disabled ><EditIcon/></Button></span>
      )}
    </>
  );
};

export default EditsIcons;
