import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationSlice"

export default configureStore({
  reducer: {
    notification: notificationReducer
  }
})