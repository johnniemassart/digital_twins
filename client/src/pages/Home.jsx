import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import Moon from "../components/r3f/Moon";
import HomeHeader from "../components/home/HomeHeader";
import LogIn from "../components/home/LogIn";

// add input fields src - https://codesandbox.io/s/add-react-component-onclick-oery4

// const Input = ({ x_coord, y_coord }) => {
//   return (
//     <input
//       //   ref={inputRef}
//       style={{
//         position: "absolute",
//         top: y_coord,
//         left: x_coord,
//         transform: `translateY(-50%)`,
//       }}
//       className="home-input"
//       type="text"
//     />
//   );
// };

const Home = () => {
  const [coord, setCoord] = useState([]);
  const handleMouse = (e) => {
    let coordinates = [e.clientX, e.clientY];
    setCoord(coordinates);
  };
  const [inputList, setInputList] = useState([]);
  const inputRef = useRef();
  const handleInput = () => {
    // inputRef.current.focus();
    setInputList([
      ...inputList,
      {
        id: inputList.length,
        x_coord: coord[0],
        y_coord: coord[1],
      },
    ]);
  };
  useEffect(() => {
    if (inputList.length > 0) {
      inputRef.current = inputRef.current.focus();
    }
  }, [inputList]);
  return (
    <div
      className="home-wrapper"
      onDoubleClick={handleInput}
      onMouseMove={handleMouse}
    >
      <Moon />
      <HomeHeader />
      {inputList.map((item) => {
        return (
          <input
            key={item.id}
            ref={inputRef}
            style={{
              position: "absolute",
              top: item.y_coord,
              left: item.x_coord,
              transform: "translate(-10px, -50%)",
            }}
            className="home-input"
          />
        );
      })}
    </div>
  );
};

export default Home;
