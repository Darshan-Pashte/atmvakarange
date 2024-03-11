import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from '../CorporateFundTransfer/CorporateFundTransfer.module.css'
import WithinBankPaymentDetails from './WithinBankPaymentDetails';
import WithinBankPreview from './WithinBankPreview';
import WithinBankSummary from './WithinBankSummary';
import SelfAccountPaymentDetails from './SelfAccountPaymentDetails';
import SelfAccountPreview from './SelfAccountPreview';
import SelfAccountSummary from './SelfAccountSummary';
import OtherAccountPaymentDetails from './OtherAccountPaymentDetails';
import OtherAccountPreview from './OtherAccountPreview';
import OtherAccountSummary from './OtherAccountSummary';


  

const OtherAccount = () => {

    const [value, setValue] = React.useState('1');
    const [value1, setValue1] = React.useState('4');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  return (
    <>
    
    
    
    
    <div className={classes.cardsmainpage}>
        <div className={classes.maintabbelowheading}> To Other Account</div>
         <Box  className={classes.tableMainBox} sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value1}>
 
 
          <Box sx={{  borderBottom: 1,
               borderColor: "divider",
               backgroundColor: " #DAE2F6",
               borderRadius: '8px 8px 0 0',}}>
          
         
 
           <TabList onChange={handleChange1} aria-label="lab API tabs example">
             Within ABC Bank
             <Tab label="Payment Details" value="4"  />
             <Tab label="Preview & Confirm" value="5" />
             <Tab label="Summary" value="6" /></TabList>
             </Box>
       <TabPanel value="4"><OtherAccountPaymentDetails/></TabPanel>
         <TabPanel value="5"><OtherAccountPreview/></TabPanel>
         <TabPanel value="6"><OtherAccountSummary/></TabPanel>
        
         </TabContext>
         </Box>
         </div>
    </>
  )
}

export default OtherAccount
