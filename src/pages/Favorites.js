import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import FavoritesCard from '../components/FavoritesCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesList: [],
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
      <div id="root">
        {favoritesList.map((music) => (
          <FavoritesCard
            key={ music.trackId }
            infos={ music }
          />
        ))}
      </div>
    );

    if (loading) return <Loading />;
    return (
      <main data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : favoritesRender }
      </main>
    );
  }
}

export default Favorites;
