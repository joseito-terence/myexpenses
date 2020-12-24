import React, { useState } from "react";
import firebase from 'firebase';
import db from "../../../firebase";

function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  function cancel(event) {
    event.preventDefault();

    setPassword('');
  }

  function deleteAccount(event) {
    event.preventDefault();

    if(password){
      const user = firebase.auth().currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );
      
      user.reauthenticateWithCredential(credentials)
        .then(() => {

          // Delete user's data.
          db.doc(user.uid)
            .delete()
            .catch(error => setError(error.message));

          // Delete user.
          user.delete()
              .catch(error => setError(error.message));

          window.location.href = '/';
        })
        .catch(error => setError(error.message));
    } 
  }

  return (
    <div className="deleteAccount p-3">

      {error && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }

      <p>
        This process will delete your account along with all your data and is
        irreversible.
      </p>
      <p>To continue enter your password and click confirm.</p>
      <input
        type="password"
        name="password"
        placeholder="Current Password"
        className="form-control mb-3 text-center"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <div className="d-flex justify-content-center">
        <input 
          type="button" 
          value="Confirm" 
          className="btn btn-success mr-1" 
          onClick={deleteAccount}
        />
        <input
          type="button"
          value="Cancel"
          className="btn btn-danger"
          data-dismiss="modal"
          aria-label="Close"
          onClick={cancel}
        />
      </div>
    </div>
  );
}

export default DeleteAccount;
