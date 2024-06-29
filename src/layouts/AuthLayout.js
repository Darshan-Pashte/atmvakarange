import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../containers/Login/Login';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
// import ATMVerify from '../containers/Login/ATMVerify';
import Register from '../containers/Register/Register';
import ForgetPassword from '../containers/ForgetPassword/ForgetPassword';
import ForgotPassword from '../containers/Login/ForgotPassword';
import ResetPassword from '../containers/Login/ResetPassword';
import ChangePassword from '../containers/Login/ChangePassword';
import Opps from '../layouts/Opps'
// import ForgetPasswordCorporate from '../containers/ForgetPasswordCorporate/ForgetPasswordCorporate';

const AuthLayout = () => {
  const { loading, error ,isAuthenticated,menu} = useSelector((state) => state.auth);
  // console.log("isAuthenticated",isAuthenticated)
  // console.log("isAuthenticated",menu)

// useEffect(() => {
//   if (window.location.href.includes("/dashboard"))
//   {
//      window.location.reload();
//   }
// }, [isAuthenticated]); 




  return (
    <Routes>
      {/* <Route path='/login' element={state.isAuthorized ? <Navigate to='/dashboard' /> : <Login />} /> */}
      <Route path='/login' element={isAuthenticated ? <Navigate  to='/dashboard' /> : <Login />} />
      <Route path='/register' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <Register />} />
      <Route path='/forgetpassword' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <ForgotPassword />} />
      <Route path='/resetpassword' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <ResetPassword />} />
      <Route path='/changepass' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <ChangePassword />} />
      <Route path='/opps' element={isAuthenticated ? <Navigate  to='/dashboard'/> : <Opps/>} />
      {/* <Route path='/atmverify' element={ <ATMVerify />} /> */}
     
    </Routes>
  );
};

export default AuthLayout;
