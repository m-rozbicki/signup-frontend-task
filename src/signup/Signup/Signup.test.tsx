import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter } from 'react-router-dom';
import Signup from './Signup';
import { server } from '../../mocks/server';

describe('Signup', () => {
  beforeAll(() => { server.listen(); });
  afterAll(() => { server.close(); });

  it('should display server error when trying to register already registered email', async () => {
    // given
    const initialValues = {
      email: 'already@registered.com',
      name: 'John Doe',
      password: 'longenoughpassword',
      confirmPassword: 'longenoughpassword',
    };

    render(<HashRouter><Signup /></HashRouter>);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(fullNameInput, initialValues.name);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/already registered/i);
    });
  });

  it('should display server error when using "fail me" name', async () => {
    // given
    const initialValues = {
      email: 'john.doe@mail.com',
      name: 'fail me',
      password: 'longenoughpassword',
      confirmPassword: 'longenoughpassword',
    };

    render(<HashRouter><Signup /></HashRouter>);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(fullNameInput, initialValues.name);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/there was an error/i);
    });
  });

  it('should display network error when using "network error" name', async () => {
    // given
    const initialValues = {
      email: 'john.doe@mail.com',
      name: 'network error me',
      password: 'longenoughpassword',
      confirmPassword: 'longenoughpassword',
    };

    render(<HashRouter><Signup /></HashRouter>);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(fullNameInput, initialValues.name);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/network error/i);
    });
  });

  it('should display thank you message when succesfully registered', async () => {
    // given
    const initialValues = {
      email: 'john.doe@mail.com',
      name: 'John Doe',
      password: 'longenoughpassword',
      confirmPassword: 'longenoughpassword',
    };

    render(<HashRouter><Signup /></HashRouter>);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });

    // when
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(fullNameInput, initialValues.name);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      const ThankYou = screen.getByRole('status', { name: /thank you/i, exact: false });
      expect(ThankYou).toBeInTheDocument();
    });
  });
});
