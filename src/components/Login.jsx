import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser as setGlobalUser } from "../state/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [usuariofinal, setusuario] = useState({});

  const handleInputemail = (event) => {
    setemail(event.target.value);
  };
  const handleInputpassword = (event) => {
    setpassword(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((usuario) => {
        dispatch(setGlobalUser(usuario.data.email));
      });
    navigate("/SearchMovie");
  };

  return (
    <>
      <h1>Loguiar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          aria-label="Email address"
          type="text"
          required
          placeholder="Email address"
          onChange={handleInputemail}
        />
        <input
          aria-label="Password"
          type="password"
          required
          placeholder="Password"
          onChange={handleInputpassword}
        />
        <button type="submit">Loguiar</button>
      </form>
    </>
  );
};
export default Login;
