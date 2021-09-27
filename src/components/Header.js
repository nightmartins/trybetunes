import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: {},
      loading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((data) => {
        this.setState({
          name: data.name,
          loading: false,
        });
      });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header testid="header-component">
        <h2 data-testid="header-user-name">
          { loading ? <Loading /> : `Olá ${name}` }
        </h2>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
