import { useEffect } from "react";
import Swal from "sweetalert2";
import SweetAlertPopup from "../components/common/sweetAlertPopup";
import { postApiData } from "../components/utilities/nodeApiServices";
import { apiList } from "../components/utilities/nodeApiList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";


const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {

  let timer;
  const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log("user",user)

  const handleLogout = async () => {
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
          navigate("/auth/login");
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
  };

  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      handleLogout();
      // Swal.fire({
      //     title: "Session has been expired!!!",
      //     icon: "question",
      //     showDenyButton: false,
      //     showCancelButton: false,
      //     confirmButtonText: "Opp's Logged Out !" ,
      //     denyButtonText: `Deny`,
      //     allowOutsideClick: false,  // Disable outside click to close the modal
      //     allowEscapeKey: false,    // Disable escape key to close the modal
      //     allowEnterKey: false,     // Disable enter key to close the modal
      //   }).then((result) => {
      //     /* Read more about isConfirmed, isDenied below */
      //     if (result.isConfirmed) {
      //         localStorage.clear();
      //     // window.location.pathname = "/vakrangeeatmadminportal/auth/login";
      //     sessionStorage.clear();
      //     // localStorage.clear();
      //     window.location.reload();
      //     window.location.href = "/vakrangeeatmadminportal/auth/login"
      //     } else if (result.isDenied) {

      //     }
      //   })

    // }, 3600000
    }, 30000
    ); // 10000ms = 10secs. You can change the time.
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