import SweetAlertPopup from "../common/sweetAlertPopup";

const validateResponse = (apiData) => {
    if (typeof apiData == "undefined") {
      return {
        status: false,
        error: "unauthorized",
      };
    }
    return apiData;
  };
  
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
  
  export async function postApiData(url,payload) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  
    const apiData = await response.json();
    if(apiData?.respCode == "IS"){
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    }
    return validateResponse(apiData);
  }
  
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
  
  