import React, { useState } from "react";

const LogIn = ({ id, inputRef, y_coord, x_coord, value, handleChange }) => {
  return (
    <input
      key={id}
      ref={inputRef}
      style={{
        position: "absolute",
        top: y_coord,
        left: x_coord,
        transform: "translate(-3px, -50%)",
      }}
      className={`home-input ${id == 0 ? "username" : ""} ${
        id == 1 ? "password" : ""
      }`}
      type={`${id == 1 ? "password" : "text"}`}
      onChange={handleChange}
      value={value}
    />
  );
};

export default LogIn;
