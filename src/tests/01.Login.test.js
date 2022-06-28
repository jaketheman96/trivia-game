import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de login', () => {
  it('Deve conter os elementos da página e o botão de jogar deve estar desabilitado enquanto não forem preenchidos os inputs', () => {

    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();


    userEvent.type(inputName, 'Teste');
    expect(buttonPlay).toBeDisabled();
    expect(inputName.value).toBe('Teste');
    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputEmail, 'Teste@teste.com');
    expect(inputEmail.value).toBe('Teste@teste.com');
    expect(buttonPlay).not.toBeDisabled();
  });

  it('Ao pressionar o botão de jogar deve fazer uma requisição à API e redirecionar para página do jogo', async () => {
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'Teste@teste.com');
    userEvent.click(buttonPlay);
    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  it('Ao pressionar o botão de configurações, redireciona pra rota settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});
