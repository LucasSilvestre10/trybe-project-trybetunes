import React, { Component } from 'react';
import FormEditProfile from '../Components/FormEditProfile';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

class ProfileEdit extends Component {
  state = { isLoading: false };

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        ProfileEdit
        <Header />
        {isLoading ? (<Loading />) : (
          <main>
            <div>
              <FormEditProfile />
            </div>
          </main>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
