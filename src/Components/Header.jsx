import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setUserHeader();
  }

  setUserHeader = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ userName: user.name, isLoading: false });
  };

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? (
          <Loading />

        ) : (
          <div>
            Header
            <p data-testid="header-user-name">{userName}</p>
            <p><Link data-testid="link-to-search" to="/search">PESQUISA</Link></p>
            <p><Link data-testid="link-to-favorites" to="/favorites">FAVORITOS</Link></p>
            <p><Link data-testid="link-to-profile" to="/profile">PERFIL</Link></p>

          </div>
        )}
      </header>
    );
  }
}

export default Header;
