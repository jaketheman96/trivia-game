import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  state = {
    score: 0,
  }

  render() {
    const { hashMail, name } = this.props;
    const { score } = this.state;
    return (
      <header>
        <h2
          data-testid="header-player-name"
        >
          {name}
        </h2>
        <img
          src={ `https://www.gravatar.com/avatar/${hashMail}` }
          alt={ `${name}'s avatar` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">{`Seu score é: ${score}`}</p>
      </header>
    );
  }
}

const mapStateToProps = ({ globalReducer }) => {
  const { name, gravatarEmail } = globalReducer;
  return ({
    name,
    hashMail: gravatarEmail,
  });
};

Game.propTypes = {
  hashMail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Game);
