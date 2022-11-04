import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class FormLogin extends Component {
  state = { nameLogin: '', isLoadding: false, isUser: false };

  setNewState = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  /*
  redirect = () => {
    const history = useHistory();
    // const { history } = this.props;
    history.push('search');
  }; */

  createUserApi = async () => {
    this.setState({ isLoadding: true });
    const { nameLogin } = this.state;
    await createUser({ name: nameLogin });
    this.setState({ isLoadding: false, isUser: true });
  };

  render() {
    const { nameLogin, isLoadding, isUser } = this.state;
    const MIN_LOGIN = 3;

    return (
      <div>
        {isLoadding ? (
          <Loading />
        ) : (
          <div>
            <input
              value={ nameLogin }
              name="nameLogin"
              onChange={ this.setNewState }
              data-testid="login-name-input"
              type="text"
            />
            <button
              onClick={ this.createUserApi }
              type="button"
              disabled={ nameLogin.length < MIN_LOGIN }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        )}
        {
          isUser && <Redirect to="/search" />
        }
      </div>
    );
  }
}

FormLogin.Prototype = {
  history: PropTypes.string.isRequired,
};

export default FormLogin;
