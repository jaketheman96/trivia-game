import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const {
      hashMail,
      name,
      score,
    } = this.props;
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
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = ({ globalReducer }) => {
  const { name, gravatarEmail, assertions } = globalReducer;
  return ({
    name,
    hashMail: gravatarEmail,
    assertions,
  });
};

Header.propTypes = {
  hashMail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
