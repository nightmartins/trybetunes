import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      currentSearch: '',
      searchResults: [],
      loading: false,
      found: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      search: target.value,
    });
  }

  fetchData = async () => {
    const { search } = this.state;
    this.setState({
      loading: true,
    });
    const requestSearch = await searchAlbumsAPI(search);

    this.setState({
      currentSearch: search,
      loading: false,
      searchResults: [...requestSearch],
      found: true,
      search: '',
    });
  }

  generateList = () => {
    const { searchResults, currentSearch } = this.state;
    if (searchResults.length < 1) {
      return (
        <div>
          <h2> Nenhum álbum foi encontrado </h2>
        </div>
      );
    }
    return (
      <div>
        <h3>
          {`Resultado de álbuns de: ${currentSearch}`}
        </h3>
        { searchResults.map((album) => (
          <AlbumCard key={ album.collectionId } album={ album } />
        )) }
      </div>
    );
  }

  render() {
    const minLength = 2;
    const { search, loading, found } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.fetchData }
            disabled={ search.length < minLength }
          >
            Pesquisar
          </button>
          { loading && <Loading /> }
          { found && this.generateList() }
        </form>
      </div>
    );
  }
}

export default Search;

// Referências:
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/74/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/53/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/58/files
