import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const NUMBER_OF_ASSERTIONS = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <div className="feedbacks">
          {
            assertions < NUMBER_OF_ASSERTIONS
              ? <p>Could be better...</p> : <p>Well Done!</p>
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ globalReducer }) => {
  const { assertions } = globalReducer;
  return ({
    assertions,
  });
};

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
