import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { server } from './mocks/server';

describe('App', () => {
  beforeAll(() => { server.listen(); });
  afterAll(() => { server.close(); });

  it('should not crash when rendered', async () => {
    // given
    render(<App />);
    const logo = screen.getByTitle(/logo/i);
    // then
    await waitFor(() => {
      expect(logo).toBeInTheDocument();
    });
  });

  it('should sign in when using correct credentials', async () => {
    // given
    const initialValues = {
      email: 'john.doe@mail.com',
      password: 'longenoughpassword',
    };

    render(<App />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const [passwordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });

    // when
    await userEvent.type(emailInput, initialValues.email);
    await userEvent.type(passwordInput, initialValues.password);
    await userEvent.click(submitButton);

    // then
    const Logout = await screen.findByRole('button', { name: /logout/i, exact: false });
    expect(Logout).toBeInTheDocument();
  });
});
