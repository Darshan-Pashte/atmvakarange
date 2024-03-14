import axios from "axios";

export const baseUrl = "http://199.34.22.245:7178";
// export const baseUrl = "http://199.34.22.225:8082";
export const baseUrl1 = "http://199.34.22.236:9407";
export const ShankarSirUrlLocal =
  "http://10.103.10.76:8082/airtelUpiPortalReq/get";
export const ShankarSirUrlLogin = "http://10.103.10.76:8082";
export const ShankarSirUrlServer =
  "http://199.34.22.236:9404/airtelUpiPortalReq/get";

export const baseUrlMayur = "http://10.103.10.77:4040";
export const baseUrlSonal = "http://10.103.10.84:4242";
export const baseUrlDhananjay = "http://10.103.10.86:9404/services";


// export const baseUrlServer = process.env.REACT_APP_API_URL;

// Dev UAT URL
// export const baseUrlServer = "http://199.34.22.236:9116";

// Sonal Local
export const baseUrlServer = "http://10.103.10.84:8083";

// sonal UAT
// export const baseUrlServer = "http://199.34.22.236:9404";

// Production
// export const baseUrlServer = "https://atmportal.siplchd.co.in/admin";



// Vakrangee Production   vakrangeeatmadminportal
// export const baseUrlServer = "https://atmportal.siplchd.co.in/vakrangee";


// Testing Public Base URL
// export const baseUrlServer = "http://199.34.22.225:8082";

// export const baseUrlServer = "http://199.34.22.225:8085";


// Testing UAT Base URL
// export const baseUrlServer = "http://10.100.9.112:8082";

// export const baseUrlServerLogin = "http://199.34.22.236:9404"
export const baseUrlServerLogin = "http://199.34.22.236:9409";
export const baseUrlServerLive =
  "http://199.34.22.236:9404/airtelUpiPortalReq/get";
export const Productionurl =
  "https://youcloud.silsaas.co.in/airtelUpiPortalReq/get";
export const LoginProduction = "https://youcloud.silsaas.co.in";

// URL for download at UAT
// export const UpiTransactionDownloadList = "http://10.103.10.76:8082/airtelUpiPortalReq/downloadUpiTxnReport?bankcode="
// export const vpaDownloadList ="http://199.34.22.236:9404/airtelUpiPortalReq/downloadDataToCreateVPA?bankcode="
// export const vpafileupload ="http://10.103.10.76:8082/airtelUpiPortalReq/fileupload"

// URL for download PRODUCTION
export const vpafileupload =
  "https://youcloud.silsaas.co.in/airtelUpiPortalReq/fileupload";
export const UpiTransactionDownloadList =
  "https://youcloud.silsaas.co.in/airtelUpiPortalReq/downloadUpiTxnReport?bankcode=";
export const vpaDownloadList =
  "https://youcloud.silsaas.co.in/airtelUpiPortalReq/downloadDataToCreateVPA?bankcode=";

