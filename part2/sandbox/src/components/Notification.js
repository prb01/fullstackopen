const Notification = ({ msg }) => {
  if (msg === null) return null

  return (
    <div className="error">
      {msg}
    </div>
  )
}

export default Notification