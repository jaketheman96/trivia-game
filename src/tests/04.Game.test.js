import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Game from '../pages/Game';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de game', () => {
  it('Deve redirecionar para a página de feedback ao clicar no botão da última questão', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'Teste@teste.com');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });
    const token = screen.queryByText(/Token/i);
    await waitFor(() => expect(token).not.toBeInTheDocument(), {timeout: 3000 });
    for (let i = 0; i < 5 ; i++) {
      const correctAnswer = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer);
      await waitFor(() => expect(correctAnswer.style.border).toBe('3px solid rgb(6, 240, 15)'), { timeout: 500 });
      const nextQuestion = screen.getByTestId('btn-next');
      userEvent.click(nextQuestion);
    }
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });
  it('Quando o timer chegar a 0, o estilo das alternativas deve mudar, o timer deve parar, e o botão de próxima deve estar visivel', async () => {
    jest.setTimeout(40000);
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'Teste@teste.com');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });
    const token = screen.queryByText(/Token/i);
    await waitFor(() => expect(token).not.toBeInTheDocument(), {timeout: 2000 });
    const correctAnswer = screen.getByTestId('correct-answer');
    await waitFor(() =>
      expect(correctAnswer.style.border)
        .toBe('3px solid rgb(6, 240, 15)'), { timeout: 31000 });
    const nextQuestion = screen.getByTestId('btn-next');
    expect(nextQuestion).toBeInTheDocument();
  });
  it('Deve redirecionar para a página inicial quando o token é inválido', async () => {
    
  });
});