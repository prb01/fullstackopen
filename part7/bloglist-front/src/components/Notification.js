const Notification = ({ notification }) => {
  if (!notification.msg) return null

  const { msg, type } = notification
  const className = type === "error" ? "error" : "info"

  return (
    <div className={`notification ${className}`}>
      {msg}
    </div>
  )
}

export default Notification