import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      submit: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

   handleClick = async () => {
     this.setState({ loading: true });
     const { name, email, image, description } = this.state;
     const createUser = { name, email, image, description };
     await updateUser(createUser);
     this.setState({
       loading: false,
       submit: true,
     });
   }

   handleChange({ target: { name, value } }) {
     this.setState({
       [name]: value,
     });
   }

  fetchUserInfo = async () => {
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  }

  render() {
    const { name, email, description, image, loading, submit } = this.state;
    const allowSubmit = name !== ''
    && email !== '' && image !== '' && description !== '';
    const profileInfos = (
      <main data-testid="page-profile-edit">
        <img data-testid="profile-image" src={ image } alt="Foto de perfil" />
        <input
          type="text"
          data-testid="edit-input-image"
          value={ image }
          onChange={ this.handleChange }
          name="image"
          required
        />
        <input
          type="text"
          data-testid="edit-input-name"
          value={ name }
          onChange={ this.handleChange }
          name="name"
          required
        />
        <input
          type="text"
          data-testid="edit-input-email"
          value={ email }
          onChange={ this.handleChange }
          name="email"
          required
        />
        <input
          type="text"
          data-testid="edit-input-description"
          value={ description }
          onChange={ this.handleChange }
          name="description"
          required
        />
        <button
          type="button"
          data-testid="edit-button-save"
          onClick={ this.handleClick }
          disabled={ !allowSubmit }
        >
          Salvar
        </button>
      </main>
    );

    return (
      <div>
        <Header />
        { loading ? <Loading /> : profileInfos }
        { submit ? <Redirect to="/profile" /> : '' }
      </div>
    );
  }
}

export default ProfileEdit;

// Refs:
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/16/files
// https://github.com/tryber/sd-014-b-project-trybetunes/pull/2/files
