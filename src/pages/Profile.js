import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    const profileInfos = (
      <div data-testid="page-profile">
        <img data-testid="profile-image" src={ image } alt="Foto de perfil" />
        <h3>{ name }</h3>
        <h3>{ email }</h3>
        <h3>{ description }</h3>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
    return (
      <div>
        <Header />
        <h1>Perfil</h1>
        { loading ? <Loading /> : profileInfos }
      </div>
    );
  }
}

export default Profile;
