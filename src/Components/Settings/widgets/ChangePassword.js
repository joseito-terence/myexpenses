import React, { useState } from 'react';
import { auth } from '../../../firebase';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();

  function changePassword(event) {
    event.preventDefault();

    if(newPassword && confirmPassword){
      if(newPassword === confirmPassword){
        auth.currentUser
          .updatePassword(newPassword)
          .then(() => {
            console.log('Successful');
            setNewPassword('');
            setConfirmPassword('');
          })
          .catch(error => setError(error.message));
      }else{
        setError('Password not matching.');
      }
    }
    
    
  }

  function reset(event) {
    event.preventDefault();

    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="changePassword">
      <div className="card">
        <div className="card-header">
          <h3>Change Password</h3>
        </div>
        <div className="card-body">
          {error && 
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="form-group m-0">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="card-footer">
            <button className="btn btn-primary mr-1" onClick={changePassword}>
              Change Password
            </button>
            <button type='reset' className="btn btn-secondary" onClick={reset}>
              Reset
            </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword;
