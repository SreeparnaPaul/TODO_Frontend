import swal from "sweetalert";

const SweetAlert = (title, text, icon, btn) => {
  if (btn) {
    swal({
      title: title,
      text: text,
      icon: icon,
      timer: 3000,
      button: btn,
    });
  } else {
    swal({
      title: title,
      text: text,
      timer: 3000,
      icon: icon,
    });
  }
};

export { SweetAlert };