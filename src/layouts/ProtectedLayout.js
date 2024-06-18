import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import MainContainer from '../containers/MainContainer/MainContainer';
import { PROTECTED_ROUTES } from '../routes/Routes';
import ChangePassword from '../containers/Login/ChangePassword';

const ProtectedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeParentRoute, setActiveParentRoute] = useState({});
  const [activeChildRoute, setActiveChildRoute] = useState({});

  return (
    <div className='app-container'>
      <Routes>

      <Route path='/changepass' element={<ChangePassword/>} />
      </Routes>

      <Header analytics={{}} />
      <div className='main-content'>
        <Sidebar activeRoute={activeParentRoute} setActiveRoute={setActiveParentRoute} />
        <Routes>
          <Route path='/*' element={<MainContainer title={activeChildRoute?.name || activeParentRoute?.name} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedLayout;
