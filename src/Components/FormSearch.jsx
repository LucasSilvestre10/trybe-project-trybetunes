import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormSearch extends Component {
  render() {
    const { inputSearch, setNewState, searchList } = this.props;

    const MIN_SEARCH = 2;
    return (
      <form>
        <label htmlFor="form-search">
          <input
            name="inputSearch"
            value={ inputSearch }
            onChange={ setNewState }
            data-testid="search-artist-input"
            type="text"
          />
          <button
            onClick={ searchList }
            disabled={ inputSearch.length < MIN_SEARCH }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </label>
      </form>
    );
  }
}
FormSearch.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  setNewState: PropTypes.func.isRequired,
  searchList: PropTypes.func.isRequired,
};

export default FormSearch;
