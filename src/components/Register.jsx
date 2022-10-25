import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [usuario, setusuario] = useState({});

  const handleInputemail = (event) => {
    setemail(event.target.value);
  };
  const handleInputpassword = (event) => {
    setpassword(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/users/register", { email, password }).then((usuario) => {
      setusuario(usuario);
    });
  };
  return (
    <>
      <h1>Crear Usuario</h1>
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
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};
export default Register;
