import classes from './Sidebar.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useContext, useEffect, useState } from 'react';
// import { PROTECTED_ROUTES, PROTECTED_ROUTES_SERVICES, PROTECTED_ROUTES_SETTINGS } from '../../routes/Routes';
import routes from '../../routes/Routes';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ChevronDown from './SidebarIcons/chevronDownWhite.svg';
import ChevronUp from './SidebarIcons/up-chevron-svgrepo-com.svg';
import HandleOpen from "../../assets/Sidebar/OpenIcon.svg"
import HandleClose from "../../assets/Sidebar/CloseIcon.svg"
import SidebarImageIcon from "../../assets/Sidebar/SidebarImage.svg"
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { set } from 'react-hook-form';
import MaheshBank from "../../assets/images/commonforweb/mahesh.png";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import headerLogo from "../../assets/images/commonforweb/silkpay.png";
import LogOut from "../../assets/Sidebar/Logout.svg"
import Loader from '../common/loader';
import { postApiData } from '../utilities/nodeApiServices';
import { apiList } from '../utilities/nodeApiList';
import SweetAlertPopup from '../common/sweetAlertPopup';
const package_json = require("../../../package.json");


const slideIn = keyframes`${fadeIn}`;
const AnimatedCard = styled.div`
  animation: 0.7s ${slideIn};
`;

const Sidebar = () => {
  // const { state } = useContext(AuthContext);
const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 425);
const { PROTECTED_ROUTES } = routes();
const [selectedChildRoute, setSelectedChildRoute] = useState(null);


const { loading, error, isAuthenticated, user, menu,userType } = useSelector(
  (state) => state.auth
);

// console.log("User",userType)
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [sideBarHovered, setSideBarHovered] = useState(true);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [opens, setOpens] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch=useDispatch();

  const handleDrawerOpen = () => {
    setOpens(true);
  };

  const handleDrawerClose = () => {
    setOpens(false);
  };

  useEffect(() => {
    const storedExpandedRoute = sessionStorage.getItem('expandedRoute');
    if (storedExpandedRoute) {
      setExpandedRoute(storedExpandedRoute);
    }
  }, []);

  // useEffect(() => {
  //   const storedExpandedRoute = sessionStorage.getItem('expandedRoute');
  //   if (location.pathname) {
  //     setExpandedRoute(location.pathname);
  //   }
  // }, [location]);

  useEffect(() => {
    if (location.pathname === '/') setActiveRoute('dashboard');
    else {
      PROTECTED_ROUTES.forEach((route) => (location.pathname.includes(route.id) ? setActiveRoute(route.id) : null));
    }
    
  }, [location]);
const a="11111000000"
  const arr=a.split("")
  useEffect(() => {
   sessionStorage.getItem("menu")
  }, []);

 
  const handleRouteChange = (route) => {
    setActiveRoute(route.id);
    navigate(route.url);
    setExpandedRoute(null);
    setSelectedChildRoute(null);
    sessionStorage.setItem('expandedRoute', null);
    setOpens(false);
  };
  
  const handleChildRouteChange = (parent, child) => {
    setActiveRoute(parent.id);
    navigate(`${parent.url}${child.url}`);
    setExpandedRoute(parent.name);
    setSelectedChildRoute(child.id);
    sessionStorage.setItem('expandedRoute', parent.name);
    setOpens(false);
  };

    const openSidebar = () => {
    document.getElementById('mySidebar').style.width = '15.344vw';
    // document.getElementById('MenuItems').style.width = 'max-content';
    setSideBarHovered(true);
  };

  const closeSidebar = () => {
    document.getElementById('mySidebar').style.width = '3.762vw';
    // document.getElementById('MenuItems').style.width = '0vw';
    setSideBarHovered(false);
  };
 
  const hover = () => {
    if(isSmallScreen===true){
      return true;
    }
      else{
        setSideBarHovered(false);
        return false
      }
    
  }


  const processedRoutes = PROTECTED_ROUTES.map((route) => {
    if (!route.childRoutes) {
      if (route.arr==('1') ) return route;
      else return false;
    } else {
      let childRoutes = route.childRoutes?.filter((child) => child.arr==("1"));
      if (childRoutes.length) return { ...route, childRoutes: childRoutes };
      else return false;
    }
  }).filter(Boolean);
  


  // const handleLogout = () => {
  //   // authDispatch({ type: REMOVE_USER });
  //   dispatch(logout());
  //   sessionStorage.clear()
  //   localStorage.clear()
  //   navigate("/auth/login")
  // };


  const handleLogout = async (data) => {
    try {
      // setIsloading(true);
      const payload = {
        username: user?.username,
        sessionId: user?.sessionId,
        
      };
      const response = await postApiData(apiList.LOGOUT, payload);
      console.log('response',response)
      if (response?.data?.status == true) {
        SweetAlertPopup(response?.data.message, "Success", "success");
// dispatch(logout());
sessionStorage.clear()
localStorage.clear()
navigate('/auth/login');
window.location.reload()
        // setIsloading(false);
      } else {
        SweetAlertPopup(response?.data.message, "Error", "error");
        // setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      // setIsloading(false);
    }
  };
  return (<>
  {/* {isLoading ? <Loader loading={true} /> : <Loader loading={false} />} */}
      {/* Mobile */}
    <div className={classes.mainheaderresp}>
      <header className={classes.mainHeader}>
        <div className={classes.g20}>
          <a
            href="."
            className={classes.fpic}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            <img
              src={headerLogo}
              alt="logo_image"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </a>
        </div>
        <div className={classes.rightlogo}>
          {!opens ? (
            <MenuIcon  onClick={() => handleDrawerOpen()} style={{cursor:'pointer'}} />
            // <img
            //   src={HandleOpen}
            //   alt="logo_image"
            //   onClick={() => handleDrawerOpen()}
            //   style={{ maxWidth: "100%", maxHeight: "100%",color:'black',cursor:'pointer'  }}
            // />
          ) : (
            <CancelIcon onClick={() => handleDrawerClose()} style={{cursor:'pointer'}} />
            // <img
            //   src={HandleClose}
            //   alt="logo_image"
            //   onClick={() => handleDrawerClose()}
            //   style={{ maxWidth: "100%", maxHeight: "100%",color:'black',cursor:'pointer' }}
            // />
          )}
        </div>
      </header>
      {opens ? (
        <div className={classes.navbar}>
          <div className={classes.newdropdowncontent}>
            {/* <NavLink
              to={"/"}
              style={{ textDecoration: "none" }}
              className={classes.dropdown}
              reloadDocument
            >
              <div className={classes.home}>HOME</div>
            </NavLink> */}
            {processedRoutes.length === 0 ? null : <div className={classes.products}>Products</div>}
            <ul className={classes.ul}>
          {processedRoutes.map(({ Icon, ...route }) =>
            route.childRoutes?.length ? (
              <div key={route.id}>
                <li
                  className={activeRoute === route.id ? classes.Active : ''}
                  onClick={() => setExpandedRoute((prev) => (prev === route.name ? null : route.name))}
                >
                  <Icon  className={activeRoute === route.id ? classes.MenuIcon : classes.MenuRed} />
                  {sideBarHovered && (
                    <AnimatedCard className={classes.parentList}>
                      <div>{route.name}</div>
                      <img className={classes.expandIcon} src={expandedRoute === route.name ? ChevronUp : ChevronDown} alt='' />
                    </AnimatedCard>
                  )}
                </li>
                {sideBarHovered && expandedRoute === route.name && (
                  <AnimatedCard className={classes.childRoutesContainer}>
                    {route.childRoutes?.map((child) => (
                     child.arr=="1" && <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>- {child.name}</div>}</li>
                    ))}
                  </AnimatedCard>
                )}
              </div>
            ) : (
              <li key={route.id} onClick={() => handleRouteChange(route)} className={activeRoute === route.id ? classes.Active : ''}>
                <Icon className={activeRoute === route.id ? classes.MenuIcon : classes.MenuRed} />
                {sideBarHovered && <AnimatedCard>{route.name}</AnimatedCard>}
              </li>
            )
          )}
        </ul>
        <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      ) : null}
      <div />
    </div>
    {/* Laptop */}
     <div id='mySidebar' className={classes.Sidebar} >
      <div className={classes.MenuItems}>
        <ul className={classes.Active}>
          {processedRoutes.map(({ Icon, ...route }) =>
            route.childRoutes?.length ? (
              <div key={route.id}>
                <li
                  className={activeRoute === route.id ? classes.Active : ''}
                  onClick={() => setExpandedRoute((prev) => (prev === route.name ? null : route.name))}
                >
                  <Icon  className={activeRoute === route.id ? classes.MenuIcon : classes.MenuRed} />
                  {sideBarHovered && (
                    <AnimatedCard className={classes.parentList}>
                      <div>{route.name}</div>
                      <img className={classes.expandIcon} src={expandedRoute === route.name ? ChevronUp : ChevronDown} alt='' />
                    </AnimatedCard>
                  )}
                </li>
                {sideBarHovered && expandedRoute === route.name && (
                  <AnimatedCard className={classes.childRoutesContainer}>
                    {route.childRoutes?.map((child) => (
                    //  child.arr=="1" && <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>- {child.name}</div>}</li>
                    child.arr=="1" && <li onClick={() => handleChildRouteChange(route, child)} className={selectedChildRoute === child.id ? classes.childList : ''} >{sideBarHovered && <div className={selectedChildRoute === child.name ? classes.SelectedChild : ''}> - {child.name}</div>}</li>
                    ))}
                  </AnimatedCard>
                )}
              </div>
            ) : (
              <li key={route.id} onClick={() => handleRouteChange(route)} className={activeRoute === route.id ? classes.Active : ''}>
                <Icon className={activeRoute === route.id ? classes.MenuIcon : classes.MenuRed} />
                {sideBarHovered && <AnimatedCard>{route.name}</AnimatedCard>}
              </li>
            )
          )}
        </ul>
       

       
      </div>
     
      <div className={classes.versionbttn} style={{ textAlign: "center" ,fontWeight:500}}>
              Version : {package_json.version}
            </div>

      <div className={classes.logoutbttn} onClick={handleLogout} >
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M16.5 17.4L21.5 12.4M21.5 12.4L16.5 7.39999M21.5 12.4H9.5M9.5 3.39999H8.3C6.61984 3.39999 5.77976 3.39999 5.13803 3.72697C4.57354 4.01459 4.1146 4.47354 3.82698 5.03802C3.5 5.67976 3.5 6.51984 3.5 8.19999V16.6C3.5 18.2802 3.5 19.1202 3.82698 19.762C4.1146 20.3265 4.57354 20.7854 5.13803 21.073C5.77976 21.4 6.61984 21.4 8.3 21.4H9.5" stroke="url(#paint0_linear_1_309)" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear_1_309" x1="12.5" y1="5.11428" x2="12.5" y2="20.5428" gradientUnits="userSpaceOnUse">
              <stop stop-color="#8482FD"/>
              <stop offset="1" stop-color="#FBA07A"/>
            </linearGradient>
          </defs>
        </svg> */}
        <img src={LogOut} alt="LogOut Image" />
        <div style={{fontSize:'13px',fontWeight:500}}>
          Log Out
        </div>
        </div> 
      <div id='mySidebar' className={classes.Sidebar} >
       
      <div className={classes.MenuItems}>
        <div className={classes.sidebarImage}>
        <img src={SidebarImageIcon} alt='sidebarImage' />
        {/* {
          userType=="corporate" ? <div className={classes.experience}>Experience Corporate Banking</div> : <div className={classes.experience}>Experience Personel Banking</div>
        } */}
        
      </div>
      </div>
      </div>
      
    </div>
    </>
    
  );
};

