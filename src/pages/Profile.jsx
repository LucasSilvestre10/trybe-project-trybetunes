import React, { Component } from 'react';
import CardProfile from '../Components/CardProfile';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = { isloading: true, infoUser: {} };

  componentDidMount() {
    this.loadingUser();
  }

  loadingUser = async () => {
    this.setState({ isloading: true });
    const result = await getUser();
    this.setState({ infoUser: result, isloading: false });
  };

  render() {
    const { isloading, infoUser } = this.state;
    return (
      <div data-testid="page-profile">
        Profile
        <Header />
        {
          isloading ? (<Loading />)
            : (
              <main>

                <CardProfile
                  name={ infoUser.name }
                  email={ infoUser.email }
                  description={ infoUser.description }
                  img={ infoUser.img }
                />

              </main>
            )
        }

      </div>
    );
  }
}

export default Profile;
