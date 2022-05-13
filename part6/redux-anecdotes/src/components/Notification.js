import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    display: notification.length===0 ? 'none' : ''
  }
  return (
    <div style={style}>
     {notification}
    </div>
  )
}

export default Notification