export default Sidebar;


// import classes from './Sidebar.module.scss';
// import React, { useContext, useEffect, useState } from 'react';
// import { PROTECTED_ROUTES } from '../../routes/Routes';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import ChevronDown from './SidebarIcons/chevronDownWhite.svg';
// import ChevronUp from './SidebarIcons/chevronUpWhite.svg';
// import styled, { keyframes } from 'styled-components';
// import { fadeIn } from 'react-animations';

// const slideIn = keyframes`${fadeIn}`;
// const AnimatedCard = styled.div`
//   animation: 0.7s ${slideIn};
// `;

// const Sidebar = () => {
//   const { state } = useContext(AuthContext);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeRoute, setActiveRoute] = useState('dashboard');
//   const [sideBarHovered, setSideBarHovered] = useState(true);
//   const [expandedRoute, setExpandedRoute] = useState(null);
//   useEffect(() => {
//     if (location.pathname === '/') setActiveRoute('dashboard');
//     else {
//       PROTECTED_ROUTES.forEach((route) => (location.pathname.includes(route.id) ? setActiveRoute(route.id) : null));
//     }
//   }, [location]);

// const a="1111101000000"
//   const arr=a.split("")
//   // useEffect(() => {
//   //  if(sessionStorage.getItem("menu")){

