export default function ({ store, redirect }) {
  if (Object.keys(store.state.auth.user).length === 0) {
    return redirect('/login')
  }
}
