import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/favoritos.css";
const Users = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get(`/api/users`).then((res) => setUsuarios(res.data));
  }, []);
  return (
    <>
      <h1>Todos los usuarios</h1>
      {usuarios.map(({ email }, i) => {
        return (
          <div key={i} className="detailcs">
            <Link to={`/FavoritosPorUsuario/${email}`}>
              <h1>{email}</h1>
            </Link>
          </div>
        );
      })}
    </>
  );
};
export default Users;