//   //  }
//   // }, []);


//   const handleRouteChange = (route) => {
//     setActiveRoute(route.id);
//     navigate(route.url);
//     setExpandedRoute(null);
//   };
  
//   const handleChildRouteChange = (parent, child) => {
//     setActiveRoute(parent.id);
//     navigate(`${parent.url}${child.url}`);
//   };

 
//   const processedRoutes = PROTECTED_ROUTES.map((route,index,array) => {
//     if (!route.childRoutes) {
//       if (route.roles?.includes('all') || route.roles?.includes(state.user.role)) return route;
//       else return false;
//     } else {
//       let childRoutes = route.childRoutes?.filter((child) => child.roles.includes('all') || child.roles?.includes(state.user.role));
//       if (childRoutes?.length) return { ...route, childRoutes: childRoutes };
//       else return false;
//     }
//   }).filter(Boolean);

//   console.log("processedRoutes",processedRoutes)

//   return (
//     <div id='mySidebar' className={classes.Sidebar}>
//       <div className={classes.MenuItems}>
//         <ul>
//         {processedRoutes.map(({ Icon, ...route }, index) => {
//             if (route.childRoutes?.length && arr[index] === '1') {
//               return (
//                 <div key={route.id}>
//                    <li
//                   className={activeRoute === route.id ? classes.Active : ''}
//                   onClick={() => setExpandedRoute((prev) => (prev === route.name ? null : route.name))}
//                 >
//                   <Icon className={classes.MenuIcon} stroke={activeRoute === route.id ? '#383B53' : '#F1F2F8'} />
//                   {sideBarHovered && (
//                     <AnimatedCard className={classes.parentList}>
//                       <div>{route.name}</div>
//                       <img className={classes.expandIcon} src={expandedRoute === route.name ? ChevronUp : ChevronDown} alt='' />
//                     </AnimatedCard>
//                   )}
//                 </li>
//                   {sideBarHovered && expandedRoute === route.name && (
//                     <AnimatedCard className={classes.childRoutesContainer}>
//                       {route.childRoutes?.map((child) => (
//                          <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>{child.name}</div>}</li>
//                       ))}
//                     </AnimatedCard>
//                   )}
//                 </div>
//               );
//             } else {
//               return null; // Do not render the menu item
//             }
//           })}
//           {/* {processedRoutes.map(({ Icon, ...route },index) =>
//             route.childRoutes?.length  ? (
//               <div>
//                 <li
//                   className={activeRoute === route.id ? classes.Active : ''}
//                   onClick={() => setExpandedRoute((prev) => (prev === route.name ? null : route.name))}
//                 >
//                   <Icon className={classes.MenuIcon} stroke={activeRoute === route.id ? '#383B53' : '#F1F2F8'} />
//                   {sideBarHovered && (
//                     <AnimatedCard className={classes.parentList}>
//                       <div>{route.name}</div>
//                       <img className={classes.expandIcon} src={expandedRoute === route.name ? ChevronUp : ChevronDown} alt='' />
//                     </AnimatedCard>
//                   )}
//                 </li>
//                 {sideBarHovered && expandedRoute === route.name && (
//                   <AnimatedCard className={classes.childRoutesContainer}>
//                     {route.childRoutes?.map((child) => (
//                       <li onClick={() => handleChildRouteChange(route, child)}>{sideBarHovered && <div>{child.name}</div>}</li>
//                     ))}
//                   </AnimatedCard>
//                 )}
//               </div>
//             ) : (
//               <li key={route.id} onClick={() => handleRouteChange(route)} className={activeRoute === route.id ? classes.Active : ''}>
//                 <Icon className={classes.MenuIcon} stroke={activeRoute === route.id ? '#383B53' : '#F1F2F8'} />
//                 {sideBarHovered && <AnimatedCard>{route.name}</AnimatedCard>}
//               </li>
//             )
//           )} */}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;