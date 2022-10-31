const Cookie = process.client ? require("js-cookie") : undefined;

export default function checkIfNotAuthed({ store, redirect }) {
  // If the user is not authed
  if (!Cookie.get("authToken")) {
    return redirect({
      name: "login"
    });
  }
}
