import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import './App.css';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Register from './containers/Register/Register';
import AppLogout from './layouts/AppLogout';
import { useDispatch, useSelector } from 'react-redux';
import { postApiData } from './components/utilities/nodeApiServices';
import { apiList } from './components/utilities/nodeApiList';
import { logout } from './store/authSlice';
import SweetAlertPopup from './components/common/sweetAlertPopup';


function App() {

  const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch()


  return (
    <div className='App'>
      <Router basename='/vakrangeeatmadminportal'>
      <AppLogout />
        <Routes>
          {/* <Route exact path='/register' element={<Register />} /> */}

          <Route exact path='/auth/*' element={<AuthLayout />} />
          {/* <Route exact path='/atmmaster/brwatmmasterlist' element={<DepartmentBrowseList />} /> */}
          <Route
            exact
            path='/*'
            element={
              <PrivateRoute> 
                  <ProtectedLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
