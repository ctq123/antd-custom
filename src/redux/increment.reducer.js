
const incrementReducer = (state = {
  count: 0,
}, action) => {
  const { type, payload } = action
  switch(type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + payload,
      }
    default:
      return state
  }
}

export default incrementReducer