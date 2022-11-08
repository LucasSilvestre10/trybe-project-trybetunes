import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProfile extends Component {
  render() {
    const { name, email, description } = this.props;

    return (
      <div>
        <img data-testid="profile-image" src="url-to-image" alt={ name } />
        <label htmlFor="name">
          <h3>
            Nome
          </h3>
          <p>{name}</p>
        </label>

        <label htmlFor="email">
          <h3>
            E-mail
          </h3>
          <p>{email}</p>
        </label>
        <label htmlFor="description">
          <h3>
            Descrição
          </h3>
          <p>{description}</p>
        </label>
        <Link to="/profile/edit">Editar perfil</Link>

      </div>

    );
  }
}

CardProfile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

};

export default CardProfile;
