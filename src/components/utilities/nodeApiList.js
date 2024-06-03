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
  LOGIN: baseUrlServer + "/vakrangee/login/dologin",

LOGIN_VALIDATE_OTP:baseUrlServer + '/vakrangee/services/validateotp',
RESEND_OTP:baseUrlServer + '/vakrangee/services/resendotp',
RESEND_FORGET_OTP:baseUrlServer + '/vakrangee/login/resendforgototp',

FORGOT_PASSWORD:baseUrlServer + '/vakrangee/login/sendotp',
FORGOT_PASSWORD_OTP_VALIDATE:baseUrlServer + '/vakrangee/login/validforgototp',
RESET_PASSWORD:baseUrlServer + '/vakrangee/login/updatepass',


ATM_MASTER_CREATE:baseUrlServer + '/vakrangee/services/atmmaster/create',
ATM_MASTER_BROWSE:baseUrlServer + '/vakrangee/services/atmmaster/browse',
ATM_MASTER_MODIFY:baseUrlServer + '/vakrangee/services/atmmaster/modify',


TMK_CHECKSUM_MODIFY:baseUrlServer + '/vakrangee/services/atmmaster/modifytmkchecksum',

BANK_MASTER_CREATE:baseUrlServer + '/vakrangee/services/bankmaster/create',
BANK_MASTER_BROWSE:baseUrlServer + '/vakrangee/services/bankmaster/browse',
BANK_MASTER_MODIFY:baseUrlServer + '/vakrangee/services/bankmaster/modify',

GET_BANKCODE:baseUrlServer + '/vakrangee/services/atmmaster/brwbnkcode',
GET_ATMID:baseUrlServer + '/vakrangee/services/atmmaster/brwatmid',
GET_ATMID_SINGLE:baseUrlServer + '/vakrangee/services/atmmaster/brwatmidnew',
GET_CARDBIN:baseUrlServer + '/vakrangee/services/transmaster/cardbinbrw',
GET_USERID:baseUrlServer + '/vakrangee/services/useratmassignmst/useridbrw',
GET_ATMNAME:baseUrlServer + '/vakrangee/services/bnkatmsmsmst/atmnamebrw',


MOBILE_APP_USER_CREATE:baseUrlServer + '/vakrangee/services/mobileappuser/create',
MOBILE_APP_USER_BROWSE:baseUrlServer + '/vakrangee/services/mobileappuser/browse',
MOBILE_APP_USER_AUTHORIZE:baseUrlServer + '/vakrangee/services/mobileappuser/auth',
MOBILE_APP_USER_MODIFY:baseUrlServer + '/vakrangee/services/mobileappuser/modify',

USER_ATM_ASSIGN_CREATE:baseUrlServer + '/vakrangee/services/useratmassignmst/create',
USER_ATM_ASSIGN_BROWSE:baseUrlServer + '/vakrangee/services/useratmassignmst/browse',
USER_ATM_ASSIGN_MODIFY:baseUrlServer + '/vakrangee/services/useratmassignmst/modify',


BANK_ATM_SMS_MASTER_CREATE:baseUrlServer + '/vakrangee/services/bnkatmsmsmst/create',
BANK_ATM_SMS_MASTER_BROWSE:baseUrlServer + '/vakrangee/services/bnkatmsmsmst/browse',
BANK_ATM_SMS_MASTER_MODIFY:baseUrlServer + '/vakrangee/services/bnkatmsmsmst/modify',


LOCAL_BIN_MASTER_CREATE:baseUrlServer + '/vakrangee/services/localbinmst/create',
LOCAL_BIN_MASTER_BROWSE:baseUrlServer + '/vakrangee/services/localbinmst/browse',
LOCAL_BIN_MASTER_MODIFY:baseUrlServer + '/vakrangee/services/localbinmst/modify',

BANK_USER_MASTER_CREATE:baseUrlServer + '/vakrangee/services/bnkusermst/create',
BANK_USER_MASTER_BROWSE:baseUrlServer + '/vakrangee/services/bnkusermst/browse',
BANK_USER_MASTER_BROWSE_AUTH:baseUrlServer + '/vakrangee/services/bnkusermst/authbrw',
BANK_USER_MASTER_MODIFY:baseUrlServer + '/vakrangee/services/bnkusermst/modify',
BANK_USER_MASTER_DELETE:baseUrlServer + '/vakrangee/services/bnkusermst/delete',
BANK_USER_MASTER_AUTHORIZE:baseUrlServer + '/vakrangee/services/bnkusermst/auth',


ATM_SERVICE_BROWSE:baseUrlServer + '/vakrangee/services/atmservice/brwlst',
ATM_SERVICE_DATA:baseUrlServer + '/vakrangee/services/atmservice/',


LOCAL_ACQUIRE_BROWSE:baseUrlServer + '/vakrangee/services/transmaster/acqtransreports',
LOCAL_ACQUIRE_DOWNLOAD:baseUrlServer + '/vakrangee/services/transmaster/acqexceltranslst',

ISSUER_BROWSE:baseUrlServer + '/vakrangee/services/transmaster/issuertranslst',
SWITCH_BROWSE:baseUrlServer + '/vakrangee/services/transmaster/switchreports',
ISSUER_SWITCH_BROWSE:baseUrlServer + '/vakrangee/services/transmaster/issuerswitchreports',


DASHBOARD_COUNT:baseUrlServer + '/vakrangee/services/dashboard',
DASHBOARD_GRAPH:baseUrlServer + '/vakrangee/services/dashboardgraph',
DASHBOARD_SUCCESS_GRAPH:baseUrlServer + '/vakrangee/services/wakhdashboard',
DASHBOARD_DAY_GRAPH:baseUrlServer + '/vakrangee/services/acqdashgraph',
DASHBOARD_DAY_COUNT:baseUrlServer + '/vakrangee/services/dashatmstatuscnt',

DASHBOARD_DOWNLOAD_EXCEL:baseUrlServer + '/vakrangee/services/acqdashgraphexcel',

DASHBOARD_TRANSACTION_REPORT:baseUrlServer + '/vakrangee/services/transnewrecords',

DASHBOARD_INSERVICE_BROWSE:baseUrlServer + '/vakrangee/services/',

DASHBOARD_INSERVICE_EXCEL:baseUrlServer + '/vakrangee/services/',

DASHBOARD_MODAL_HISTORY:baseUrlServer + '/vakrangee/services/atmhistory',

ATM_HEALTH_BROWSE:baseUrlServer + '/vakrangee/services/atmhealth',
ATM_ERROR_BROWSE:baseUrlServer + '/vakrangee/services/atmerror',




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
