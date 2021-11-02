import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("formatDate", function (value) {
  if (value) {
    return dayjs(value.toString()).format("YYYY-MM-DD");
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
