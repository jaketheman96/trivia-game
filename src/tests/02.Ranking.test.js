import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Cobertura de testes da tela de Ranking', () => {
    
    test('A rota para esta página deve ser \'/ranking\'', async () => {
        jest.spyOn(global, 'fetch');
        const { history } = renderWithRouterAndRedux(<App />);
        const inputName = screen.getByTestId('input-player-name');
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(inputName, 'Teste');
        userEvent.type(inputEmail, 'teste@teste.com');
        userEvent.click(buttonPlay);
        await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });

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

        const showRanking = screen.getByTestId('btn-ranking');
        expect(showRanking).toBeInTheDocument();
        userEvent.click(showRanking);
    
        expect(history.location.pathname).toBe('/ranking');
    });

    test('A tela de ranking deve possuir um título com o atributo data-testid contendo o valor ranking-title', async () => {
        jest.spyOn(global, 'fetch');
        const { history } = renderWithRouterAndRedux(<App />);
        const inputName = screen.getByTestId('input-player-name');
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(inputName, 'Teste');
        userEvent.type(inputEmail, 'teste@teste.com');
        userEvent.click(buttonPlay);
        await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });

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

        const showRanking = screen.getByTestId('btn-ranking');
        expect(showRanking).toBeInTheDocument();
        userEvent.click(showRanking);
    
        expect(history.location.pathname).toBe('/ranking');
        const titleRanking = screen.getByTestId('ranking-title');
        expect(titleRanking).toBeInTheDocument();
    });

    test('A tela de ranking deve possuir um botão com o atributo data-testid contendo o valor btn-go-home e que ao ser clicado redireciona para a página de início', async () => {
        jest.spyOn(global, 'fetch');
        const { history } = renderWithRouterAndRedux(<App />);
        const inputName = screen.getByTestId('input-player-name');
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(inputName, 'Teste');
        userEvent.type(inputEmail, 'teste@teste.com');
        userEvent.click(buttonPlay);
        await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });

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

        const showRanking = screen.getByTestId('btn-ranking');
        expect(showRanking).toBeInTheDocument();
        userEvent.click(showRanking);
    
        expect(history.location.pathname).toBe('/ranking');
        
        const buttonHome = screen.getByTestId('btn-go-home');
        expect(buttonHome).toBeInTheDocument();
        userEvent.click(buttonHome);
        const { pathname } = history.location;
        expect(pathname).toBe('/')
    });

    test('A tela de ranking deve possuir uma lista com a imagem, nome e pontuação das pessoas que jogaram e deve ficar armazenado no localStorage', async () => {
        jest.spyOn(global, 'fetch');
        const { history } = renderWithRouterAndRedux(<App />);
        const inputName = screen.getByTestId('input-player-name');
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const buttonPlay = screen.getByTestId('btn-play');
        userEvent.type(inputName, 'Teste');
        userEvent.type(inputEmail, 'otavioad97@hotmail.com');
        userEvent.click(buttonPlay);
        await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });

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

        const showRanking = screen.getByTestId('btn-ranking');
        expect(showRanking).toBeInTheDocument();
        userEvent.click(showRanking);

        const name = screen.getByRole('columnheader', { name: 'Nome'});
        expect(name).toBeInTheDocument();
        const firstName = screen.getAllByRole('cell', { name: 'Teste'})[0]
        expect(firstName).toBeInTheDocument();
    });
})