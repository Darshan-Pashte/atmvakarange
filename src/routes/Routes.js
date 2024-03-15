// import { ReactComponent as DashboardIcon } from "../assets/Dashboard.svg";
// import { ReactComponent as CreditCardIcon } from "../assets/icons8-credit-card-64.svg";
// import { ReactComponent as UpiIcon } from "../components/Sidebar/SidebarIcons/upi.svg";
// import { ReactComponent as QRsvg } from "../components/Sidebar/SidebarIcons/QR.svg";
// import { ReactComponent as Login } from "../components/Sidebar/SidebarIcons/Login.svg";
// import { ReactComponent as VpaIcon } from "../components/Sidebar/SidebarIcons/VPA.svg";
// import { ReactComponent as BankIcon } from "../components/Sidebar/SidebarIcons/bank.svg";
// import { ReactComponent as DashboardIcon } from "../components/Sidebar/SidebarIcons/dashboard.svg";
// import { ReactComponent as HomeIcon } from "../assets/Sidebar/DashboardY.svg";


// import { ReactComponent as CreditCardIcon } from "../assets/icons8-credit-card-64.svg";
import { ReactComponent as UpiIcon } from "../components/Sidebar/SidebarIcons/ATM1.svg";
import { ReactComponent as MobIcon } from "../components/Sidebar/SidebarIcons/mobile1 app.svg";
import { ReactComponent as UserIcon } from "../components/Sidebar/SidebarIcons/user1 atm assign.svg";
import { ReactComponent as LocalIcon } from "../components/Sidebar/SidebarIcons/local bin1.svg";
import { ReactComponent as BankUserIcon } from "../components/Sidebar/SidebarIcons/bank user1.svg";
import { ReactComponent as SMSIcon } from "../components/Sidebar/SidebarIcons/SMS1.svg";
import { ReactComponent as BankIcon } from "../components/Sidebar/SidebarIcons/Bank1.svg";
// import { ReactComponent as DashboardIcon } from "../components/Sidebar/SidebarIcons/dashboard.svg";
import { ReactComponent as HomeIcon } from "../components/Sidebar/SidebarIcons/Home1.svg";

import { ReactComponent as TransactionIcon } from "../components/Sidebar/SidebarIcons/transactions.svg";


// import { ReactComponent as HomeIcon } from "../components/Sidebar/SidebarIcons/home.svg";
import { ReactComponent as HealthIcon } from "../components/Sidebar/SidebarIcons/health.svg";
import { ReactComponent as ErrorIcon } from "../components/Sidebar/SidebarIcons/Error.svg";
import { ReactComponent as CheckIcon } from "../components/Sidebar/SidebarIcons/check.svg";
import { ReactComponent as FundTranfer } from "../components/Sidebar/SidebarIcons/fundtranfer.svg";
import { ReactComponent as LoanIcon } from "../components/Sidebar/SidebarIcons/loans.svg";
import { ReactComponent as StatementIcon } from "../components/Sidebar/SidebarIcons/statement.svg";
import { ReactComponent as SettingIcon } from "../components/Sidebar/SidebarIcons/setting.svg";
import { ReactComponent as ViewIcon } from "../components/Sidebar/SidebarIcons/view.svg";
import { ReactComponent as ApproveIcon } from "../components/Sidebar/SidebarIcons/approve.svg";
// import { ReactComponent as HomeIcon } from "../components/Sidebar/SidebarIcons/home.svg";

// import Accounts from "../containers/MainContainer/SuperApp/Account/Accounts";
// import accountsIcon from "../../src/assets/Sidebar/accountsIcon.svg";
// import Payments from "../containers/MainContainer/SuperApp/Payments/Payments";

