import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserInfos } from '../redux/actions';

class Login extends React.Component {
  state = {
    nameInput: '',
    email: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async (event) => {
    const { history, dispatch } = this.props;
    const { nameInput, email } = this.state;
    event.preventDefault();
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    const storage = localStorage;
    dispatch(addUserInfos({ nameInput, email }));
    storage.setItem('token', token);
    history.push('/game');
  }

  handleSettingsChange = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { nameInput, email } = this.state;
    return (
      <div className="loginForm">
        <form onSubmit={ this.handleClick }>
          <label htmlFor="user-name">
            Nome:
            <input
              type="text"
              id="user-name"
              name="nameInput"
              data-testid="input-player-name"
              value={ nameInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !nameInput || !email }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsChange }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
