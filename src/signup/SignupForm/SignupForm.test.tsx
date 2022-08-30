import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignupForm } from './SignupForm.component';

describe('Signup form', () => {
  it('should not crash when rendered', () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    // then
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('should set required attribute when fields are required', () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });

    // then
    expect(emailInput).toBeRequired();
    expect(fullNameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(confirmPasswordInput).toBeRequired();
  });

  it('should display errors on blur when required fields are empty', async () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
    const emailError = screen.getByRole('alert', { name: /e-mail address error/i });

    const fullNameInput = screen.getByRole('textbox', { name: /full name/i });
    const fullNameError = screen.getByRole('alert', { name: /full name error/i });

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i);
    const passwordError = screen.getByRole('alert', { name: /Password error/ });
    const confirmPasswordError = screen.getByRole('alert', { name: /confirm your password error/i });

    // when
    fireEvent.blur(emailInput);
    fireEvent.blur(fullNameInput);
    fireEvent.blur(passwordInput);
    fireEvent.blur(confirmPasswordInput);

    // then
    await waitFor(() => {
      expect(emailError).toHaveTextContent(/required/i);
      expect(fullNameError).toHaveTextContent(/required/i);
      expect(passwordError).toHaveTextContent(/required/i);
      expect(confirmPasswordError).toHaveTextContent(/confirm/i);
    });
  });

  it('should display error when e-mail is invalid', async () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    const input = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const error = screen.getByRole('alert', { name: /e-mail address error/i });

    // when
    await userEvent.type(input, 'invalid email');
    fireEvent.blur(input);

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/invalid/i);
    });
  });

  it('should display error when full name has no spaces', async () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    const input = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const error = screen.getByRole('alert', { name: /full name error/i });

    // when
    await userEvent.type(input, 'invalid-name');
    fireEvent.blur(input);

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/missing/i);
    });
  });

  it('should display error when password is too short', async () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    const [input] = screen.getAllByLabelText(/password/i, { exact: false });
    const error = screen.getByRole('alert', { name: /Password error/ });

    // when
    await userEvent.type(input, 'short');
    fireEvent.blur(input);

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/too short/i);
    });
  });

  it('should display error when confirm password does not match password', async () => {
    // given
    render(<SignupForm onSubmit={() => {}} />);

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const confirmPasswordError = screen.getByRole(
      'alert',
      { name: 'Confirm your password error' },
    );

    // when
    await userEvent.type(passwordInput, 'firstPassword');
    await userEvent.type(confirmPasswordInput, 'secondPassword');
    fireEvent.blur(confirmPasswordInput);

    // then
    await waitFor(() => {
      expect(confirmPasswordError).toHaveTextContent(/confirm/i);
    });
  });

  it('should submit given values when all fields are correct', async () => {
    // given
    const initialValues = {
      email: 'john.doe@mail.com',
      name: 'John Doe',
      password: 'longenoughpassword',
      confirmPassword: 'longenoughpassword',
    };

    const handleSubmit = jest.fn();

    render(<SignupForm onSubmit={handleSubmit} />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });

    // when
    await userEvent.type(emailInput, initialValues.email);
    await userEvent.type(fullNameInput, initialValues.name);
    await userEvent.type(passwordInput, initialValues.password);
    await userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
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
      name: 'JohnDoe',
      password: 'short',
      confirmPassword: 'wrong',
    };

    render(<SignupForm onSubmit={() => {}} />);
    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const submitButton = screen.getByRole('button', { name: /continue/i, exact: false });
    const formError = screen.getByRole('alert', { name: /form error/i, exact: false });

    // when
    await userEvent.type(emailInput, initialValues.email);
    await userEvent.type(fullNameInput, initialValues.name);
    await userEvent.type(passwordInput, initialValues.password);
    await userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
    await userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/contains errors/i);
    });
  });
});
