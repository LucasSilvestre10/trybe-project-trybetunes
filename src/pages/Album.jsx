import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  state = { idAlbum: 0, infoAlbum: [], listMusics: [] };

  componentDidMount() {
    this.setIdAlbum();
  }

  setIdAlbum = () => {
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.setState({ idAlbum: id }, this.getMusicList);
    }
  };

  getMusicList = async () => {
    const { idAlbum } = this.state;
    const list = await getMusics(idAlbum);
    const info = list[0];
    const musics = list.filter((music) => music.trackName);
    this.setState({ infoAlbum: info, listMusics: musics });
    console.log(musics);
    console.log(info);
  };

  render() {
    const { infoAlbum, listMusics } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <div>
          <h1 data-testid="artist-name">{infoAlbum.artistName}</h1>
          <h1 data-testid="album-name">{infoAlbum.collectionName}</h1>
        </div>
        <div>
          {listMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }

            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired };

export default Album;
