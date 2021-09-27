import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      search: value,
    });
  }

  render() {
    const minLength = 2;
    const { search } = this.state;

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
            type="submit"
            data-testid="search-artist-button"
            disabled={ search.length < minLength }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
