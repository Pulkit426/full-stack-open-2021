import { connect } from "react-redux"

const Notification = (props) => {

  console.log(props.notification)
  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    display: props.notification.length===0 ? 'none' : ''
  }
  return (
    <div style={style}>
     {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }

}
const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification