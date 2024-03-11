import { createContext } from 'react';
 
// Creating the context object and passing the default values.
const RegisterContext = createContext({otpDisplay:false,setOtp:()=>{},custNo:()=>{}});
 
export default RegisterContext;