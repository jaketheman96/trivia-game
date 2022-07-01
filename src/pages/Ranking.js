import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetGame } from '../redux/actions';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const storage = localStorage;
    const arrayRanking = JSON.parse(storage.getItem('ranking'));
    const arrOrdened = [...arrayRanking];
    arrOrdened.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: arrOrdened,
    });
  }

  goHome = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetGame());
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h2 data-testid="ranking-title">Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            { ranking[0]
                && (
                  ranking.map((rank, index) => (
                    <tr key={ index }>
                      <td><img src={ rank.picture } alt={ rank.name } /></td>
                      <td data-testid={ `player-name-${index}` }>{ rank.name }</td>
                      <td data-testid={ `player-score-${index}` }>{ rank.score }</td>
                    </tr>
                  ))
                ) }
          </tbody>
        </table>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Início
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
