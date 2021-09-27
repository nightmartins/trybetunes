import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { album:
      { artistName,
        collectionId,
        collectionName,
        artworkUrl100,
      },
    } = this.props;
    return (
      <div>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <h3>{ collectionName }</h3>
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
            width="200px"
          />
        </Link>
        <h4>{ artistName }</h4>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.objectOf({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;

// Referência: https://github.com/tryber/sd-014-b-project-trybetunes/pull/74/files
