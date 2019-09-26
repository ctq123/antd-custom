
const incrementReducer = (state = {
  count: 0,
  loading: false,
}, action) => {
  const { type } = action
  switch(type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'INCREMENT_ASYNC':
      return {
        ...state,
        loading: true,
      }
    case 'INCREMENT_ASYNC_SUCCESS':
      const { payload } = action
      return {
        ...state,
        count: state.count + payload,
        loading: false,
      }
    default:
      return state
  }
}

export default incrementReducer