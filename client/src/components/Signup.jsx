import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState(false);
  const [userAlert, setUserALert] = useState(false);

  const EmailHandler = (event) => {
    setEmail(event.target.value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      setEmailAlert(false);
    } else {
      setEmailAlert(true);
    }
  };

  const PasswordHandler = (event) => {
    setPassword(event.target.value);
    if (password.length !== 0) {
      setPasswordAlert(false);
    } else {
      setPasswordAlert(true);
    }
  };

  const ConfirmPasswordHandler = (event) => {
    if (event.target.value === password) {
      setConfirmPasswordAlert(false);
    } else {
      setConfirmPasswordAlert(true);
    }
  };
  const Submit = (event) => {
    event.preventDefault();

    if (
      email &&
      password &&
      !emailAlert &&
      !passwordAlert &&
      !confirmPasswordAlert
    ) {
      try {
        axios
          .post("http://localhost:5000/signup", { email, password })
          .then((response) => {
            if (response.data === "exist") {
              setUserALert(true);
            } else if (response.data === "not exist") {
              navigate("/home", { state: { id: email } });
              setUserALert(false);
            }
          })
          .catch((err) => console.log(err));
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
      <h1>Sign Up</h1>
      <form action="POST">
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(event) => {
            EmailHandler(event);
          }}
        />
        {emailAlert && <div className="alert">Email is Invalid</div>}
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(event) => PasswordHandler(event)}
        />
        {passwordAlert && <div className="alert">Password cannot be Empty</div>}
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => ConfirmPasswordHandler(event)}
        />
        {confirmPasswordAlert && (
          <div className="alert">Password does not match</div>
        )}
        <button type="submit" onClick={Submit}>
          Login
        </button>
        {userAlert && <div className="alert">User already exist</div>}
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
