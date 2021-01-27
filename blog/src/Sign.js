import React, { useState } from "react";
import "./signin.css";
import { Button } from "@material-ui/core";
import Input from "./Input";
import { PasswordValidation } from "./validation";
import { ClientToServerBridge } from "./fetch";
import { useHistory } from "react-router-dom";
import { useDataLayerValue } from "./data-layer";
import Loader from "./Loader";

function SignIn() {
  const history = useHistory();
  const [, dispatch] = useDataLayerValue();
  const [isLoaded, setLoaded] = useState(false);
  const [credentail, setCredential] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    if (PasswordValidation(credentail?.password, credentail?.confirmPassword)) {
      setLoaded(!isLoaded);
      var newUser = await ClientToServerBridge({ body: credentail })
        .then((user) => user)
        .catch((e) => null);

      if (newUser !== null) {
        alert("Acoount Successfully Created");
        history.push("/");
      } else {
        alert("Some Server Error code:500");
        history.push("/auth");
      }
    }
  };

  const handleUser = async () => {
    setLoaded(!isLoaded);
    let user = await ClientToServerBridge({
      body: credentail,
      endpoint: "/signIn",
    });

    if (user !== null) {
      sessionStorage.setItem("user", true);
      sessionStorage.setItem("user-details", JSON.stringify(user));

      dispatch({
        type: "BLOG-PAGE",
        user: user,
      });
      dispatch({
        type: "SET-USER",
        isUser: true,
      });
      history.push("/blogs");
    }
  };

  return !isLoaded ? (
    <div className="sign">
      <form className="signInArea">
        <h2>Log In</h2>
        <Input
          onChange={handleChange}
          placeHolder="Email*"
          type="text"
          name="email"
        />
        <Input
          onChange={handleChange}
          placeHolder="Password"
          type="password"
          name="password"
        />
        <Button onClick={handleUser} variant="outlined">
          Log In
        </Button>
      </form>
      <div className="signDivider"></div>
      <form className="signUpArea">
        <h2>Sign Up</h2>
        <Input
          onChange={handleChange}
          type="text"
          placeHolder="Name"
          name="name"
        />
        <Input
          onChange={handleChange}
          type="text"
          placeHolder="Email*"
          name="email"
        />
        <Input
          onChange={handleChange}
          label={true}
          placeHolder="Password"
          name="password"
          type="password"
        />

        <Input
          onChange={handleChange}
          placeHolder="Confirm Password"
          name="confirmPassword"
          type="password"
        />
        <Button
          disabled={
            !PasswordValidation(
              credentail?.password,
              credentail?.confirmPassword,
              credentail?.name
            )
          }
          onClick={handleSubmit}
          variant="outlined"
        >
          Sign Up
        </Button>
      </form>
    </div>
  ) : (
    <Loader />
  );
}

export default SignIn;
