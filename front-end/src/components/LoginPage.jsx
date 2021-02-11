import React, { Component } from "react";
import "../styles/loginPage.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const backend_api = "http://localhost:3000/";

  const AuthenticateUser = () => {
    //console.log("Authenticating");
    const user_name = document.getElementById("user_name").value;
    const user_password = document.getElementById("user_password").value;
    //console.log(user_name, user_password);

    //Now make a call to the backend to validate user credentials
    const user_data = user_name + "&&" + user_password;
    fetch(backend_api + "authenticateUser/" + user_data)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.userExists) {
            //Now create a token and store in LocalStorage, for future
            localStorage.setItem("user_auth_token", user_name);
            history.push("/home");
          } else alert("Username does not exist");
        },
        (error) => {
          alert("Error occured");
        }
      );
  };
  return (
    <div className="mainContainer">
      <form onSubmit={handleSubmit(AuthenticateUser)} method="post">
        <h2>Log in</h2>
        <div className="form-group">
          <input
            type="text"
            id="user_name"
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="user_password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </div>
        <div id="newUserRegistrationWrapper">
          <p className="text-center">Not a member yet? </p>
          <Link
            to="/register"
            id="registerButton"
            className="btn btn-success btn-block mb-4"
          >
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
