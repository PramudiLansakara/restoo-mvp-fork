export default function checkIfNotAuthed({ store, redirect }) {
  // If the user is not authed
  if (!store.state.auth.authToken) {
    return redirect({
      name: "login"
    });
  }
}
