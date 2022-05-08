import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>

      <form onSubmit={handleLogin}>
        <div>
     Username <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
    Password <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />

        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  username : PropTypes.string.isRequired,
  password :PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,

}
export default LoginForm