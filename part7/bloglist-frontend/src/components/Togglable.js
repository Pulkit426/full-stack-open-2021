/* eslint-disable no-unused-vars */
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props,ref) => {

  const [visible, setVisible] = useState(false)

  const s1 = { display : visible ? 'none' : '' }
  const s2 = { display : visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(prevVisible => !prevVisible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={s1}>
        <button onClick={toggleVisibility}> {props.buttonLabel} </button>
      </div>

      <div style={s2}>
        {props.children}
        <button onClick={toggleVisibility}> Cancel </button>
      </div>


    </div>


  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable