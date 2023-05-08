import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [userAlert, setUserALert] = useState(false);

  const PasswordHandler = (event) => {
    setPassword(event.target.value);
    if (password.length !== 0) {
      setPasswordAlert(false);
    } else {
      setPasswordAlert(true);
    }
  };

  const EmailHandler = (event) => {
    setEmail(event.target.value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      setEmailAlert(false);
    } else {
      setEmailAlert(true);
    }
  };

  const Submit = (event) => {
    event.preventDefault();
    if (email && password && !emailAlert && !passwordAlert) {
      try {
        axios
          .post("http://localhost:5000/", { email, password })
          .then((response) => {
            if (response.data === "exist") {
              navigate("/home", { state: { id: email } });
              setUserALert(false);
            } else if (response.data === "not exist") setUserALert(true);
          })
          .catch((err) => {
            alert("wrong details");
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      setEmailAlert(true);
      setPasswordAlert(true);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form action="POST">
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(event) => EmailHandler(event)}
        />
        {emailAlert && <div className="alert">Email is Invalid</div>}

        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(event) => PasswordHandler(event)}
        />
        {passwordAlert && <div className="alert">Password cannot be Empty</div>}

        <button type="submit" onClick={Submit}>
          Login
        </button>
        {userAlert && <div className="alert">Check Email and Password</div>}
      </form>
      <p>
        New User? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
