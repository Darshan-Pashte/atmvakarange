import { useEffect } from "react";
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




  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, [user]);

  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const logoutAction = () => {
    handleLogout()
    // localStorage.clear();
    // // window.location.pathname = "/vakrangeeatmadminportal/auth/login";
    // sessionStorage.clear();
    // // localStorage.clear();
    // window.location.reload();
    // // SweetAlertPopup( 'User Logout due to Inactivity',"Oops Logout!!!", "error");
    // window.location.href = "/vakrangeeatmadminportal/auth/login"
  };



  return children;
};

export default AppLogout;