import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signin from './Signin';
import { server } from '../../mocks/server';

describe('Signup', () => {
  beforeAll(() => { server.listen(); });
  afterAll(() => { server.close(); });

  it('should display server error when trying to sign in with wrong credentials', async () => {
    // given
    const initialValues = {
      email: 'wrong@mail.com',
      password: 'wrongpassword',
    };

    render(<Signin />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const [passwordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/is incorrect/i);
    });
  });

  it('should display server error when using "fail@me.com" e-mail', async () => {
    // given
    const initialValues = {
      email: 'fail@me.com',
      password: 'longenoughpassword',
    };

    render(<Signin />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const [passwordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/there was an error/i);
    });
  });

  it('should display network error when using "network.error@me.com" e-mail', async () => {
    // given
    const initialValues = {
      email: 'network.error@me.com',
      password: 'longenoughpassword',
    };

    render(<Signin />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const [passwordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/network error/i);
    });
  });
});
