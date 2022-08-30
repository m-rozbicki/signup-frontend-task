import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SigninForm } from './SigninForm.component';

describe('Signup form', () => {
  it('should not crash when rendered', () => {
    // given
    render(<SigninForm onSubmit={() => {}} />);

    // then
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('should set required attribute when fields are required', () => {
    // given
    render(<SigninForm onSubmit={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const [passwordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });

    // then
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('should display errors on blur when required fields are empty', async () => {
    // given
    render(<SigninForm onSubmit={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
    const emailError = screen.getByRole('alert', { name: /e-mail address error/i });

    const [passwordInput] = screen.getAllByLabelText(/password/i);
    const passwordError = screen.getByRole('alert', { name: /Password error/ });

    // when
    await userEvent.click(emailInput);
    await userEvent.click(passwordInput);
    await userEvent.click(emailInput);

    // then
    await waitFor(() => {
      expect(emailError).toHaveTextContent(/required/i);
      expect(passwordError).toHaveTextContent(/required/i);
    });
  });

  it('should display error when e-mail is invalid', async () => {
    // given
    render(<SigninForm onSubmit={() => {}} />);

    const input = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const error = screen.getByRole('alert', { name: /e-mail address error/i });
    // when
    await userEvent.type(input, 'invalid email');
    await userEvent.click(document.body)

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/invalid/i);
    });
  });

  it('should submit given values when all fields are correct', async () => {
    // given
    const initialValues = {
      email: 'john.doe@mail.com',
      password: 'longenoughpassword',
    };

    const handleSubmit = jest.fn();

    render(<SigninForm onSubmit={handleSubmit} />);
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
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(initialValues, expect.anything());
    });
  });

  it('should display error when trying to submit form containing errors', async () => {
    // given
    const initialValues = {
      email: 'john.doe@',
      password: 'longenoughpassword',
    };

    render(<SigninForm onSubmit={() => {}} />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const [passwordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    await userEvent.type(emailInput, initialValues.email);
    await userEvent.type(passwordInput, initialValues.password);
    await userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/contains errors/i);
    });
  });
});
