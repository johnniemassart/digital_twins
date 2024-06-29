import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import Moon from "../components/r3f/Moon";
import HomeHeader from "../components/home/HomeHeader";
import LogIn from "../components/home/LogIn";

const Home = () => {
  const [coord, setCoord] = useState([]);
  const handleMouse = (e) => {
    let coordinates = [e.clientX, e.clientY];
    setCoord(coordinates);
  };
  const [inputList, setInputList] = useState([]);
  const handleInput = () => {
    setInputList([
      ...inputList,
      {
        id: inputList.length,
        x_coord: coord[0],
        y_coord: coord[1],
        value: "",
        active: true,
      },
    ]);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputList.active) {
      inputRef.current = inputRef.current.focus();
    }
  }, [inputList.active]);
  const handleChange = (id, value) => {
    const updateInputList = inputList.map((input) => {
      if (id === input.id) {
        const newInput = {
          ...input,
          value,
          active: false,
        };
        console.log(newInput);
        return newInput;
      }
      return input;
    });
    setInputList(updateInputList);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputList);
  };
  return (
    <div
      className="home-wrapper"
      onDoubleClick={handleInput}
      onMouseMove={handleMouse}
    >
      <Moon />
      <HomeHeader />
      <form className="login-form-wrapper">
        {inputList.map((item) => {
          return (
            <LogIn
              key={item.id}
              id={item.id}
              inputRef={inputRef}
              y_coord={item.y_coord}
              x_coord={item.x_coord}
              value={item.value}
              handleChange={(e) => handleChange(item.id, e.target.value)}
            />
          );
        })}
        <button onClick={handleSubmit} className="home-button">
          click
        </button>
      </form>
    </div>
  );
};

export default Home;
