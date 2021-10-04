import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleChange = async ({ target: { id, checked } }) => {
    this.setState({
      loading: true,
    });

    if (!checked) {
      await removeSong(id);
      this.setState({
        loading: false,
        checked: false,
      });
    } else {
      await addSong(id);
      this.setState({
        loading: false,
        checked: true,
      });
    }
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
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
            onChange={ this.handleChange }
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

// refs: https://github.com/tryber/sd-014-b-project-trybetunes/pull/58/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/74/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/90/files
