/* eslint-disable consistent-return */
const Cookie = process.client ? require("js-cookie") : undefined;

export default function checkIfAuthed({ store, redirect }) {
  // If the user is authed
  if (Cookie.get("authToken")) {
    return redirect({
      name: "dashboard"
    });
  }
}
