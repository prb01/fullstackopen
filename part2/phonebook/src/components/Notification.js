const Notification = ({ msg, status = 'error' }) => {
  if (msg === null) return null

  const statuses = ['success', 'error', 'warning']
  if (!statuses.includes(status)) status = 'error'

  return (
    <div className={`notification ${status}`}>
      {msg}
    </div>
  )
}

export default Notification