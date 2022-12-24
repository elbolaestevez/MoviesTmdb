import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "../css/loguiarse.css";
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
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "usuario no se ha creado",
        });

      Swal.fire({
        icon: "success",
        title: "Sent",
        text: "El usuario se ha creado",
      });
    });
  };
  return (
    <div className="login">
      <h1>Crear Usuario</h1>
      <form className="form" onSubmit={handleSubmit}>
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
      {typeof useremail == "object" && <div></div>}
    </div>
  );
};
export default Register;
