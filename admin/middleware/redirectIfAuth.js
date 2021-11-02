/* eslint-disable consistent-return */
export default function checkIfAuthed({ store, redirect }) {
  // If the user is authed
  if (store.state.auth.authToken) {
    return redirect({
      name: "dashboard"
    });
  }
}
