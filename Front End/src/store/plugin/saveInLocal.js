// Simple persistent storage plugin
export default store => {
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state)) //Convert to object form
  store.subscribe((mutation, state) => {
    localStorage.state = JSON.stringify(state) //state is an object, converted to a string
  })
}
