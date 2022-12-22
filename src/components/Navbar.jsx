import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser as setGlobalUser } from "../state/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "../css/navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.user.value);

  const Desloguiar = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/logout")

      .then((usuario) => {
        alert("Te has desloguiado");
        dispatch(setGlobalUser({}));
        window.localStorage.removeItem("user");
      });
    navigate("/");
  };

  return (
    <div className="navbar_container">
      <div className="navbar_menu">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/Loguiar">
            {" "}
            <li>Registro Usuario/Login</li>{" "}
          </Link>

          <Link to="/Favoritos">
            <li>Favoritos</li>
          </Link>

          <Link to="/Usuarios">
            <li>Usuarios</li>
          </Link>
        </ul>
      </div>
      {/* {useremail != null ? <h2>logueado</h2> : <h2>deslogueado</h2>} */}
      <div className="navbar_menu">
        {typeof useremail !== "object" && (
          <div className="desloguiar">
            <p>{useremail}</p>
            <button onClick={Desloguiar} type="submit">
              Desloguiar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
