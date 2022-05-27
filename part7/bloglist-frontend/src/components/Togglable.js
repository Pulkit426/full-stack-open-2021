/* eslint-disable no-unused-vars */
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const noShow = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={noShow}>
        <Button onClick={toggleVisibility} 
                variant="contained"
                color="primary" > 
          {props.buttonLabel}
         </Button>
      </div>

      <div style={show}>
        {props.children}
        <Button onClick={toggleVisibility} color="error"> Cancel </Button>
      </div>
    </div>
  );
});
Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
