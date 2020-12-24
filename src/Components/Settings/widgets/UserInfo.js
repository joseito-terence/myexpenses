import React, { useState, useRef } from "react";
import { auth } from "../../../firebase";


function UserInfo() {
  const { displayName } = auth.currentUser;
  const [firstName, setFirstName] = useState(displayName.split(" ")[0]);
  const [lastName, setLastName] = useState(displayName.split(" ")[1]);
  const [error, setError] = useState();

  const editBtnRef = useRef();
  const fNameRef = useRef();
  const lNameRef = useRef();
  const updateBtnsRef = useRef();

  function editInfo(event) {
    event.preventDefault();

    editBtnRef.current.classList.toggle("d-none");
    updateBtnsRef.current.classList.toggle("d-none");

    fNameRef.current.disabled = false;
    lNameRef.current.disabled = false;
  }

  function cancelUpdate(event) {
    event.preventDefault();

    editBtnRef.current.classList.toggle("d-none");
    updateBtnsRef.current.classList.toggle("d-none");

    fNameRef.current.disabled = true;
    lNameRef.current.disabled = true;
  }

  function update(event) {
    event.preventDefault();

    auth.currentUser
      .updateProfile({
        displayName: `${firstName} ${lastName}`
      })
      .then(() => {
        editBtnRef.current.classList.toggle("d-none");
        updateBtnsRef.current.classList.toggle("d-none");

        fNameRef.current.disabled = true;
        lNameRef.current.disabled = true;
      })
      .catch(error => setError(error.message));

  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Info</h3>
      </div>
      <form>
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
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              ref={fNameRef}
              disabled
            />
          </div>

          <div className="form-group m-0">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              ref={lNameRef}
              disabled
            />
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-secondary"
            onClick={editInfo}
            ref={editBtnRef}
          >
            Edit
          </button>
          <div className="updateBtns d-none" ref={updateBtnsRef}>
            <button className="btn btn-primary mr-1" onClick={update}>
              Update
            </button>
            <button className="btn btn-secondary" onClick={cancelUpdate}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;