import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import Moon from "../components/r3f/Moon";
import HomeHeader from "../components/home/HomeHeader";
import LogIn from "../components/home/LogIn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/authApi";
import { setUser } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

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
        // console.log(newInput);
        return newInput;
      }
      return input;
    });
    setInputList(updateInputList);
  };
  //   log in
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { data: loginData, isSuccess: isLoginSuccess }] =
    useLoginUserMutation();
  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (inputList[0].value && inputList[1].value) {
      await loginUser({
        username: inputList[0].value,
        password: inputList[1].value,
      });
    } else {
      console.log("error occured");
    }
  };
  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(
        setUser({
          user_id: jwtDecode(loginData.access).user_id,
          first_name: jwtDecode(loginData.access).first_name,
          last_name: jwtDecode(loginData.access).last_name,
          username: jwtDecode(loginData.access).username,
          email: jwtDecode(loginData.access).email,
          refresh: loginData["refresh"],
          access: loginData["access"],
        })
      );
      console.log("log in success");
      navigate(`/${inputList[0].value}`);
    }
  }, [isLoginSuccess]);
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
