import { toast } from "react-toastify";
toast.configure();
function SuccessToast(message) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}

export default SuccessToast;
