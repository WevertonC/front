export default {
  state: {
    events: []
  },
  mutations: {
    setEvents(state, payload) {
      state.events = payload
  },
  }
}