// import Investments from "../containers/MainContainer/SuperApp/Investments/Investments";
// import Loans from "../containers/MainContainer/SuperApp/Loans/Loans";
// import ServiceRequest from "../containers/MainContainer/SuperApp/ServiceRequest/ServiceRequest";
// import Cards from "../containers/MainContainer/SuperApp/Cards/Cards";
// import Home from "../containers/MainContainer/SuperApp/Home/Home";
// import Statements from "../containers/MainContainer/SuperApp/Statements/Statements";
// import Settings from "../containers/MainContainer/SuperApp/Settings/Settings";
// import CorporateHome from "../containers/MainContainer/corporatePages/home/CorporateHome";
// import FundTransfer from "../containers/MainContainer/SuperApp/FundTransfer/FundTransfer";
// import Insurance from "../containers/MainContainer/SuperApp/Insurance/Insurance";
// import CorporateFundTransfer from "../containers/MainContainer/SuperApp/CorporateFundTransfer/CorporateFundTransfer";
// import BillPayments from "../containers/MainContainer/SuperApp/BillPayments/BillPayments";
// import ElectricityBill from "../containers/MainContainer/SuperApp/BillPayments/ElectricityBill";
// import WithinBank from "../containers/MainContainer/SuperApp/CorporateFundTransfer/WithinBank";
// import SelfAccount from "../containers/MainContainer/SuperApp/CorporateFundTransfer/SelfAccount";
// import OtherAccount from "../containers/MainContainer/SuperApp/CorporateFundTransfer/OtherAccount";
// import AddPayee from "../containers/MainContainer/SuperApp/AddPayee/AddPayee";
// import NewCheckBook from "../containers/MainContainer/SuperApp/NewCheckBook/NewCheckBook";
// import UploadFile from "../containers/MainContainer/SuperApp/UploadFile/UploadFile";
// import DataTableLower from "../containers/MainContainer/SuperApp/CorporateHome/tableTab2Home";
// import UploadViewFIle from "../containers/MainContainer/SuperApp/UploadFile/UploadViewFIle";
// import UploadApproveReject from "../containers/MainContainer/SuperApp/UploadFile/UploadApproveReject";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BankMasterBrowse from "../containers/MainContainer/AtmPortal/BankMaster/BankMasterBrowse";
import ATMMasterBrowse from "../containers/MainContainer/AtmPortal/AtmMaster/ATMMasterBrowse";
import BankMasterCreate from "../containers/MainContainer/AtmPortal/BankMaster/BankMasterCreate";
import ATMMasterCreate from "../containers/MainContainer/AtmPortal/AtmMaster/ATMMasterCreate";
import KeyMasterBrowse from "../containers/MainContainer/AtmPortal/KeyMaster/KeyMasterBrowse";
import NetworkMasterBrowse from "../containers/MainContainer/AtmPortal/NetworkMaster/NetworkMasterBrowse";
import KeyMasterCreate from "../containers/MainContainer/AtmPortal/KeyMaster/KeyMasterCreate";
import NetworkMasterCreate from "../containers/MainContainer/AtmPortal/NetworkMaster/NetworkMasterCreate";
import LocalAndAquirerBrowse from "../containers/MainContainer/AtmPortal/TransactionReport/LocalAndAquirerBrowse";
import IssuerBrowse from "../containers/MainContainer/AtmPortal/TransactionReport/IssuerBrowse";
import IssuerSwitchBrowse from "../containers/MainContainer/AtmPortal/TransactionReport/IssuerSwitchBrowse";
import SwitchBrowse from "../containers/MainContainer/AtmPortal/TransactionReport/SwitchBrowse";
import ATMMasterModify from "../containers/MainContainer/AtmPortal/AtmMaster/ATMMasterModify";
import BankAtmSMSMasterBrowse from "../containers/MainContainer/AtmPortal/BankAtmSMSMaster/BankAtmSMSMasterBrowse";
import BankAtmSMSMasterCreate from "../containers/MainContainer/AtmPortal/BankAtmSMSMaster/BankAtmSMSMasterCreate";
import BankAtmSMSMasterModify from "../containers/MainContainer/AtmPortal/BankAtmSMSMaster/BankAtmSMSMasterModify";
import BankMasterModify from "../containers/MainContainer/AtmPortal/BankMaster/BankMasterModify";
import Dashboard from "../containers/MainContainer/Dashboard/Dashboard";
import MobileAppUserBrowse from "../containers/MainContainer/AtmPortal/MobileAppUser/MobileAppUserBrowse";
import MobileAppUserCreate from "../containers/MainContainer/AtmPortal/MobileAppUser/MobileAppUserCreate";
import MobileAppUserModify from "../containers/MainContainer/AtmPortal/MobileAppUser/MobileAppUserModify";
import MobileAppUserAuthorize from "../containers/MainContainer/AtmPortal/MobileAppUser/MobileAppUserAuthorize";
import UserATMAssignMasterBrowse from "../containers/MainContainer/AtmPortal/UserATMAssignMaster/UserATMAssignMasterBrowse";
import UserATMAssignMasterCreate from "../containers/MainContainer/AtmPortal/UserATMAssignMaster/UserATMAssignMasterCreate";
import UserATMAssignMasterModify from "../containers/MainContainer/AtmPortal/UserATMAssignMaster/UserATMAssignMasterModify";
import BankUserMasterModify from "../containers/MainContainer/AtmPortal/BankUserMaster/BankUserMasterModify";
import BankUserMasterBrowse from "../containers/MainContainer/AtmPortal/BankUserMaster/BankUserMasterBrowse";
import BankUserMasterCreate from "../containers/MainContainer/AtmPortal/BankUserMaster/BankUserMasterCreate";
import BankUserMasterAuthorize from "../containers/MainContainer/AtmPortal/BankUserMaster/BankUserMasterAuthorize";
import LocalBinMasterBrowse from "../containers/MainContainer/AtmPortal/LocalBinMaster/LocalBinMasterBrowse";
import LocalBinMasterCreate from "../containers/MainContainer/AtmPortal/LocalBinMaster/LocalBinMasterCreate";
import LocalBinMasterModify from "../containers/MainContainer/AtmPortal/LocalBinMaster/LocalBinMasterModify";
import ATMServiceBrowse from "../containers/MainContainer/AtmPortal/AtmService/ATMServiceBrowse";
import ATMHealthBrowse from "../containers/MainContainer/AtmPortal/AtmHealth/ATMHealthBrowse";
import ATMErrorBrowse from "../containers/MainContainer/AtmPortal/AtmError/ATMErrorBrowse";
// import BeneficiaryDetails from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/BeneficiayDetails";
// import AccountLimit from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/AccountLimit";
// import AccountLimitNEFT from "../containers/MainContainer/SuperApp/AccountLimit/NEFT/AccountLimitNEFT";
// import NeftDetails from "../containers/MainContainer/SuperApp/AccountLimit/NEFT/NeftDetails";
// import AccountLimitInternal from "../containers/MainContainer/SuperApp/AccountLimit/InternalFundTransfer/AccountLimitInternal";
// import AccountLimitIMPS from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/AccountLimitIMPS";
// import InternalDetails from "../containers/MainContainer/SuperApp/AccountLimit/InternalFundTransfer/InternalDetails";
// import AccountBeneficiary from "../containers/MainContainer/SuperApp/AccountLimit/Beneficiary/AccountBeneficiary";
// import NewCard from "../containers/MainContainer/SuperApp/Cards/NewCard";
// import AccountBeneficiaryInternal from "../containers/MainContainer/SuperApp/AccountLimit/BeneficiaryInternal/AccountBeneficiaryInternal";
// import Payment1Mobile from "../containers/MainContainer/SuperApp/Payments/Payment1Mobile";
// import FixedDepositDetails from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositDetails";
// import FixedDepositScheme from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositScheme";
// import OpenDeposit from "../containers/MainContainer/SuperApp/Account/FixedDeposit/Opendeposit";
// import FixedDepositCashCert from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositCashCert";
// import FixedDepositInterestRate from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositInterestRate";
// import OpendepositeChild from "../containers/MainContainer/SuperApp/Account/FixedDeposit/OpendepositeChild";
// import OpendepositeChild1 from "../containers/MainContainer/SuperApp/Account/FixedDeposit/OpenDepositChild1";
// import LoansFields from "../containers/MainContainer/SuperApp/Loans/LoansFields";
// import SetAccLimit from "../containers/MainContainer/SuperApp/AccountLimit/SetAccLimit";
// import ChequeRequest from "../containers/MainContainer/SuperApp/Cheque/ChequeRequest/ChequeRequest";
// import ChequeStatus from "../containers/MainContainer/SuperApp/Cheque/ChequeStatus/ChequeStatus";
// import StopPayment from "../containers/MainContainer/SuperApp/Cheque/StopPayment/StopPayment";
// import RTGS from "../containers/MainContainer/SuperApp/AccountLimit/RTGS/RTGS";
// import RTGSDetails from "../containers/MainContainer/SuperApp/AccountLimit/RTGS/RTGSDetails";
// import CorporateAccount from "../containers/MainContainer/corporatePages/Accounts/CorporateAccount";
// import TransferFunds from "../containers/MainContainer/SuperApp/CorporateFundTransfer/TransferFunds";
// import LoansPayment from "../containers/MainContainer/SuperApp/Loans/LoansPayment";
// import BulkTransfer from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkTransfer";
// import AccountBeneficiaryCorporate from "../containers/MainContainer/corporatePages/beneficiaryManagement/Beneficiary/AccountBeneficiary";
// import AccountBeneficiaryInternalCorporate from "../containers/MainContainer/corporatePages/beneficiaryManagement/BeneficiaryInternal/AccountBeneficiaryInternal";
// import FixedDepositDetailsCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositDetails";
// import FixedDepositCashCertCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositCashCert";
// import FixedDepositSchemeCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositScheme";
// import FixedDepositInterestRateCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositInterestRate";
// import OpenDepositCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/Opendeposit";
// import OpendepositeChildCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/OpendepositeChild";
// import OpendepositeChild1Corporate from "../containers/MainContainer/corporatePages/FixedDeposit/OpenDepositChild1";
// // import Authorize from "../containers/MainContainer/corporatePages/authorize/Authorize";
// import LoansCorporate from "../containers/MainContainer/corporatePages/Loans/Loans";
// import SettingsCorporate from "../containers/MainContainer/corporatePages/Settings/Settings";
// import StatementsCorporate from "../containers/MainContainer/corporatePages/Statements/Statements";
// import ChequeRequestCorporate from "../containers/MainContainer/corporatePages/Cheque/ChequeRequest/ChequeRequest";
// import ChequeStatusCorporate from "../containers/MainContainer/corporatePages/Cheque/ChequeStatus/ChequeStatus";
// import StopPaymentCorporate from "../containers/MainContainer/corporatePages/Cheque/StopPayment/StopPayment";
// import FundTransferPreview from "../containers/MainContainer/SuperApp/CorporateFundTransfer/FundTransferPreview";
// import BulkFundTransferPreview from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkFundTransferPreview";
// // import AuthorizerSuccessfulPayment from "../containers/MainContainer/corporatePages/authorize/AuthorizerSuccessfulPayment";
// import BulkUploadStatus from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkUploadStatus";
// // import Checkerhome from "../containers/MainContainer/corporatePages/Checker/CheckerHome/CheckerHome";
// // import CheckerView from "../containers/MainContainer/corporatePages/Checker/CheckerView/CheckerView";
// import CheckerViewRecord from "../containers/MainContainer/checkerApprove/CheckerView/CheckerViewRecord";
// import CheckerApprove from "../containers/MainContainer/checkerApprove/CheckerApprove";
// import AuthorizeApprove from "../containers/MainContainer/authorizeApprove/AuthorizeApprove";
// import AuthorizerSuccessfulPayment from "../containers/MainContainer/authorizeApprove/AuthorizerSuccessfulPayment";
// import Checkerhome from "../containers/MainContainer/checkerApprove/CheckerHome/CheckerHome";
// import AuthorizeHome from "../containers/MainContainer/authorizeApprove/AuthorizeHome";
// import CheckerSuccessfulPayment from "../containers/MainContainer/checkerApprove/CheckerSuccessfulPayment";

