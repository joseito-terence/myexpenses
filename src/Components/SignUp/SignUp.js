import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

function SignUp() {

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState();

  function handleChange({ target }) {
    setState({ ...state, [target.name]: target.value });
  };

  function signUp(event) {
    event.preventDefault();

    if(state.password !== state.confirmPassword){
      setError('Password do not Match.')
    }else{
      auth.createUserWithEmailAndPassword(state.email, state.password)
        .then(user => {
          console.log(user.id);
 
          auth.currentUser
            .updateProfile({
              displayName: `${state.firstName} ${state.lastName}`
            })
        })
        .catch(error => {
          setError(error.message);
        })
    }
  }

  // console.log(state);

  return (
    <div className="signUp text-center">
      
      {error && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }

      <form>
        <img className="mb-4 logo" src="logo192.png" alt="logo" />

        <h1 className="h3 mb-3 fw-normal">Create a New Account</h1>

        <input
          type="text"
          name="firstName"
          className="signUp__firstName form-control"
          placeholder="First Name"
          required
          autoFocus
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          className="signUp__lastName form-control"
          placeholder="Last Name"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className="signUp__email form-control"
          placeholder="Email address"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="signUp__password form-control"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          className="signUp__confirmPassword form-control"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={signUp}>
          Sign Up
        </button>
        <div className="mt-3">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>

        <p className="mt-5 mb-3 text-muted">Developed By: Joseito Fernandes</p>
      </form>
    </div>
  );
}

export default SignUp;
