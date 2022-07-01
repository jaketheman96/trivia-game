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
        <p>Seu score é:</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { name, gravatarEmail, assertions, score } = player;
  return ({
    name,
    hashMail: gravatarEmail,
    assertions,
    score,
  });
};

Header.propTypes = {
  hashMail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
