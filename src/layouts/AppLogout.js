import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SweetAlertPopup from "../components/common/sweetAlertPopup";
import { postApiData } from "../components/utilities/nodeApiServices";
import { apiList } from "../components/utilities/nodeApiList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import opps from "./Opps.svg";


const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {

  const location = useLocation()
  let timer;
  const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log("user", user)
  console.log("location", location)


  const handleLogout = async () => {
    try {
      const payload = {
        username: JSON.parse(sessionStorage.getItem("username")),
        sessionId: JSON.parse(sessionStorage.getItem("TOKEN")),
      };
      await postApiData(apiList.LOGOUT, payload).then((response) => {
        console.log(response);
        if (response?.data?.status === true) {
          dispatch(logout());
          sessionStorage.clear()
          localStorage.clear()
          window.location.reload();
          window.location.href = "/vakrangeeatmadminportal/auth/opps"
        } else {

        }
      }).catch(err => {
        console.log(err)
      })

    } catch (error) {
      console.log("An error occurred during logout", error);
      SweetAlertPopup("An error occurred during logout", "Error", "error");
    }
  };

  const handleLogoutTimer = () => {
    // 10000ms = 10secs. You can change the time.
    if (location.pathname !== "/auth/login") {
      timer = setTimeout(async () => {
        resetTimer();
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetTimer);
        });
        // window.location.pathname = "/vakrangeeatmadminportal/auth/opps";
        handleLogout();

      },180000
      );
    }
  };

  useEffect(() => {

    const handleBeforeUnload = (event) => {
      handleLogout()
      const confirmationMessage = "Are you sure you want to leave this page?";
      (event || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handleVisibilityChange = () => {

     

      console.log("document.visibilityState",document.visibilityState);
      if (document.visibilityState === 'hidden') {
        handleLogout();
      }
    };

    const handleUnloadAction = async () => {
      debugger
     await handleLogout();
      
    };
    const handlePageHide = () => {
      handleLogout();
    };
   
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnloadAction);
   
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnloadAction);
    
    };
  }, []);


  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, [user]);

 
  const logoutAction = () => {
    handleLogout()
   
  };



  return children;
};

export default AppLogout;