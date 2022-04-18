import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log("notification:", notification)

  if (notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    position: "absolute",
    left: "50%",
    transformX: "-50%"
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification