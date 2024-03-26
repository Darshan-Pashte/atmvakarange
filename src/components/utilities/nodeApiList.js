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


export const baseUrlServer = process.env.REACT_APP_API_URL;

// Dev UAT URL
// export const baseUrlServer = "http://199.34.22.236:9116";

// Sonal Local
// export const baseUrlServer = "http://10.103.10.84:8002";

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
  LOGIN: baseUrlServer + "/vakrangee/login",

LOGIN_VALIDATE_OTP:baseUrlServer + '/vakrangee/validateotp',
RESEND_OTP:baseUrlServer + '/vakrangee/resendotp',
RESEND_FORGET_OTP:baseUrlServer + '/vakrangee/resendforgototp',

FORGOT_PASSWORD:baseUrlServer + '/vakrangee/sendotp',
FORGOT_PASSWORD_OTP_VALIDATE:baseUrlServer + '/vakrangee/validforgototp',
RESET_PASSWORD:baseUrlServer + '/vakrangee/updatepass',


ATM_MASTER_CREATE:baseUrlServer + '/vakrangee/atmmaster/create',
ATM_MASTER_BROWSE:baseUrlServer + '/vakrangee/atmmaster/browse',
ATM_MASTER_MODIFY:baseUrlServer + '/vakrangee/atmmaster/modify',

BANK_MASTER_CREATE:baseUrlServer + '/vakrangee/bankmaster/create',
BANK_MASTER_BROWSE:baseUrlServer + '/vakrangee/bankmaster/browse',
BANK_MASTER_MODIFY:baseUrlServer + '/vakrangee/bankmaster/modify',

GET_BANKCODE:baseUrlServer + '/vakrangee/atmmaster/brwbnkcode',
GET_ATMID:baseUrlServer + '/vakrangee/atmmaster/brwatmid',
GET_ATMID_SINGLE:baseUrlServer + '/vakrangee/atmmaster/brwatmidnew',
GET_CARDBIN:baseUrlServer + '/vakrangee/transmaster/cardbinbrw',
GET_USERID:baseUrlServer + '/vakrangee/useratmassignmst/useridbrw',
GET_ATMNAME:baseUrlServer + '/vakrangee/bnkatmsmsmst/atmnamebrw',


MOBILE_APP_USER_CREATE:baseUrlServer + '/vakrangee/mobileappuser/create',
MOBILE_APP_USER_BROWSE:baseUrlServer + '/vakrangee/mobileappuser/browse',
MOBILE_APP_USER_AUTHORIZE:baseUrlServer + '/vakrangee/mobileappuser/auth',
MOBILE_APP_USER_MODIFY:baseUrlServer + '/vakrangee/mobileappuser/modify',

USER_ATM_ASSIGN_CREATE:baseUrlServer + '/vakrangee/useratmassignmst/create',
USER_ATM_ASSIGN_BROWSE:baseUrlServer + '/vakrangee/useratmassignmst/browse',
USER_ATM_ASSIGN_MODIFY:baseUrlServer + '/vakrangee/useratmassignmst/modify',


BANK_ATM_SMS_MASTER_CREATE:baseUrlServer + '/vakrangee/bnkatmsmsmst/create',
BANK_ATM_SMS_MASTER_BROWSE:baseUrlServer + '/vakrangee/bnkatmsmsmst/browse',
BANK_ATM_SMS_MASTER_MODIFY:baseUrlServer + '/vakrangee/bnkatmsmsmst/modify',


LOCAL_BIN_MASTER_CREATE:baseUrlServer + '/vakrangee/localbinmst/create',
LOCAL_BIN_MASTER_BROWSE:baseUrlServer + '/vakrangee/localbinmst/browse',
LOCAL_BIN_MASTER_MODIFY:baseUrlServer + '/vakrangee/localbinmst/modify',

BANK_USER_MASTER_CREATE:baseUrlServer + '/vakrangee/bnkusermst/create',
BANK_USER_MASTER_BROWSE:baseUrlServer + '/vakrangee/bnkusermst/browse',
BANK_USER_MASTER_BROWSE_AUTH:baseUrlServer + '/vakrangee/bnkusermst/authbrw',
BANK_USER_MASTER_MODIFY:baseUrlServer + '/vakrangee/bnkusermst/modify',
BANK_USER_MASTER_DELETE:baseUrlServer + '/vakrangee/bnkusermst/delete',
BANK_USER_MASTER_AUTHORIZE:baseUrlServer + '/vakrangee/bnkusermst/auth',


ATM_SERVICE_BROWSE:baseUrlServer + '/vakrangee/atmservice/brwlst',
ATM_SERVICE_DATA:baseUrlServer + '/vakrangee/atmservice/',


LOCAL_ACQUIRE_BROWSE:baseUrlServer + '/vakrangee/transmaster/acqtransreports',
ISSUER_BROWSE:baseUrlServer + '/vakrangee/transmaster/issuertranslst',
SWITCH_BROWSE:baseUrlServer + '/vakrangee/transmaster/switchreports',
ISSUER_SWITCH_BROWSE:baseUrlServer + '/vakrangee/transmaster/issuerswitchreports',


DASHBOARD_COUNT:baseUrlServer + '/vakrangee/dashboard',
DASHBOARD_GRAPH:baseUrlServer + '/vakrangee/dashboardgraph',
DASHBOARD_SUCCESS_GRAPH:baseUrlServer + '/vakrangee/wakhdashboard',
DASHBOARD_DAY_GRAPH:baseUrlServer + '/vakrangee/acqdashgraph',

DASHBOARD_DOWNLOAD_EXCEL:baseUrlServer + '/vakrangee/acqdashgraphexcel',

DASHBOARD_TRANSACTION_REPORT:baseUrlServer + '/vakrangee/transnewrecords',

DASHBOARD_INSERVICE_BROWSE:baseUrlServer + '/vakrangee/',

ATM_HEALTH_BROWSE:baseUrlServer + '/vakrangee/atmhealth',
ATM_ERROR_BROWSE:baseUrlServer + '/vakrangee/atmerror',




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
