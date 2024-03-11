import Swal from 'sweetalert2';

const SweetAlertPopup = (message, msgtype, msgicon) => {
    {
      Swal.fire({
        title: msgtype,
        text: message,
        icon: msgicon,
      });
    }
  };

export default SweetAlertPopup