export const apiList = {
  // // Base URL for UAT
  // LOGIN: baseUrlServerLogin+"/airtelupiportallogin/login",
  LOGIN: baseUrlServer + "/atmportal/login",

LOGIN_VALIDATE_OTP:baseUrlServer + '/atmportal/validateotp',
RESEND_OTP:baseUrlServer + '/atmportal/resendotp',
RESEND_FORGET_OTP:baseUrlServer + '/atmportal/resendforgototp',

FORGOT_PASSWORD:baseUrlServer + '/atmportal/sendotp',
FORGOT_PASSWORD_OTP_VALIDATE:baseUrlServer + '/atmportal/validforgototp',
RESET_PASSWORD:baseUrlServer + '/atmportal/updatepass',


ATM_MASTER_CREATE:baseUrlServer + '/atmportal/atmmaster/create',
ATM_MASTER_BROWSE:baseUrlServer + '/atmportal/atmmaster/browse',
ATM_MASTER_MODIFY:baseUrlServer + '/atmportal/atmmaster/modify',

BANK_MASTER_CREATE:baseUrlServer + '/atmportal/bankmaster/create',
BANK_MASTER_BROWSE:baseUrlServer + '/atmportal/bankmaster/browse',
BANK_MASTER_MODIFY:baseUrlServer + '/atmportal/bankmaster/modify',

GET_BANKCODE:baseUrlServer + '/atmportal/atmmaster/brwbnkcode',
GET_ATMID:baseUrlServer + '/atmportal/atmmaster/brwatmid',
GET_CARDBIN:baseUrlServer + '/atmportal/transmaster/cardbinbrw',
GET_USERID:baseUrlServer + '/atmportal/useratmassignmst/useridbrw',
GET_ATMNAME:baseUrlServer + '/atmportal/bnkatmsmsmst/atmnamebrw',


MOBILE_APP_USER_CREATE:baseUrlServer + '/atmportal/mobileappuser/create',
MOBILE_APP_USER_BROWSE:baseUrlServer + '/atmportal/mobileappuser/browse',
MOBILE_APP_USER_AUTHORIZE:baseUrlServer + '/atmportal/mobileappuser/auth',
MOBILE_APP_USER_MODIFY:baseUrlServer + '/atmportal/mobileappuser/modify',

USER_ATM_ASSIGN_CREATE:baseUrlServer + '/atmportal/useratmassignmst/create',
USER_ATM_ASSIGN_BROWSE:baseUrlServer + '/atmportal/useratmassignmst/browse',
USER_ATM_ASSIGN_MODIFY:baseUrlServer + '/atmportal/useratmassignmst/modify',


BANK_ATM_SMS_MASTER_CREATE:baseUrlServer + '/atmportal/bnkatmsmsmst/create',
BANK_ATM_SMS_MASTER_BROWSE:baseUrlServer + '/atmportal/bnkatmsmsmst/browse',
BANK_ATM_SMS_MASTER_MODIFY:baseUrlServer + '/atmportal/bnkatmsmsmst/modify',


LOCAL_BIN_MASTER_CREATE:baseUrlServer + '/atmportal/localbinmst/create',
LOCAL_BIN_MASTER_BROWSE:baseUrlServer + '/atmportal/localbinmst/browse',
LOCAL_BIN_MASTER_MODIFY:baseUrlServer + '/atmportal/localbinmst/modify',

BANK_USER_MASTER_CREATE:baseUrlServer + '/atmportal/bnkusermst/create',
BANK_USER_MASTER_BROWSE:baseUrlServer + '/atmportal/bnkusermst/browse',
BANK_USER_MASTER_BROWSE_AUTH:baseUrlServer + '/atmportal/bnkusermst/authbrw',
BANK_USER_MASTER_MODIFY:baseUrlServer + '/atmportal/bnkusermst/modify',
BANK_USER_MASTER_DELETE:baseUrlServer + '/atmportal/bnkusermst/delete',
BANK_USER_MASTER_AUTHORIZE:baseUrlServer + '/atmportal/bnkusermst/auth',


ATM_SERVICE_BROWSE:baseUrlServer + '/atmportal/atmservice/brwlst',
ATM_SERVICE_DATA:baseUrlServer + '/atmportal/atmservice/',


LOCAL_ACQUIRE_BROWSE:baseUrlServer + '/atmportal/transmaster/localacqtranslst',
ISSUER_BROWSE:baseUrlServer + '/atmportal/transmaster/issuertranslst',
SWITCH_BROWSE:baseUrlServer + '/atmportal/transmaster/switchreports',
ISSUER_SWITCH_BROWSE:baseUrlServer + '/atmportal/transmaster/issuerswitchreports',


DASHBOARD_COUNT:baseUrlServer + '/atmportal/dashboard',
DASHBOARD_GRAPH:baseUrlServer + '/atmportal/dashboardgraph',
DASHBOARD_SUCCESS_GRAPH:baseUrlServer + '/atmportal/wakhdashboard',
DASHBOARD_DAY_GRAPH:baseUrlServer + '/atmportal/acqdashgraph',

DASHBOARD_TRANSACTION_REPORT:baseUrlServer + '/atmportal/transnewrecords',

DASHBOARD_INSERVICE_BROWSE:baseUrlServer + '/atmportal/',

ATM_HEALTH_BROWSE:baseUrlServer + '/atmportal/atmhealth',
ATM_ERROR_BROWSE:baseUrlServer + '/atmportal/atmerror',




  // CORPORATELOGIN : baseUrlServer + "/corporate/banking/dologin",
  // CORPORATEOTP: baseUrlServer + "/corporate/banking/validateloginotp",
  // REGISTER: baseUrlServer + "/banking/doregister",
  // UPDATEPASS: baseUrlServer + "/banking/updatepassword",
  // OTP: baseUrlServer + "/banking/validateloginotp",
  // REGISTEROTP: baseUrlServer + "/banking/validateotp",

  // FORGOTPASS: baseUrlServer + "/banking/forgotPassword",
  // FORGOTPASSOTPVALIDATE: baseUrlServer + "/banking/validateotp",


};

export const header = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "request-id ": "yaN7M9I7xHG0Ln0SYhORnw==",
    "request-key": "NUW1WGooueVbByqEp4rwrA==",
  },
};

export const headerSaving = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "request-id ": "ItJpwb8+bI7M3std+IygAvrWGBBQP5xxRK8ABFt+1+c=",
    "request-key": "FwIOemhG55dkToVR6EzcAfJRZcWSBFLLXFlJwThIcac=",
  },
};

const ServerInstance = axios.create({
  baseURL: baseUrl,
});

ServerInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwtToken");
  if (token) config.headers.authorization = `Bearer ${JSON.parse(token)}`;
  return config;
});

export default ServerInstance;
