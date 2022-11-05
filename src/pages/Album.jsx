import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';

class Album extends Component {
  state = {
    idAlbum: 0,
    infoAlbum: [],
    listMusics: [],
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.setIdAlbum();
    this.reloadFavoriteSongs();
  }

  checkedSongs = () => {
    const { listMusics, favoriteSongs } = this.state;
    favoriteSongs.forEach((song) => {
      const selectMusic = listMusics.findIndex((music) => music.trackId === song.trackId);
      listMusics[selectMusic].checked = true;
    });
    this.setState({ listMusics });
  };

  reloadFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const list = await getFavoriteSongs();
    console.log(list);
    this.setState({ favoriteSongs: list, isLoading: false }, this.checkedSongs);
  };

  setIdAlbum = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
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
  };

  setIdFavorite = async (event) => {
    this.setState({ isLoading: true });
    const { listMusics } = this.state;
    const { name, checked } = event.target;

    const musicInfo = listMusics.find((music) => music.trackId === +name);
    const selectMusic = listMusics.findIndex(
      (music) => music.trackId === +name,
    );
    listMusics[selectMusic].checked = checked;

    const result = await addSong(musicInfo);

    if (result) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { infoAlbum, listMusics, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <section>
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
                  setIdFavorite={ this.setIdFavorite }
                  music={ music }
                  checked={ music.checked }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
};

export default Album;
