import { notificationAlert } from "index";

export const notify = (message, type = "success") => {
  //   var color = Math.floor(Math.random() * 5 + 1);
  let color = type;
  //   switch (color) {
  //     case 1:
  //       type = "primary";
  //       break;
  //     case 2:
  //       type = "success";
  //       break;
  //     case 3:
  //       type = "danger";
  //       break;
  //     case 4:
  //       type = "warning";
  //       break;
  //     case 5:
  //       type = "info";
  //       break;
  //     default:
  //       break;
  //   }
  var options = {};
  options = {
    place: "tr",
    message: message,
    type: color,
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3,
  };
  notificationAlert.current.notificationAlert(options);
};
