import classes from './Header.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import ProfileIcon from './assets/profile.jpg';
import SettingIcon from './assets/SettingsFilled.svg';
import LogoutIcon from './assets/LogoutFilled.svg';
import ViewProfileIcon from './assets/PersonFilled.svg';
import { REMOVE_USER } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import ChevronDown from '../../assets/chevron-down.svg';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/swiftcore_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
// import headerLogo from "../../assets/headerLogo.png";
// import headerLogo from "../../assets/images/commonforweb/silkpay.png";
import headerLogo from "../../assets/images/commonforweb/SwiftCorePe.svg";
// import headerLogo from "../../assets/images/commonforweb/MaheshBankLogo.png";
// import headerLogo from "../../assets/images/commonforweb/maheshBnk.PNG";


const Header = ({ analytics }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { state } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
  console.log("user", user)

  // const { dispatch: authDispatch } = useContext(AuthContext);
  // const [userName, setUserName] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  // console.log("lastLogin",lastLogin)

  // useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"))
  //   setLastLogin(sessionStorage.getItem("lastLogin"))
  // }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (document.getElementById('profile') && !document.getElementById('profile').contains(e.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleLogout = () => {
    // authDispatch({ type: REMOVE_USER });
    dispatch(logout());
    sessionStorage.clear()
    localStorage.clear()
    navigate("/auth/login")
  };

  const handleShowProfile = () => {
    navigate("/settings")
  };

  const handleSettings = () => {
    navigate("/settings")
  };

  return (
    <div className={classes.HeaderContainer}>
      <div className={classes.LeftContainer}>
        <div className={classes.lefttitle}>
          <img className={classes.lefttitlelogo} src={headerLogo} alt='' />
          {/* <div className={classes.headerTitle}>ATM Portal</div> */}
        </div>
        {/* <div className={classes.analytics}>
          <div className={classes.mainAnalytics} style={{ background: '#169E' }}>
            <div className={classes.analyticsValue}>{analytics.tioal || 100}</div>
            <div className={classes.analyticsTitle}>Total ATMS</div>
          </div>
          <div className={classes.AnalyticsContainer}>
            <div className={classes.eachAnalytics}>
              <div className={classes.analyticsValue}>{analytics.inService || 80}</div>
              <div className={classes.analyticsTitle}>In Service</div>
            </div>
            <div className={classes.separator}></div>
            <div className={classes.eachAnalytics}>
              <div className={classes.analyticsValue}>{analytics.outOfService || 15}</div>
              <div className={classes.analyticsTitle}>Out Of Service</div>
            </div>
            <div className={classes.separator}></div>
            <div className={classes.eachAnalytics}>
              <div className={classes.analyticsValue}>{analytics.offline || 5}</div>
              <div className={classes.analyticsTitle}>Offline</div>
            </div>
          </div>
        </div> */}
      </div>
      <div className={classes.RightContainer}>
          <div className={classes.welcometitle}>ATM(Vakrangee)</div>
       
        <div className={classes.ProfileSection}>
        <div className={classes.Title}>
          {/* <img src={LOGO} alt='LOGO_IMAGE' /> */}
          <div className={classes.lastLogin}>
            <div style={{ fontSize: "1.3rem", textAlign: "center",fontWeight:'500',}}>Last Login</div>
            <div style={{ fontSize: "1.3rem", textAlign: "center",fontWeight:'500',color:'#E31E24'}}>{user?.lastLoginDt}</div></div>
           
        </div>
        
          <div className={classes.ProfileContainer} id='profile' onClick={() => setShowProfile(!showProfile)}>
           
            <img src={ProfileIcon} alt='' />
            {/* <div>{state?.user?.firstName + ' ' + state?.user?.lastName}</div> */}
            {/* <div>{state?.username}</div> */}
          
            <div className={classes.nameadmin}>{user?.username}</div>
            <img className={classes.chevronButton} src={ChevronDown} alt='' />
            {showProfile ? (
              <ul>
                {/* <li onClick={handleSettings}><img src={SettingIcon} alt='settings'/>Settings</li> */}
                {/* <li onClick={handleShowProfile}><img src={ViewProfileIcon} alt='profile'/>Profile</li> */}
                <li onClick={handleLogout}><img src={LogoutIcon} alt='logout'/>Sign Out</li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
