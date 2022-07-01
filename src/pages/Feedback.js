import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const NUMBER_OF_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header score={ score } />
        <div className="feedbacks">
          {
            assertions < NUMBER_OF_ASSERTIONS
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ globalReducer }) => {
  const { assertions, score } = globalReducer;
  return ({
    assertions: Number(assertions),
    score,
  });
};

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
