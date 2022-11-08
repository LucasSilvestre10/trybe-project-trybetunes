import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormEditProfile extends Component {
  render() {
    const { name, email, description, image,
      setNewState, saveUser, isError } = this.props;
    return (
      <form action="submit">
        <label htmlFor="input-name">
          <p>Nome</p>
          <input
            data-testid="edit-input-name"
            name="name"
            type="text"
            value={ name }
            onChange={ setNewState }
          />
        </label>
        <label htmlFor="input-email">
          <p>E-mail</p>
          <input
            data-testid="edit-input-email"
            name="email"
            type="text"
            value={ email }
            onChange={ setNewState }
          />
        </label>
        <label htmlFor="input-description">
          <p>Descrição</p>
          <input
            data-testid="edit-input-description"
            name="description"
            type="text"
            value={ description }
            onChange={ setNewState }
          />
        </label>
        <label htmlFor="input-image">
          <p>Imagem</p>
          <input
            data-testid="edit-input-image"
            name="image"
            type="text"
            value={ image }
            onChange={ setNewState }
          />
        </label>
        <button
          disabled={ isError }
          onClick={ saveUser }
          type="button"
          data-testid="edit-button-save"
        >
          Editar perfil
        </button>
      </form>
    );
  }
}

FormEditProfile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  setNewState: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default FormEditProfile;
