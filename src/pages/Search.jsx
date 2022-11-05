import React, { Component } from 'react';
import FormSearch from '../Components/FormSearch';
import Header from '../Components/Header';
import ItemListSearch from '../Components/ItemListSearch';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    inputSearch: '',
    listIsLoading: false,
    resultSearch: [],
    search: '',
  };

  setNewState = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  searchList = async () => {
    const { inputSearch } = this.state;
    this.setState({ listIsLoading: true });
    const list = await searchAlbumsAPI(inputSearch);
    if (list.length > 0) {
      this.setState({
        search: inputSearch,
        resultSearch: list,
        listIsLoading: false,
        inputSearch: '',

      });
    } else {
      this.setState({ listIsLoading: false, inputSearch: '' });
    }
  };

  render() {
    const {
      inputSearch,
      listIsLoading,
      resultSearch,
      search,

    } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <div>
          <FormSearch
            inputSearch={ inputSearch }
            setNewState={ this.setNewState }
            searchList={ this.searchList }
          />
        </div>

        {listIsLoading === true && <Loading />}

        {(listIsLoading === false && resultSearch.length > 0) ? (
          <div>
            <h3>{`Resultado de álbuns de: ${search}`}</h3>
            {resultSearch.map((item) => (
              <ItemListSearch
                key={ item.collectionId }
                collectionName={ item.collectionName }
                artworkUrl100={ item.artworkUrl100 }
                collectionId={ item.collectionId }
              />
            ))}
          </div>
        ) : (<h3>Nenhum álbum foi encontrado</h3>)}
      </div>
    );
  }
}

export default Search;
