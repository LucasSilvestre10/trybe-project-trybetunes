import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemListSearch extends Component {
  render() {
    const { collectionName, artworkUrl100, collectionId } = this.props;
    return (
      <div htmlFor={ collectionId } id={ collectionId }>
        {collectionName ? (
          <>
            <p>{collectionName}</p>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              IR PARA ALBUM

            </Link>
          </>
        ) : (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}

ItemListSearch.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
export default ItemListSearch;
