import { createSlice } from "@reduxjs/toolkit"

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    timeoutId: null,
    msg: null,
    type: null,
  },
  reducers: {
    addNotification: (state, action) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return action.payload
    },
    removeNotification: () => {
      return {
        timeoutId: null,
        msg: null,
        type: null,
      }
    },
  },
})

export const { addNotification, removeNotification } =
  notificationSlice.actions

export const toast = (msg, type, timeout = 5) => {
  return (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    )
    const notification = { msg, type, timeoutId }
    dispatch(addNotification(notification))
  }
}

export default notificationSlice.reducer
