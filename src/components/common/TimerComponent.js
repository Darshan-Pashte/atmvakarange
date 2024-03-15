import React, { useEffect, useState, useMemo } from "react";
import Countdown from "react-countdown";
import SweetAlertPopup from "./sweetAlertPopup";
import classes from "./common.module.css";

const MTimerComponent = ({ id, Time, Case, setotp,resendClick,tries,msg,setTries,setMsg,setOtp}) => {
  const [timerDuration, setTimerDuration] = useState(10000);
  const [showResendButton, setShowResendButton] = useState(true);
  const [countdownKey, setCountdownKey] = useState(`${id}_default`);

  useEffect(() => {
  

    if (Time !== undefined && Case) {
      let newTimerDuration;

      switch (Case) {
        case "Minutes":
          newTimerDuration = Number(Time) * 60 * 1000;
          break;
        case "Seconds":
          newTimerDuration = Number(Time) * 1000;
          break;
        case "Milliseconds":
          newTimerDuration = Number(Time);
          break;
        default:
          newTimerDuration = 10000;
          break;
      }

      setTimerDuration(newTimerDuration);
    }
  }, [id, Time, Case]);

  const handleResendClick = () => {
    setOtp('')
    setMsg('')
    setTries('')
    resendClick()
    // setShowResendButton(false);
    setTimerDuration(120 * 1000);
    setCountdownKey(`${id}_${Date.now()}`);
  };

  const renderer = useMemo(() => {
    return ({ minutes, seconds, completed }) => {
      if (completed) {
        return(
          <div className={classes.TimerStyle}>
          Didn't get OTP?
          {showResendButton && (
            <span className={classes.resendOtpstyle} onClick={handleResendClick}>Resend OTP</span>
          )}
        </div>
          // SweetAlertPopup("Otp Expired", "Error", "error");
          // setotp();
          )
      } else {
        return (
          <div className={classes.TimerStyle}>
            OTP will expire in :
            <span className={classes.TimerStyle} style={{color:'#AA1313',marginLeft:'5px'}}>
              {minutes}:{seconds}
            </span>
          </div>
        );
      }
    };
  }, [setotp,showResendButton, handleResendClick]);


  return <Countdown 
  
  key={countdownKey}
  // key={id}
  // key={`${id}_${timerDuration}`} 
  date={Date.now() + timerDuration} renderer={renderer} />;
};

const TimerComponent = React.memo(MTimerComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});

export default TimerComponent;
