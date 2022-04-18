import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name:"notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      console.log(action.payload)
      return action.payload
    }
  }
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer