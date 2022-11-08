import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
  };

  componentDidMount() {
    this.reloadFavoriteSongs();
  }

  reloadFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const list = await getFavoriteSongs();
    console.log(list);
    this.setState({ favoriteSongs: list, isLoading: false });
  };

  setFavorite = async (event) => {
    this.setState({ isLoading: true });
    const { favoriteSongs } = this.state;
    const { name } = event.target;

    const musicInfo = favoriteSongs.find((music) => music.trackId === +name);

    let result = '';

    result = await removeSong(musicInfo);

    if (result) {
      this.setState({ isLoading: false }, this.reloadFavoriteSongs);
    }
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {isLoading ? (<Loading />) : (
          <div>
            {favoriteSongs.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                setFavorite={ this.setFavorite }
                music={ music }
                checked={ music.checked }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
