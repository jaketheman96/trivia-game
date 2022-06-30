import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  state = {
    seconds: 30,
  }

  componentDidMount() {
    this.timer = 0;
    this.startTimer();
  }

  startTimer = async () => {
    const { seconds } = this.state;
    const ms = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, ms);
    }
  }

  countDown = async () => {
    const { seconds } = this.state;
    const { setStyle } = this.props;
    const count = seconds - 1;
    this.setState({
      seconds: count,
    });
    if (seconds === 1) {
      this.stopTimer();
      setStyle();
    }
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  handleNext = () => {
    const { handleNextQuestion } = this.props;
    this.setState({ seconds: 30 });
    handleNextQuestion();
  }

  render() {
    const { seconds } = this.state;
    const { showNext } = this.props;
    return (
      <>
        <h2>{`Tempo: ${seconds} segundos`}</h2>
        { showNext
          && (
            <button
              type="button"
              onClick={ this.handleNext }
              data-testid="btn-next"
            >
              Próxima pergunta
            </button>
          ) }
      </>
    );
  }
}

Timer.propTypes = {
  setStyle: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  showNext: PropTypes.bool.isRequired,
};

export default Timer;
