import Swal from "sweetalert2";
import SweetAlertPopup from "../common/sweetAlertPopup";
import { baseUrl } from "./nodeApiList";
import axios from "axios";  

// const validateResponse = (apiData) => {
//     if (typeof apiData == "undefined") {
//       return {
//         status: false,
//         error: "unauthorized",
//       };
//     }
//     return apiData;
//   };
  
  export async function getApiData(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const apiData = await response.json();
    if(apiData?.respCode == "IS"){
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
    
    return validateResponse(apiData);
  }
  
  // export async function postApiData(url,payload) {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });
  
  //   const apiData = await response.json();
  //   if(apiData?.respCode == "IS"){
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     window.location.reload();
  //   }
  //   return validateResponse(apiData);
  // }
  
  export async function postApiDataNew(url,payload, handleLogout) {
    // const token=sessionStorage.getItem("token")
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "request-id ": "yaN7M9I7xHG0Ln0SYhORnw==",
        "request-key": "NUW1WGooueVbByqEp4rwrA==",
        // token:`Barrier ${token}`
      },
    });
  
    const apiData = await response.json();
    return validateResponse(apiData);
  }
  
  
  export async function postfileData(url, file, headers) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(url, {
      
      // mode: 'no-cors',
      method: "POST",
      body: formData,
      // body: JSON.stringify(payload),
      // redirect: 'follow',
      headers: {
         "Content-Type": "multipart/form-data",
         
        "Accept": "/",
        "type": "formData",
        ...headers
      },
    });
    const apiData = await response.json();
    return validateResponse(apiData);
  }
  
  
  export async function updateApiData(url,payload, handleLogout) {
  
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  
    const apiData = await response.json();
    return validateResponse(apiData);
  }
  
// AXIOS 
  const API = axios.create({
    baseURL: baseUrl,
  });

  API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("JWTToken");
    // const username = sessionStorage.getItem("username");
    // const branch = sessionStorage.getItem("branch");
    // if (token) config.headers.authorization = `${token}`;
    if (token) config.headers['Authorization'] = token;
    // console.log('token',token)
    // if (username) {
    //   config.headers["X-Username"] = JSON.parse(username);
    // }
    // if (branch) {
    //   config.headers["X-Branch"] = JSON.parse(branch);
    // }
    return config;
  });
  
  export default API;

  // AXIOS POST Request
  export async function postApiData(url, payload) {
  
    try {
      const response = await API.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });
      if (response.data.respCode === "IS") {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      return validateResponse(response);
    } catch (error) {
      // if (error.response && error.response.status === 403) {
      //   Swal.fire({
      //     title: "Session has been expired!!!",
      //     icon: "question",
      //     showDenyButton: false,
      //     showCancelButton: false,
      //     confirmButtonText: "Login Again" ,
      //     denyButtonText: `Deny`
      //   }).then((result) => {
      //     /* Read more about isConfirmed, isDenied below */
      //     if (result.isConfirmed) {
      //       sessionStorage.clear();
      //       localStorage.clear();
      //       window.location.reload();
      //       window.location.href = "/vakrangeeatmadminportal/auth/login"
      //     } else if (result.isDenied) {
       
      //     }
      //   }).catch((err)=>{SweetAlertPopup('kk','kkj')});
      //   // window.location.href = "/vakrangeeatmadminportal"
      // } else {
      //   // Handle other errors
      //   console.error("Error in postApiData:", error);
      //   throw error; // Rethrow the error for higher level handling if necessary
      // }
    }
  }


// Axios GET

// Function to handle errors and responses for GET requests
export async function axiosGetApiData(url,headers) {
  try {
    const response = await API.get(url,headers);
    if (response.data.respCode === "IS") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
    return validateResponse(response);
  } catch (error) {
    // if (error.response && error.response.status === 403) {
    //   // Redirect to login page

    //   // const navigate = useNavigate();
    //   //       navigate("/auth/login")
      
    
    //   // window.location.href = "/vakrangeeatmadminportal"
    //   Swal.fire({
    //     title: "Session has been expired!!!",
    //     icon: "question",
    //     showDenyButton: false,
    //     showCancelButton: false,
    //     confirmButtonText: "Login Again" ,
    //     denyButtonText: `Deny`
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //       sessionStorage.clear();
    //       localStorage.clear();
    //       window.location.reload();
    //       window.location.href = "/vakrangeeatmadminportal/auth/login"
    //     } 
    //     else if (result.isDenied) {
     
    //     }
    //   });
    //   // window.location.href = "/vakrangeeatmadminportal"
    
    // } else {
    //   // Handle other errors
    //   console.error("Error in axiosGetApiData:", error);
    //   throw error; // Rethrow the error for higher level handling if necessary
    // }
  }
}

// Function to validate response (you need to implement this)
function validateResponse(response) {
  // Implement your response validation logic here

  // console.log('validateresponse',response)
  return response; // For now, just returning the response data
}