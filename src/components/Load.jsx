import React from "react";
import { motion } from "framer-motion";

const containerStyle = {
  position: "absolute",
  display: "inline-block",
  width: "3rem",
  height: "3rem",
  boxSizing: "border-box",
};

const circleStyle = {
  display: "block",
  width: "2rem",
  height: "2rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #3498db",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: "8px",
  left: "8px"
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1
};

export default function Load({position}) {

    
  return (
    <div style={containerStyle}>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}