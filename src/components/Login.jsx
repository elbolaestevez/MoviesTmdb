import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser as setGlobalUser } from "../state/user";
import { useDispatch } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

// import { GoogleLogin } from "react-google-login";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState([]);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const clientId =
    "816576963998-36f3kgn9v58khmfu27dsor6j4tsr9l54.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const handleInputemail = (event) => {
    setemail(event.target.value);
  };
  const handleInputpassword = (event) => {
    setpassword(event.target.value);
  };
  const onSuccess = (res) => {
    // setemail(res.profileObj.email);
    // setpassword(res.googleId);
    setProfile(res.profileObj);
    console.log(res.profileObj.email, res.googleId);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
  };
  // const responseGoogle = (event) => {
  //   setemail(event.target.value);
  // };
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

        navigate("/SearchMovie");
      });
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
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.imageUrl} alt="user image" />

            <br />
            <br />
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logOut}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        )}
      </div>
      ,
    </>
  );
};
export default Login;
