import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="page-search">Search</h2>
        <form>
          <input type="text" data-testid="search-artist-input" />
          <button type="submit" data-testid="search-artist-button">Pesquisar</button>
        </form>
      </div>
    );
  }
}

export default Search;
