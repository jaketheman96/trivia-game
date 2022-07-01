import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const NUMBER_OF_ASSERTIONS = 3;

class Feedback extends React.Component {
  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
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
  const { assertions, score } = player;
  return ({
    assertions: assertions.toFixed(),
    score,
  });
};

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
