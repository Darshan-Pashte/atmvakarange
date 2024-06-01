import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./Dashboard.module.css";
import AMU from "../../../assets/DashboardPics/card1.svg";
import NPA from "../../../assets/DashboardPics/card2.svg";
import PL from "../../../assets/DashboardPics/card3.svg";
// import AMU1 from "../../../assets/DashboardPics/card11.svg";
// import NPA1 from "../../../assets/DashboardPics/card22.svg";
// import PL1 from "../../../assets/DashboardPics/card33.svg";
import AMU1 from "../../../assets/DashboardPics/inservice.svg";
import NPA1 from "../../../assets/DashboardPics/offservice.svg";
import PL1 from "../../../assets/DashboardPics/offline.svg";
import { useSelector } from "react-redux";
import DashboardModal from "./DashboardModal";

export default function DashboarCards({ card,getcount }) {
    const { loading, error, isAuthenticated, user, dashboardlst } = useSelector(
        (state) => state.auth
        );
      //  console.log('user',user)

       const [currentCardName, setCurrentCardName] = React.useState('');
       const [currentAnotherName, setCurrentAnotherName] = React.useState('');
       const [excelName, setExcelName] = React.useState('');
       
       const [open, setOpen] = React.useState(false);
       const handleOpen = (apipath) =>{  
        // console.log('apipath', apipath);
    //   const apipath1={apipath};
       setOpen(true);
    }



       const handleClose = () => setOpen(false);
     
  return (
    // <Card  sx={{ maxWidth: 450 }} className={classes.cardpage} style={{ backgroundColor: card.background,backgroundImage:card.backgroundimage,boxShadow:card.boxshadow }}>

    //   <img src={card.icon} alt='dv' className={classes.iconboxicon} />

    //   <div className={classes.boxtitle}>
    //       {card.titlename}
    //       </div>

    //       <div className={classes.boxdesc}>
    //     {card.value}
    //     </div>

    // </Card>
    <>
      <div 
        className={classes.cardpage}
        style={{
            backgroundImage:
            "linear-gradient(109deg, #5755FF 37.01%, rgba(165, 164, 255, 0.00) 102.12%)",
          boxShadow:
            "3px 9px 16px 0px rgba(87, 85, 255, 0.09), 7px 35px 22px 0px rgba(87, 85, 255, 0.05), 12px  3px 26px 0px rgba(87, 85, 255, 0.01), 18px 98px 28px 0px rgba(87, 85, 255, 0.00)",
        }}
      >
        <div className={classes.uppericons}>
        <div className={classes.iconboxicon}>
          <img src={AMU1} />
        </div>
        <div className={classes.viewicon} 
        onClick={() => { setCurrentCardName('inservbrw');setCurrentAnotherName('ATM In-Service');setExcelName('inservbrwexcel'); handleOpen('inservbrw',' In-Serviceice'); }}>
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_116_25)">
<circle cx="18" cy="16.1334" r="14" transform="rotate(-90 18 16.1334)" fill="white"/>
<circle cx="18" cy="16.1334" r="13.5" transform="rotate(-90 18 16.1334)" stroke="white"/>
</g>
<path d="M15.6667 20.8001L19.6262 16.8405C20.0168 16.45 20.0168 15.8168 19.6262 15.4263L15.6667 11.4667" stroke="#0E0D35" stroke-width="1.5" stroke-linecap="round"/>
<defs>
<filter id="filter0_d_116_25" x="1.52588e-05" y="0.133423" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.130556 0 0 0 0 0.130556 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_116_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_116_25" result="shape"/>
</filter>
</defs>
</svg>

        </div>
        </div>
        <div className={classes.boxtitle}>ATM In-Service</div>
        <div className={classes.boxdesc}>{getcount && getcount[0]?.inservice}</div>

      </div>


      <div
   
        className={classes.cardpage}
        style={{
            backgroundImage:
            "linear-gradient(112deg, #FB9266 37.61%, rgba(255, 188, 160, 0.00) 98.07%)",
          boxShadow:
          "1px 2px 9px 0px rgba(251, 146, 102, 0.10), 3px 16px 16px 0px rgba(251, 146, 102, 0.09), 7px 35px 22px 0px rgba(251, 146, 102, 0.05), 12px 63px 25px 0px rgba(251, 146, 102, 0.01), 18px 98px 28px 0px rgba(251, 146, 102, 0.00)",

        }}
      >

<div className={classes.uppericons}>
        <div className={classes.iconboxicon}>
          <img src={NPA1} />
        </div>
        <div className={classes.viewicon} 
          onClick={() => { setCurrentCardName('outoffservbrw');setCurrentAnotherName('ATM Out Off Service');setExcelName('outoffservbrwexcel'); handleOpen('outoffservbrw','ATM Out Off Service'); }}>
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_116_25)">
<circle cx="18" cy="16.1334" r="14" transform="rotate(-90 18 16.1334)" fill="white"/>
<circle cx="18" cy="16.1334" r="13.5" transform="rotate(-90 18 16.1334)" stroke="white"/>
</g>
<path d="M15.6667 20.8001L19.6262 16.8405C20.0168 16.45 20.0168 15.8168 19.6262 15.4263L15.6667 11.4667" stroke="#0E0D35" stroke-width="1.5" stroke-linecap="round"/>
<defs>
<filter id="filter0_d_116_25" x="1.52588e-05" y="0.133423" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.130556 0 0 0 0 0.130556 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_116_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_116_25" result="shape"/>
</filter>
</defs>
</svg>

        </div>
        </div>
        <div className={classes.boxtitle}>ATM Out Off Service</div>
        <div className={classes.boxdesc}>{getcount && getcount[0]?.outservice}</div>
      </div>



      <div

        className={classes.cardpage}
        style={{
            backgroundImage:
            "linear-gradient(113deg, #FDB73B 41.4%, rgba(253, 183, 59, 0.00) 97.77%)",
          boxShadow:
          "1px 4px 9px 0px rgba(253, 183, 59, 0.10), 5px 16px 17px 0px rgba(253, 183, 59, 0.09), 12px 36px 23px 0px rgba(253, 183, 59, 0.05), 21px 64px 27px 0px rgba(253, 183, 59, 0.01), 33px 100px 29px 0px rgba(253, 183, 59, 0.00) ",
        }}
      >
        <div className={classes.uppericons}>
        <div className={classes.iconboxicon}>
          <img src={PL1} />
        </div>
        <div className={classes.viewicon} 
        onClick={() => { setCurrentCardName('offlineservbrw');setCurrentAnotherName('ATM Offline');setExcelName('offlineservbrwexcel'); handleOpen('offlineservbrw','ATM Offline'); }}>
        <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_116_25)">
