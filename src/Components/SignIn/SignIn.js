import React, { useState } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  function authenticate(event) {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          console.log(error);
          
          setError(errorMessage(error?.code));        
        })
  }

  const errorMessage = (errorCode) => {
    switch (errorCode){
      case 'auth/invalid-email':
        return 'Please check you email address.';
      
      case 'auth/user-not-found':
        return 'User not found.';

      case 'auth/network-request-failed':
        return 'Check your network connection.';

      case 'auth/wrong-password':
        return 'Incorrect Password!';

      default:
        return '';
    }
  }
 

  return (
    <main className="signIn text-center">

      {error && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }

      <form>
        <img className="mb-4 logo bg-black" src="logo192.png" alt="logo" />

        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          autoFocus
        />

        <input
          type="password"
          name=""
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> */}

        <button 
          className="w-100 btn btn-lg btn-primary" 
          type="submit"
          onClick={authenticate}
        >
          Sign in
        </button>
        
        <div className="mt-3">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </div>

        <p className="mt-5 mb-3 text-muted">Developed By: Joseito Fernandes</p>
      </form>
    </main>
  );
}

export default SignIn;
