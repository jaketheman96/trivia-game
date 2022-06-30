import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAssertions } from '../redux/actions';
import Timer from '../components/Timer';
import Header from '../components/Header';

const RESPONSE_CODE_NUM = 3;
const NUMBER_INDEX = 4;

class Game extends React.Component {
  state = {
    questions: [],
    index: 0,
    rigthAnswers: [],
    setStyle: false,
    showNext: false,
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
        const assertions = data.results.map((question) => {
          answers.push(question.correct_answer);
          return [
            question.correct_answer,
            ...question.incorrect_answers,
          ].map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        });
        this.setState({
          rigthAnswers: answers,
        });
        dispatch(getAssertions(assertions));
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeSetStyle = () => {
    this.setState({ setStyle: true, showNext: true });
  }

  handleNextQuestion = () => {
    const { index } = this.state;
    this.timer = 0;
    if (index === NUMBER_INDEX) {
      this.setState({
        index: 0,
        setStyle: false,
        showNext: false,
      });
    }
    this.setState((prevState) => ({
      index: prevState.index + 1,
      setStyle: false,
      showNext: false,
    }));
  }

  handleAnswer = () => {
    this.setState({
      setStyle: true,
      showNext: true,
    });
  }

  render() {
    const { assertionsUser } = this.props;
    const { questions, index, rigthAnswers, setStyle, showNext } = this.state;
    return (
      <>
        <Header />
        {
          questions[0]
            ? (
              <div className="questionContainer">
                <p data-testid="question-category">{questions[index].category}</p>
                <p data-testid="question-text">{questions[index].question}</p>
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
                              ? 'correct-answer' : `wrong-answer-${position}`
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
                          disabled={ setStyle }
                        >
                          {assertion}
                        </button>
                      ))
                    )
                  }
                </div>
                <div className="timer">
                  <Timer
                    setStyle={ this.changeSetStyle }
                    handleNextQuestion={ this.handleNextQuestion }
                    showNext={ showNext }
                  />
                </div>
              </div>
            ) : <p>Token expirado</p>
        }
      </>
    );
  }
}

const mapStateToProps = ({ globalReducer }) => {
  const { assertionsUser } = globalReducer;
  return ({
    assertionsUser,
  });
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
