export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const newDateChanger = (date) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hr = today.getHours();
  let min = today.getMinutes();
  let ampm = hr < 12 ? "AM" : "PM";
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (hr > 12) hr = hr - 12;
  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  const formattedToday =
    dd + "-" + mm + "-" + yyyy + " " + hr + ":" + min + " " + ampm;
  return formattedToday;
};
