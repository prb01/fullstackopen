import { Alert, Snackbar } from "@mui/material"

const Notification = ({ notification }) => {
  if (!notification.msg) return null

  const { msg, type } = notification

  return (
    <Snackbar open={true}>
      <Alert variant="filled" severity={type}>
        {msg}
      </Alert>
    </Snackbar>
  )
}

export default Notification
