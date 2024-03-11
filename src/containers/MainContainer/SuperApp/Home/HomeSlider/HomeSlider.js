import * as React from "react";
import Box from "@mui/material/Box";
import classes from "../HomeSlider/HomeSlider.module.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";

import Loader from "../../../../../components/common/loader";
// import { useEffect,useForceUpdate } from "react";

const labelcheck = { inputProps: { "aria-label": "Checkbox demo" } };
const labelswitch = { inputProps: { "aria-label": "Switch demo" } };

const options = {
  margin: 0,
  loop: true,
  items: 1,
  dots: false,
  mouseDrag: false,
  //   smartSpeed: 1000,
  //   autoplay: 3000,
  smartSpeed: false,
  autoplay: false,
  nav: true,
  // navText: [
  //     <ArrowBackIosIcon fontSize="large" color='red'/>,
  //     <ArrowForwardIosIcon fontSize="large" />,
  // ],
  navText: ["<", ">"],
};

const defaultFormData = {
  email: "",
  password: "",
};


function SliderTestimonials({ accList, isLoading }) {

  const [valueTable, setValueTable] = React.useState(0);
  // const [togglestate, setToggleState] = useState(false)

  // const handleToggle = () => {
  //   setToggleState((prevState) => !prevState);
  //   // forceUpdate();
  // };

  const [toggleStates, setToggleStates] = useState(Array(accList?.length)?.fill(false));

  const handleToggle = (index) => {
    setToggleStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user, 'user')

  return (
    <>
      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}
      <Box
        className={classes.mainSlider}
        sx={{ top: "-50px", position: "relative" }}
      >


       {accList ? <>
       
       
        <OwlCarousel className={`${classes.owlTheme} owl-theme`} {...options}>
          {accList && accList?.map((ele, index) => {
            return (
              <React.Fragment key={index}>
                <div className={classes.gridcontent}  >
                  {/* <div className={classes.gridtitle}>Debit Card</div> */}
                  <div className={classes.gridinfo}>
                    <div className={classes.grid1container}>
                      <div className={classes.grid1mainlogo}>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="42"
                          height="42"
                          viewBox="0 0 42 42"
                          fill="none"
                        >
                          <circle cx="21" cy="21" r="21" fill="#FEB135" />
                          <path
                            d="M26.8332 16.3333V12.8333C26.8332 12.5239 26.7103 12.2271 26.4915 12.0083C26.2727 11.7895 25.9759 11.6666 25.6665 11.6666H13.9998C13.381 11.6666 12.7875 11.9125 12.3499 12.35C11.9123 12.7876 11.6665 13.3811 11.6665 14M11.6665 14C11.6665 14.6188 11.9123 15.2123 12.3499 15.6499C12.7875 16.0875 13.381 16.3333 13.9998 16.3333H27.9998C28.3093 16.3333 28.606 16.4562 28.8248 16.675C29.0436 16.8938 29.1665 17.1905 29.1665 17.5V21M11.6665 14V28C11.6665 28.6188 11.9123 29.2123 12.3499 29.6499C12.7875 30.0875 13.381 30.3333 13.9998 30.3333H27.9998C28.3093 30.3333 28.606 30.2104 28.8248 29.9916C29.0436 29.7728 29.1665 29.476 29.1665 29.1666V25.6666"
                            stroke="#183883"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M30.334 21V25.6667H25.6673C25.0485 25.6667 24.455 25.4208 24.0174 24.9832C23.5798 24.5457 23.334 23.9522 23.334 23.3333C23.334 22.7145 23.5798 22.121 24.0174 21.6834C24.455 21.2458 25.0485 21 25.6673 21H30.334Z"
                            stroke="#183883"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        {/* <div>
                          <div className={classes.grid1switch}>View Balance
                            <Switch {...labelswitch} color="default" checked={toggleStates[index]} onChange={() => handleToggle(index)} />
                          </div>
                        </div> */}
                      </div>


                      <div className={classes.grid1lowerinfo}>
                        <div className={classes.cvv}>
                          Balance
                          {/* {
                            toggleStates ? <div> ₹  {ele?.accBal}</div> : <div>₹ XXXX</div>
                          } */}
                          <div className={classes.bal}>
                            {!toggleStates[index] ? (
                              <div> ₹ {ele.accBal}</div>
                            ) : (
                              <div>₹ XXXX</div>
                            )}
                          </div>


                        </div>
                        <div className={classes.expirydate}>
                          <div className={classes.expirydateinfo}>{ele?.accType}</div>
                          <div>{ele?.accNo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          }
          )}
        </OwlCarousel></> : <div className={classes.nodata}>
                  No data avaliable</div>}
      </Box>
    </>
  );
}

export default SliderTestimonials;
