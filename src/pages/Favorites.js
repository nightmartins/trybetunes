import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesList: [],
      checked: true,
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = async () => {
    this.setState({
      loading: true,
    });
    const favoritesListRequested = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesList: favoritesListRequested,
    });
  }

  render() {
    const { loading, favoritesList } = this.state;
    const favoritesRender = (
      <div>
      {favoritesList.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
        />
      ))}
      </div>
    );

    return (
      <main data-testid="page-favorites">
        <Header />
       { loading ? <Loading /> : favoritesRender }
      </main>
    );
  }
}

export default Favorites;
