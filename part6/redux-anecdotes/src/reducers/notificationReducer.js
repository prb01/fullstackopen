import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
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
    dispatch(createNotification(content))
    setTimeout(() => dispatch(removeNotification()), time * 1000)
  }
}

export default notificationSlice.reducer
