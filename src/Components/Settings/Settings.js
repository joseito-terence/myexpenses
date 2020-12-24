import React from 'react';
import "./Settings.css";
import UserInfo from './widgets/UserInfo';
import ChangePassword from './widgets/ChangePassword';
import Modal from '../Modal';
import DeleteAccount from './widgets/DeleteAccount';

function Settings() {
  return (
    <div className="settings mt-5 mx-auto">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-white ml-3 mb-3">Settings</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 mt-4">
            <UserInfo />
          </div>
          <div className="col-sm-6 mt-4">
            <ChangePassword />
          </div>
        </div>
        <div className="row">
          <div className="col my-4">
            <div className="card delete-btn">
              <Modal
                id='deleteAccountModal'
                className='btn btn-link'
                buttonIcon='fas fa-trash'
                buttonText=' Delete Account'
                title='Delete Account'
              >
                <DeleteAccount />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