<circle cx="18" cy="16.1334" r="14" transform="rotate(-90 18 16.1334)" fill="white"/>
<circle cx="18" cy="16.1334" r="13.5" transform="rotate(-90 18 16.1334)" stroke="white"/>
</g>
<path d="M15.6667 20.8001L19.6262 16.8405C20.0168 16.45 20.0168 15.8168 19.6262 15.4263L15.6667 11.4667" stroke="#0E0D35" stroke-width="1.5" stroke-linecap="round"/>
<defs>
<filter id="filter0_d_116_25" x="1.52588e-05" y="0.133423" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.130556 0 0 0 0 0.130556 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_116_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_116_25" result="shape"/>
</filter>
</defs>
</svg>

        </div>
        </div>
        <div className={classes.boxtitle}>ATM Offline</div>
        <div className={classes.boxdesc}>{getcount && getcount[0]?.offline}</div>
      </div>


      <div

className={classes.cardpage}
style={{
    backgroundImage:
    "linear-gradient(113deg, rgb(21 85 104) 41.4%, rgba(253, 183, 59, 0.00) 97.77%)",
  boxShadow:
  "1px 4px 9px 0px rgba(253, 183, 59, 0.10), 5px 16px 17px 0px rgba(253, 183, 59, 0.09), 12px 36px 23px 0px rgba(253, 183, 59, 0.05), 21px 64px 27px 0px rgba(253, 183, 59, 0.01), 33px 100px 29px 0px rgba(253, 183, 59, 0.00) ",
}}
>
<div className={classes.uppericons}>
<div className={classes.iconboxicon}>
  <img src={PL1} />
</div>
<div className={classes.viewicon} 
onClick={() => { setCurrentCardName('supervisoryinservbrw');setCurrentAnotherName('ATM Supervisory In');setExcelName('supervisoryinservbrwexcel'); handleOpen('supervisoryinservbrw','ATM Supervisory In'); }}>
<svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_116_25)">
<circle cx="18" cy="16.1334" r="14" transform="rotate(-90 18 16.1334)" fill="white"/>
<circle cx="18" cy="16.1334" r="13.5" transform="rotate(-90 18 16.1334)" stroke="white"/>
</g>
<path d="M15.6667 20.8001L19.6262 16.8405C20.0168 16.45 20.0168 15.8168 19.6262 15.4263L15.6667 11.4667" stroke="#0E0D35" stroke-width="1.5" stroke-linecap="round"/>
<defs>
<filter id="filter0_d_116_25" x="1.52588e-05" y="0.133423" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.130556 0 0 0 0 0.130556 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_116_25"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_116_25" result="shape"/>
</filter>
</defs>
</svg>

</div>
</div>
<div className={classes.boxtitle}>ATM Supervisory In</div>
<div className={classes.boxdesc}>{getcount && getcount[0]?.supervisoryin}</div>
</div>


      {open ? (
                <DashboardModal
                  open={open}
                  handleClose={handleClose}
                  apipath={currentCardName}
                  titlename={currentAnotherName}
                  excelname={excelName}
                //   apipath1={apipath}
                //   userId={userId}
                //   userName={userName}
                />
              ) : null}
    </>
  );
}
