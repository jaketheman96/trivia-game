import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { countAssertions,
  getAssertions, recordTimer, updateScore } from '../redux/actions';
import Header from '../components/Header';

const RESPONSE_CODE_NUM = 3;
const NUMBER_INDEX = 4;
const HARD = 3;
const SCORE_10 = 10;
const CORRECT_ANSWER = 'correct-answer';

class Game extends React.Component {
  state = {
    questions: [],
    index: 0,
    rigthAnswers: [],
    difficulty: [],
    setStyle: false,
    score: 0,
    stopTimer: false,
    seconds: 30,
    showNext: false,
    totalAssertions: 0,
  }

  async componentDidMount() {
    const { history, dispatch } = this.props;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      if (data.response_code === RESPONSE_CODE_NUM) {
        localStorage.removeItem('token');
        return history.push('/');
      }
      this.setState({
        questions: data.results,
      }, () => {
        const answers = [];
        const arrayDifficulty = [];
        const assertions = data.results.map((question) => {
          answers.push(question.correct_answer);
          arrayDifficulty.push(question.difficulty);
          return [
            question.correct_answer,
            ...question.incorrect_answers,
          ].map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        });
        const newArray = arrayDifficulty.map((dif) => (dif.replace('easy', 1)))
          .map((dif) => (dif.replace('medium', 2)))
          .map((dif) => (dif.replace('hard', HARD)));
        this.setState({
          rigthAnswers: answers,
          difficulty: newArray,
        });
        dispatch(getAssertions(assertions));
      });
    } catch (error) {
      console.log(error);
    }
    this.timer = 0;
    this.startTimer();
  }

  changeSetStyle = () => {
    this.setState({ setStyle: true, stopTimer: true, showNext: true });
  }

  timeAnswers = (seconds) => {
    const { dispatch } = this.props;
    dispatch(recordTimer(seconds));
  }

  handleNextQuestion = () => {
    this.stopTimer();
    const { index } = this.state;
    const { history } = this.props;
    this.timer = 0;
    if (index === NUMBER_INDEX) {
      this.setState({ index: 0,
        setStyle: false,
        stopTimer: false,
        showNext: false,
      }, () => this.startTimer());
      this.setState({ score: 0 });
      history.push('/feedback');
    }
    this.setState((prevState) => ({ index: prevState.index + 1,
      setStyle: false,
      stopTimer: false,
      showNext: false,
    }), () => this.startTimer());
  }

  handleAnswer = ({ target }) => {
    const { seconds } = this.state;
    const { dispatch } = this.props;
    const { name, id } = target;
    this.setState({ stopTimer: true, setStyle: true, showNext: true });
    if (id.includes(CORRECT_ANSWER)) {
      this.setState((prevState) => {
        dispatch(countAssertions(prevState.totalAssertions + 1));
        return { totalAssertions: prevState.totalAssertions + 1 };
      });
      this.sum(name, seconds);
    }
  }

  sum = (index, seconds) => {
    const { difficulty } = this.state;
    const { dispatch } = this.props;
    const sum = (
      Number(SCORE_10) + (Number(seconds) * Number(difficulty[index])));
    this.setState((prevState) => {
      dispatch(updateScore((Number(prevState.score) + Number(sum))));
      return { score:
      (Number(prevState.score) + Number(sum)) };
    });
  }

  startTimer = () => {
    const { seconds } = this.state;
    const ms = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, ms);
    }
  }

  countDown = async () => {
    const { seconds, stopTimer } = this.state;
    const count = seconds - 1;
    if (!stopTimer) {
      this.setState({
        seconds: count,
      }, () => {
        if (seconds === 1) {
          this.stopTimer();
          this.changeSetStyle();
        }
      });
    }
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  handleNext = () => {
    this.setState({ seconds: 30 });
    this.handleNextQuestion();
  }

  getName = (assertion, right, position) => (
    assertion === right ? CORRECT_ANSWER : `wrong-answer-${position}`
  )

  render() {
    const { assertionsUser } = this.props;
    const {
      questions,
      index, rigthAnswers, setStyle, difficulty, seconds, showNext } = this.state;
    return (
      <>
        <Header />
        {
          questions[0]
            ? (
              <div className="questionContainer">
                <p data-testid="question-category">{questions[index].category}</p>
                <p data-testid="question-text">{questions[index].question}</p>
                <p>{`Dificuldade: ${difficulty[index]}`}</p>
                <div
                  data-testid="answer-options"
                  className="answers"
                >
                  {
                    assertionsUser[0]
                    && (
                      assertionsUser[index].map((assertion, position) => (
                        <button
                          type="button"
                          key={ assertion }
                          data-testid={
                            assertion === rigthAnswers[index]
                              ? CORRECT_ANSWER : `wrong-answer-${position}`
                          }
                          style={
                            setStyle
                              ? {
                                border: assertion === rigthAnswers[index]
                                  ? '3px solid rgb(6, 240, 15)'
                                  : '3px solid red',
                              }
                              : {}
                          }
                          onClick={ this.handleAnswer }
                          name={ index }
                          id={ this.getName(assertion, rigthAnswers[index], position) }
                          disabled={ setStyle }
                        >
                          {assertion}
                        </button>
                      ))
                    )
                  }
                </div>
                <div className="timer">
                  <h2>{`Tempo: ${seconds} segundos`}</h2>
                  { showNext && (
                    <button
                      type="button"
                      onClick={ this.handleNext }
                      data-testid="btn-next"
                    >
                      Próxima pergunta
                    </button>
                  )}
                </div>
              </div>
            ) : <p>Token expirado</p>
        }
      </>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { assertionsUser } = player;
  return ({ assertionsUser, timer: player.timer });
};

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  assertionsUser: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, null)(Game);
