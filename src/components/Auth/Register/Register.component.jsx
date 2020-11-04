import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from "semantic-ui-react";
import firebase from "../../../server/firebase";

import "./Register.css";

const Register = () => {
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  let errors = [];

  let userCollectionRef = firebase.database().ref("users");

  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);

  const handleInput = (event) => {
    let target = event.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill in all fields" })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmpassword.length ||
      !userState.email.length
    );
  };

  const checkPassword = () => {
    if (userState.password.length < 8) {
      seterrorState((error) =>
        error.concat({ message: "Password length should be greater than 8." })
      );
      return false;
    } else if (userState.password !== userState.confirmpassword) {
      seterrorState((error) =>
        error.concat({
          message: "Password and Confirm Password does not match.",
        })
      );
      return false;
    }
    return true;
  };

  const onSubmit = (event) => {
    seterrorState(() => []);

    if (checkForm()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createdUser) => {
          updateuserDetails(createdUser);
        })
        .catch((serverError) => {
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  const updateuserDetails = (createdUser) => {
    if (createdUser) {
      createdUser.user
        .updateProfile({
          displayName: userState.userName,
          photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        })
        .then(() => {
          saveUserInDB(createdUser);
        })
        .catch((serverError) => {
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        console.log("user Saved in db");
      })
      .catch((serverError) => {
        seterrorState((error) => error.concat(serverError));
      });
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <Header icon as="h2">
          <Icon name="slack" /> <br />
          YOUR COMPANY NAME <br /> <br />
          Register Page
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
            <Form.Input
              name="confirmpassword"
              value={userState.confirmpassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
          </Segment>
          <Button>Submit</Button>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Register;
