import React, { Component } from 'react';

class FormSearch extends Component {
  state = {
    inputSearch: '',
  };

  setNewState = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { inputSearch } = this.state;
    const MIN_SEARCH = 2;
    return (
      <form>
        <label htmlFor="form-search">
          <input
            name="inputSearch"
            value={ inputSearch }
            onChange={ this.setNewState }
            data-testid="search-artist-input"
            type="text"
          />
          <button
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

export default FormSearch;
