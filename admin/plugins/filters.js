import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("formatDate", function (value) {
  if (value) {
    return dayjs(value.toString()).format("YYYY-MM-DD HH:mm a");
  }
});

Vue.filter("getColorByStatus", status => {
  const colors = {
    cancelled: "red",
    waiting: "primary lighten-1",
    completed: "purple",
    preparing: "orange",
    served: "black",
    accepted: "green",
    pending: "orange",
    declined: "red",
    active: "green",
    deactive: "red"
  };
  return colors[status];
});

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
  });
  return formatter.format(value);
});
