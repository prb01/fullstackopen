import { createTheme } from "@mui/material/styles"

export const blogTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {},
    },
  },
  palette: {
    primary: {
      main: "#023047",
    },
    secondary: {
      main: "#000000",
    },
  },
})