const Routes = () => {
  const { loading, error, isAuthenticated, user, menu, userRole } = useSelector(
    (state) => state.auth
  );
  // const [array, setArray] = useState("")
  // useEffect(async() => {
  //   const Menu = sessionStorage.getItem("menu");
  //   const array1 = await Menu;
  //   // console.log("array1",array1);
  //   // const array1 = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
  //   // console.log("array2",array2);
  //   const array =
  //     Menu !== null &&
  //     Menu !== undefined &&
  //     Menu != "" &&
  //     array1?.split("").map((char) => parseInt(char));
  //   setArray(array)
  // }, [])

  // const Menu = sessionStorage.getItem("menu");
  const array1 = menu;
  // console.log("array1",array1);
  // const array1 = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
  // console.log("array2",array2);
  const array =
    menu !== null &&
    menu !== undefined &&
    menu != "" &&
    array1?.split("").map((char) => parseInt(char));

  const PROTECTED_ROUTES = [
    //PERSONEL
    {
      name: "Home",
      id: "dashboard",
      url: array[0] == "1" ? "/dashboard" : null,
      component: <Dashboard />,
      arr: array[0],
      roles: [],
      Icon: HomeIcon,
    },

    {
      name: "ATM Health",
      id: "atmhealth",
      url: array[0] == "1" ? "/atmhealth" : null,
      component: <ATMHealthBrowse />,
      arr: array[0],
      roles: [],
      Icon: HealthIcon,
      grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
         ]
    },
    


    // {
    //   name: "Bank Master",
    //   id: "bankmaster",
    //   url: array[0] == "1" ? "/bankmaster" : null,
    //   component: <BankMasterBrowse />,
    //   arr: array[0],
    //   roles: [],
    //   Icon: BankIcon,
    //   grandChild:[
    //     {arr:array[0]},
    //     {arr:array[0]},
    //     {arr:array[0]}
    //  ]
    // },

    {
      name: "ATM Master",
      id: "atmmaster",
      url: array[0] == "1" ? "/atmmaster" : null,
      component: <ATMMasterBrowse />,
      arr: array[0],
      roles: [],
      Icon: UpiIcon,
      grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
         ]
    },

    {
      name: "ATM Error",
      id: "atmerror",
      url: array[0] == "1" ? "/atmerror" : null,
      component: <ATMErrorBrowse />,
      arr: array[0],
      roles: [],
      Icon: ErrorIcon,
      grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
         ]
    },
    


    // {
    //   name: "Mobile Application User",
    //   id: "mobappuser",
    //   url: array[0] == "1" ? "/mobappuser" : null,
    //   component: <MobileAppUserBrowse />,
    //   arr: array[0],
    //   roles: [],
    //   Icon: UpiIcon,
    
    //   grandChild:[
    //         {arr:array[0]},
    //         {arr:array[0]},
    //         {arr:array[0]}
    //      ]
    // },
  

   


    // //Corporate
    // {
    //   name: "Home",
    //   id: "dashboard",
    //   url: array[1] == "1" ? "/dashboard" : null,
    //   component: <CorporateHome />,
    //   roles: [],
    //   arr: array[1],
    //   Icon: DashboardIcon,
    // },

  

    // // Checker VIEW Records
    {
      name: "Bank Master",
      id: "bankmaster",
      url: array[0] == "1" ? "/bankmaster" : null,
      roles: [],
      Icon: ApproveIcon,
      childRoutes: [
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: <BankMasterCreate />,
          Icon: BankIcon,
        },
        {
          name: "Modify",
          id: "modify",
          url: array[0] == "1" ?  "/modify" :null,
          roles: [],
          component: <BankMasterModify />,
          Icon: BankIcon,
        },
      ]
    },

    {
      name: "ATM Master",
      id: "atmmaster",
      url: array[0] == "1" ? "/atmmaster" : null,
      roles: [],
      Icon: UpiIcon,
      
      
      childRoutes: [
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: <ATMMasterCreate />,
          Icon: UpiIcon,
         
        },
        {
          name: "Modify",
          id: "modify",
          url: array[1] || array[2]!=0 ?  "/modify" :null,
          roles: [],
          component: <ATMMasterModify />,
          Icon: UpiIcon,
        },
      ]
    },

    
    {
      name: "Mobile App User",
      id: "mobapp",
      url: array[0] == "1" ? "/mobapp" : null,
      roles: [],
      Icon: MobIcon,
      childRoutes: [
          {
            name: "Authorize",
            id: "mobauthorize",
            url: array[0] == "1" ?  "/mobauthorize" :null,
            roles: [],
            arr : array[0],
            component: <MobileAppUserAuthorize />,
            Icon: MobIcon,
          },
          {
            name: "Browse",
            id: "mobappuser",
            url: array[0] == "1" ?  "/mobappuser" :null,
            component: <MobileAppUserBrowse />,
            arr: array[0],
             roles: [],
            Icon: MobIcon,
            grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
            ]
          },
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: <MobileAppUserCreate />,
          Icon: MobIcon,
         
        },
        {
          name: "Modify",
          id: "modify",
          url: array[1] || array[2]!=0 ?  "/modify" :null,
          roles: [],
          component: <MobileAppUserModify />,
          Icon: MobIcon,
        },
      ]
    },
    {
      name: "User ATM Assign Master",
      id: "useratmmaster",
      url: array[0] == "1" ? "/useratmmaster" : null,
      component: <UserATMAssignMasterBrowse />,
      arr: array[0],
      roles: [],
      Icon: UserIcon,
      grandChild:[
        {arr:array[0]},
        {arr:array[0]},
        {arr:array[0]}
     ]
    },


    {
      name: "User ATM Assign Master",
      id: "useratmmaster",
      url: array[0] == "1" ? "/useratmmaster" : null,
      roles: [],
      Icon: UserIcon,
      childRoutes: [
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: <UserATMAssignMasterCreate />,
          Icon: UserIcon,
        },
        {
          name: "Modify",
          id: "modify",
          url: array[0] == "1" ?  "/modify" :null,
          roles: [],
          component: <UserATMAssignMasterModify />,
          Icon: UserIcon,
        },
      ]
    },


    


    {
      name: "Bank ATM SMS Master",
      id: "atmsmsmaster",
      url: array[0] == "1" ? "/atmsmsmaster" : null,
      component: <BankAtmSMSMasterBrowse />,
      arr: array[0],
      roles: [],
      Icon: SMSIcon,
      grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
         ]
    },


    {
      name: "Bin Master",
      id: "localbinmaster",
      url: array[0] == "1" ? "/localbinmaster" : null,
      component: <LocalBinMasterBrowse />,
      arr: array[0],
      roles: [],
      Icon: LocalIcon,
      grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
         ]
    },

    
    {
      name: "Bin Master",
      id: "localbinmaster",
      url: array[0] == "1" ? "/localbinmaster" : null,
      roles: [],
      Icon: LocalIcon,
      
      
      childRoutes: [
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: <LocalBinMasterCreate />,
          Icon: LocalIcon,
         
        },
        {
          name: "Modify",
          id: "modify",
          url: array[1] || array[2]!=0 ?  "/modify" :null,
          roles: [],
          component: <LocalBinMasterModify />,
          Icon: LocalIcon,
        },
      ]
    },
    {
      name: "Bank User Master",
      id: "bankusermaster",
      url: array[0] == "1" ? "/bankusermaster" : null,
      roles: [],
      Icon: BankUserIcon,
      childRoutes: [
          {
            name: "Authorize",
            id: "bankuserauth",
            url: array[0] == "1" ?  "/bankuserauth" :null,
            roles: [],
            arr : array[0],
            component: <BankUserMasterAuthorize />,
            Icon: BankUserIcon,
          },
          {
            name: "Browse",
            id: "bankusermst",
            url: array[0] == "1" ?  "/bankusermst" :null,
            component: <BankUserMasterBrowse />,
            arr: array[0],
             roles: [],
            Icon: BankUserIcon,
            grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
            ]
          },
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: < BankUserMasterCreate/>,
          Icon: BankUserIcon,
         
        },
        {
          name: "Modify",
          id: "modify",
          url: array[1] || array[2]!=0 ?  "/modify" :null,
          roles: [],
          component: <BankUserMasterModify />,
          Icon: BankUserIcon,
        },
      ]
    },

    {
      name: "ATM Service",
      id: "atmservice",
      url: array[0] == "1" ? "/atmservice" : null,
      component: <ATMServiceBrowse />,
      arr: array[0],
      roles: [],
      Icon: UpiIcon,
      grandChild:[
            {arr:array[0]},
            {arr:array[0]},
            {arr:array[0]}
         ]
    },
    
    
    {
      name: "Transaction",
      id: "transaction",
      url: array[0] == "1" ? "/transaction" : null,
      roles: [],
      Icon: TransactionIcon,
      childRoutes: [
        {
          name: "Acquire Report",
          id: "localandaquirer",
          url: array[0] == "1" ?  "/localandaquirer" :null,
          roles: [],
          arr : array[0],
          component: <LocalAndAquirerBrowse />,
          Icon: TransactionIcon,
        },

        
        {
          name: "Issuer Report",
          id: "issuer",
          url: array[0] == "1" ?  "/issuer" :null,
          roles: [],
          arr : array[0],
          component: <IssuerBrowse />,
          Icon: UpiIcon,
        },
        {
          name: "Switch Report",
          id: "switch",
          url: array[0] == "1" ?  "/switch" :null,
          roles: [],
          arr : array[0],
          component: <SwitchBrowse />,
          Icon: UpiIcon,
        },

        {
          name: "Issuer Switch Report",
          id: "issuerswitch",
          url: array[0] == "1" ?  "/issuerswitch" :null,
          roles: [],
          arr : array[0],
          component: <IssuerSwitchBrowse />,
          Icon: UpiIcon,
        },

        
      ]
    },


    // {
    //   name: "Key Master",
    //   id: "keymaster",
    //   url: array[0] == "1" ? "/keymaster" : null,
    //   component: <KeyMasterBrowse />,
    //   arr: array[0],
    //   roles: [],
    //   Icon: QRsvg,
    // },
    // {
    //   name: "Network Master",
    //   id: "networkmaster",
    //   url: array[0] == "1" ? "/networkmaster" : null,
    //   component: <NetworkMasterBrowse />,
    //   arr: array[0],
    //   roles: [],
    //   Icon: CreditCardIcon,
    // },

    {
      name: "Bank ATM SMS Master",
      id: "atmsmsmaster",
      url: array[0] == "1" ? "/atmsmsmaster" : null,
      roles: [],
      Icon: SMSIcon,
      
      
      childRoutes: [
        {
          name: "Create",
          id: "create",
          url: array[0] == "1" ?  "/create" :null,
          roles: [],
          component: <BankAtmSMSMasterCreate />,
          Icon: SMSIcon,
         
        },
        {
          name: "Modify",
          id: "modify",
          url: array[1] || array[2]!=0 ?  "/modify" :null,
          roles: [],
          component: <BankAtmSMSMasterModify />,
          Icon: SMSIcon,
        },
      ]
    },

    // {
    //   name: "Key Master",
    //   id: "keymaster",
    //   url: array[0] == "1" ? "/keymaster" : null,
    //   roles: [],
    //   Icon: QRsvg,
    //   childRoutes: [
    //     {
    //       name: "Create",
    //       id: "create",
    //       url: array[0] == "1" ?  "/create" :null,
    //       roles: [],
    //       component: <KeyMasterCreate />,
    //       Icon: QRsvg,
    //     },
    //   ]
    // },

    // {
    //   name: "Network Master",
    //   id: "networkmaster",
    //   url: array[0] == "1" ? "/networkmaster" : null,
    //   roles: [],
    //   Icon: CreditCardIcon,
    //   childRoutes: [
    //     {
    //       name: "Create",
    //       id: "create",
    //       url: array[0] == "1" ?  "/create" :null,
    //       roles: [],
    //       component: <NetworkMasterCreate />,
    //       Icon: CreditCardIcon,
    //     },
    //   ]
    // },


  ];
  return {
    PROTECTED_ROUTES,
  };
};

export default Routes;

// export const PROTECTED_ROUTES_CORPORATE = [
// {
//   name: "Corporate Home",
//   id: "corporatehome",
//   url: "/corporatehome",
//   component: <Settings />,
//   roles: ["all"],
//   Icon: DashboardIcon,
// },
// ];
