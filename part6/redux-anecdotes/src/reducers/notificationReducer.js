import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      if (state !== null) {
        clearTimeout(state.timeoutId)
      }
      return action.payload
    },
    removeNotification(state, action) {
      return null
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      time * 1000
    )
    const notification = { content, timeoutId }
    dispatch(createNotification(notification))
  }
}

export default notificationSlice.reducer
