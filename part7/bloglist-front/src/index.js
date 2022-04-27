import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./store"
import { Provider } from "react-redux"
import { ThemeProvider } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom"
import { blogTheme } from "./blogTheme"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <ThemeProvider theme={blogTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)
