import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="feedbacks" data-testid="feedback-text" />
      </>
    );
  }
}

export default Feedback;
