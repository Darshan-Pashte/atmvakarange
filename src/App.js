import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import './App.css';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import Register from './containers/Register/Register';
import AppLogout from './layouts/AppLogout';


function App() {
  // useEffect(() => {
  //   const handleOffline = () => {
  //     // alert("The network connection has been lost.");
  //     Swal.fire({
  //       title: "error",
  //       text: "The network connection has been lost",
  //       icon: "error",
  //       // showCancelButton: true,
  //       // confirmButtonText: 'Yes',
  //       // cancelButtonText: 'No',
  //     });
  //   };

  //   const handleOnline = () => {
  //     // alert(" Welcome.. You are now connected to the network");
  //     Swal.fire({
  //       title: "success",
  //       text: "Welcome.. You are now connected to the network",
  //       icon: "success",
  //       // showCancelButton: true,
  //       // confirmButtonText: 'Yes',
  //       // cancelButtonText: 'No',
  //     });
  //   };

  //   window.addEventListener("offline", handleOffline);
  //   window.addEventListener("online", handleOnline);

  //   return () => {
  //     window.removeEventListener("offline", handleOffline);
  //     window.removeEventListener("online", handleOnline);
  //   };
  // }, []);
  return (
    <div className='App'>
       <AppLogout>
      <Router basename='/vakrangeeatmadminportal'>
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
      </AppLogout>
    </div>
  );
}

export default App;
