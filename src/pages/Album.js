import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import SongCard from '../components/SongCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      songsList: [],
      artist: '',
      albumName: '',
      albumCover: '',
    };
  }

  componentDidMount() {
    this.fetchSongList();
  }

  fetchSongList = async () => {
    const { match: { params: { id } } } = this.props;
    const requestedSongs = await getMusics(id);
    this.setState({
      songsList: [...requestedSongs],
      artist: requestedSongs[0].artistName,
      albumName: requestedSongs[0].collectionName,
      albumCover: requestedSongs[0].artworkUrl100,
    });
  }

  render() {
    const { songsList, artist, albumName, albumCover } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="album-name">{ albumName }</h2>
          <h3 ddata-testid="artist-name">{ artist }</h3>
          <img src={ albumCover } alt={ albumName } />
        </section>
        {songsList.slice(1).map((music) => (
          <SongCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
