import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetGame } from '../redux/actions';

const NUMBER_OF_ASSERTIONS = 3;

class Feedback extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('ranking')) {
      const { score, name, gravatarEmail } = this.props;
      const storage = localStorage;
      const obj = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${gravatarEmail}`,
      };
      const storageArr = [obj];
      const arrToString = JSON.stringify(storageArr);
      return storage.setItem('ranking', arrToString);
    }
    const { score, name, gravatarEmail } = this.props;
    const storage = localStorage;
    const obj = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${gravatarEmail}`,
    };
    const initialArray = JSON.parse(localStorage.getItem('ranking'));
    const storageArr = [...initialArray, obj];
    const arrToString = JSON.stringify(storageArr);
    return storage.setItem('ranking', arrToString);
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetGame());
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        {
          assertions < NUMBER_OF_ASSERTIONS
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <div className="feedbacks">
          <p data-testid="feedback-total-question">
            {`${assertions} acertos`}
          </p>
          <p data-testid="feedback-total-score">
            {`${score} pontos`}
          </p>
        </div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ver Ranking
        </button>
        <button
          type="button"
          onClick={ this.playAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { assertions, score, gravatarEmail, name } = player;
  return ({
    assertions: Number(assertions),
    score,
    gravatarEmail,
    name,
  });
};

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
