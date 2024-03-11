import AMU from '../../../assets/DashboardPics/card1.svg'
import NPA from '../../../assets/DashboardPics/card2.svg'
import PL from '../../../assets/DashboardPics/card3.svg'

import Local from '../../../assets/DashboardPics/card4.svg'
import Acquire from '../../../assets/DashboardPics/card5.svg'
import Issuer from '../../../assets/DashboardPics/card6.svg'


export const CardList = [
  {
    icon:AMU,
    title: "ATM In-Service",
    value: "205",
    backgroundimage:'linear-gradient(109deg, #5755FF 37.01%, rgba(165, 164, 255, 0.00) 102.12%)',
    boxshadow:'3px 16px 16px 0px rgba(87, 85, 255, 0.09), 7px 35px 22px 0px rgba(87, 85, 255, 0.05), 12px 63px 26px 0px rgba(87, 85, 255, 0.01), 18px 98px 28px 0px rgba(87, 85, 255, 0.00)'
  },
  {
    icon:NPA,
    title: "ATM Out Off Service",
    value: "100",

    backgroundimage:'linear-gradient(112deg, #FB9266 37.61%, rgba(255, 188, 160, 0.00) 98.07%)',
    boxshadow:'1px 4px 9px 0px rgba(251, 146, 102, 0.10), 3px 16px 16px 0px rgba(251, 146, 102, 0.09), 7px 35px 22px 0px rgba(251, 146, 102, 0.05), 12px 63px 25px 0px rgba(251, 146, 102, 0.01), 18px 98px 28px 0px rgba(251, 146, 102, 0.00)'
  },
  {
    icon:PL,
    title: "ATM Offline",
    value: "150",
    backgroundimage:'linear-gradient(113deg, #FDB73B 41.4%, rgba(253, 183, 59, 0.00) 97.77%)',
    boxshadow:'1px 4px 9px 0px rgba(253, 183, 59, 0.10), 5px 16px 17px 0px rgba(253, 183, 59, 0.09), 12px 36px 23px 0px rgba(253, 183, 59, 0.05), 21px 64px 27px 0px rgba(253, 183, 59, 0.01), 33px 100px 29px 0px rgba(253, 183, 59, 0.00) '
  },
];

export const CardMiddleList = [
  {
    icon:Local,
    top: "Local Transaction",
    title: "LAST TRANSACTION DATE:",
    value: "10000",
    status: "SUCCESS",
    background: "#f4f4f4",
    backgroundimage:'linear-gradient(109deg, #FAD1FA 37.01%, rgba(250, 209, 250, 0.00) 102.12%)'
      // "linear-gradient(131deg, #5755ff 37%, rgba(165, 164, 255, 0) 102%), linear-gradient(248deg, #fff 100%, rgba(255, 255, 255, 0.3) 0%)",
  },
  {
    icon:Acquire,
    top: "ACQUIRER TRANSACTION",
    title: "LAST TRANSACTION DATE:",
    value: "20000",
    status: "SUCCESS",
    backgroundimage:'linear-gradient(112deg, #BDB2FF 37.61%, rgba(189, 178, 255, 0.00) 98.07%'
    // "linear-gradient(136deg, #fb9266 38%, rgba(255, 188, 160, 0) 98%), linear-gradient(242deg, #fff 95%, rgba(242, 242, 242, 0) 1%)",
  },
  {
    icon:Issuer,
    top: "ISSUER TRANSACTION",
    title: "LAST TRANSACTION DATE:",
    value: "100",
    status: "SUCCESS",
    backgroundimage:'linear-gradient(113deg, #FEC868 41.4%, rgba(254, 200, 104, 0.00) 97.77%)'
      // "linear-gradient(137deg, #fdb73b 41%, rgba(253, 183, 59, 0) 98%), linear-gradient(243deg, #fbfbfb 92%, rgba(246, 246, 246, 0) 0%)",
  },

];
