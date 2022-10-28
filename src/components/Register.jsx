import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const useremail = useSelector((state) => state.user.value);

  const handleInputemail = (event) => {
    setemail(event.target.value);
  };
  const handleInputpassword = (event) => {
    setpassword(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/users/register", { email, password }).then((usuario) => {
      if (usuario.data == "no encontre")
        return alert("usuario no se ha creado");

      alert("se ha creado usuario");
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
      {typeof useremail == "object" && (
        <div>
          <Link to="/Loguiar">
            <button>Loguiar Usuario </button>
          </Link>
        </div>
      )}
    </>
  );
};
export default Register;
