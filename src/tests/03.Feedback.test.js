import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";

describe('Testa a pagina de Feedback', () => {
  test('Verifica se a pagina de feedback renderiza apos o game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 5000 });
    const userGamer = screen.getByText('Teste');
    expect(userGamer).toBeInTheDocument();
    const token = screen.queryByText(/Token/i);
    await waitFor(() => expect(token).not.toBeInTheDocument(), {timeout: 3000 });
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
      history.push('feedback');
      expect(history.location.pathname).toBe('/feedback');
  })

  test('Verifica se as informacoes sao mostradas na tela de feedback corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 5000 });
    const userGamer = screen.getByText('Teste');
    expect(userGamer).toBeInTheDocument();
    const token = screen.queryByText(/Token/i);
    await waitFor(() => expect(token).not.toBeInTheDocument(), {timeout: 3000 });
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
      history.push('feedback');
      expect(history.location.pathname).toBe('/feedback');
      const usernameEl = screen.getByTestId('header-player-name')
      const acertosEl = screen.getByTestId('feedback-total-question')
      const scoreEl = screen.getByTestId('feedback-total-score')
      const feedbackTextEl = screen.getByTestId('feedback-text')
      expect(usernameEl).toBeInTheDocument()
      expect(acertosEl).toHaveTextContent(/acertos/i)
      expect(scoreEl).toHaveTextContent(/pontos/i)
      expect(feedbackTextEl).toHaveTextContent(/could be better.../i)
  })

  test('Verifica se o botao play again volta para a pagina de login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 5000 });
    const userGamer = screen.getByText('Teste');
    expect(userGamer).toBeInTheDocument();
    const token = screen.queryByText(/Token/i);
    await waitFor(() => expect(token).not.toBeInTheDocument(), {timeout: 3000 });
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
    userEvent.click(correctAnswer);
    userEvent.click(nextQuestion);
      history.push('feedback');
      expect(history.location.pathname).toBe('/feedback');
      const playAgainEl = screen.getByTestId('btn-play-again')
      expect(playAgainEl).toBeInTheDocument()
      userEvent.click(playAgainEl)
      const nameInputEl = screen.getByTestId('input-player-name')
      expect(nameInputEl).toBeInTheDocument()
  })
})