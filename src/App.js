import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import './App.css';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
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
  // const navigate = useNavigate()
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

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        // Perform logout logic here, e.g., call a logout function or clear user session
        try {
          // setIsLoading(true);
          const payload = {
            username: user?.username,
            sessionId: user?.sessionId,
          };
          await postApiData(apiList.LOGOUT, payload).then((response) => {
            console.log(response);
            if (response?.data?.status === true) {
              dispatch(logout());
              window.location.href = "/vakrangeeatmadminportal/auth/login"
              // setIsLoading(false);
            } else {
              // SweetAlertPopup("User Logout Failed", "Error", "error");
              // setIsLoading(false);
            }
          }).catch(err => {
            console.log(err)
          })
    
        } catch (error) {
          console.log("An error occurred during logout", error);
          SweetAlertPopup("An error occurred during logout", "Error", "error");
          // setIsLoading(false);
        }
        console.log("Logging out user...");
      }
    };

    const handleBeforeUnload = () => {
      handleVisibilityChange();
    };

    window.addEventListener('unload', handleBeforeUnload);

    return () => {
      window.removeEventListener('unload', handleBeforeUnload);
    };
    // document.addEventListener('visibilitychange', handleVisibilityChange);

    // return () => {
    //   document.removeEventListener('visibilitychange', handleVisibilityChange);
    // };
  }, []);

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
