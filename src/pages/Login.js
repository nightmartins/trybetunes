import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      name: value,
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { name, loading, redirect } = this.state;

    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;

    const minLength = 3;

    return (
      <div data-testid="page-login">
        <Header />
        <h1>Login</h1>
        <input
          type="text"
          data-testid="login-name-input"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
          disabled={ name.length < minLength }
        >
          Login
        </button>
      </div>
    );
  }
}

export default Login;

// Consultei diferentes repositórios para entender a lógica da página.
// 1: https://github.com/tryber/sd-014-b-project-trybetunes/pull/74/files
// 2: https://github.com/tryber/sd-014-b-project-trybetunes/pull/20/files
// 3: https://github.com/tryber/sd-014-b-project-trybetunes/pull/4/files
