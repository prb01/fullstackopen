import { configureStore } from "@reduxjs/toolkit"
import blogsReducer from "./reducers/blogsReducer"
import notificationReducer from "./reducers/notificationReducer"

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer
  }
})