import React from 'react';

class Login extends React.Component {
  state = {
    nameInput: '',
    email: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = (event) => {
    event.preventDefault();
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
        </form>
      </div>
    );
  }
}

export default Login;
