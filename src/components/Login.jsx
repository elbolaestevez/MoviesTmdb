import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser as setGlobalUser } from "../state/user";
import { useDispatch } from "react-redux";
import "../css/loguiarse.css";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleInputemail = (event) => {
    setemail(event.target.value);
  };
  const handleInputpassword = (event) => {
    setpassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((usuario) => {
        if (usuario.data == "usuario no coincide")
          return alert("usuario no ha loguiado, intente otra vez");
        alert("has iniciado sesion");
        dispatch(setGlobalUser(usuario.data.email));
        window.localStorage.setItem("user", JSON.stringify(usuario.data.email));

        navigate("/");
      });
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Inicia Sesión</h2>
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
        <p>¿Aún no tienes una cuenta?</p>{" "}
        <Link to="/Registro">
          <button className="button2">Registrar </button>
        </Link>
      </form>
    </div>
  );
};
export default Login;
