import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormEditProfile from '../Components/FormEditProfile';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

const MIN_PARAM = 3;
class ProfileEdit extends Component {
  state = {
    isloading: true,
    name: '',
    email: '',
    description: '',
    image: '',
    isError: false,
  };

  componentDidMount() {
    this.loadingUser();
    this.validateForm();
  }

  validateForm = () => {
    const { description, email, image, name } = this.state;
    let error = 0;
    if (name.length < MIN_PARAM) {
      error += 1;
    }
    if (email.length < MIN_PARAM) {
      error += 1;
    }
    if (description.length < MIN_PARAM) {
      error += 1;
    }
    if (image.length < MIN_PARAM) {
      error += 1;
    }
    const re = /\S+@\S+\.\S+/;
    const result = re.test(email);
    if (result === false) {
      error += 1;
    }
    if (error === 0) {
      this.setState({ isError: false });
    }
    if (error >= 1) {
      this.setState({ isError: true });
    }
  };

  setNewState = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validateForm);
  };

  saveUser = async () => {
    const { name, email, description, image } = this.state;
    const obj = {
      name,
      email,
      description,
      image,
    };
    const result = await updateUser(obj);
    const { history } = this.props;
    if (result === 'OK') {
      history.push('/profile');
    }
  };

  loadingUser = async () => {
    this.setState({ isloading: true });
    const result = await getUser();
    this.setState({
      name: result.name,
      email: result.email,
      description: result.description,
      image: result.image,
      isloading: false,
    }, this.validateForm);
  };

  render() {
    const { isloading, name, email, description, image, isError } = this.state;
    return (
      <div data-testid="page-profile-edit">
        ProfileEdit
        <Header />
        {isloading ? (
          <Loading />
        ) : (
          <main>
            <div>
              <FormEditProfile
                name={ name }
                email={ email }
                description={ description }
                image={ image }
                setNewState={ this.setNewState }
                saveUser={ this.saveUser }
                isError={ isError }
                validateForm={ this.validateForm }
              />
            </div>
          </main>
        )}
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,

};

export default ProfileEdit;
