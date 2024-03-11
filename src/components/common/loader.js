import React from "react";
// import classes from "../../containers/MainContainer/Haryana/haryana.module.css"
import CircularProgress from "@mui/material/CircularProgress"; // Assuming you're using MUI

// const Loader = () => {
//   return (
//     <div  className={classes.loader}>
//       <CircularProgress />
//     </div>
//   );
// };
import Loading from "react-fullscreen-loading";

const Loader = ({loading}) => {
  return (
      <Loading loading={loading} background="rgba(0, 0, 0, 0.5)" loaderColor="#FFF" />
  );
};

export default Loader;
