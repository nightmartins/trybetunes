import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  handleCheck = async ({ target: { checked } }) => {
    const { infos } = this.props;
    this.setState({ loading: true });
    if (!checked) {
      await removeSong(infos);
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
      await addSong(infos);
    }
    this.setState({ loading: false });
  }

  loadFavorites = async () => {
    const { infos } = this.props;
    const { trackId } = infos;
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((favoriteSong) => {
      if (favoriteSong.trackId === trackId) {
        this.setState({ checked: true });
      }
    });
  }

  render() {
    const { infos } = this.props;
    const { trackName, previewUrl, trackId } = infos;
    const { loading, checked } = this.state;
    const musicCardRender = (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <input
            id={ trackId }
            type="checkbox"
            onChange={ this.handleCheck }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
    return (
      loading ? <Loading /> : musicCardRender
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;

// Referências:
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/58/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/74/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/90/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/34/files
