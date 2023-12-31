import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId, setFavorite, checked } = this.props;
    return (
      <div htmlFor={ trackId }>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          className="favorite-label"
          htmlFor={ trackId }

        >
          Favorita
          <input
            id={ trackId }
            checked={ checked }
            className="favorite-input"
            name={ trackId }
            onChange={ setFavorite }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }

          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  setFavorite: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
