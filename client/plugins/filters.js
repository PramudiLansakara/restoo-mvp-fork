import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("formatDate", function(value) {
  if (value) {
    return dayjs(value.toString()).format("MM/DD/YYYY HH:mm a");
  }
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

