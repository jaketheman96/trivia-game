import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';

const NUMBER_OF_ASSERTIONS = 3;

class Feedback extends React.Component {
  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <div className="feedbacks">
          {
            assertions < NUMBER_OF_ASSERTIONS
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>
          }
        </div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ver Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { assertions } = player;
  return ({
    assertions: Number(assertions),
  });
};

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
