// import { useSelector } from "react-redux"
import { connect } from "react-redux"

const Notification = props => {
  // const notification = useSelector(state => state.notification)

  if (props.notification === null) return null

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
      {props.notification.content}
    </div>
  )
}

const mapStateToProps = state => {
  return {notification: state.notification}
}

// export default Notification

export default connect(
  mapStateToProps,
  null
)(Notification)