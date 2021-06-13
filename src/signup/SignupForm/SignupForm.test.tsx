import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupForm, { SignupFormValues } from './SignupForm';

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
    const { container } = render(<SignupForm onSubmit={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const emailError = container.querySelector(`#${emailInput.getAttribute('aria-describedby')}`);

    const fullNameInput = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const fullNameError = container.querySelector(
      `#${fullNameInput.getAttribute('aria-describedby')}`,
    );

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });

    const passwordError = container.querySelector(
      `#${passwordInput.getAttribute('aria-describedby')}`,
    );

    const confirmPasswordError = container.querySelector(
      `#${confirmPasswordInput.getAttribute('aria-describedby')}`,
    );

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
    const { container } = render(<SignupForm onSubmit={() => {}} />);

    const input = screen.getByRole('textbox', { name: /e-mail address/i, exact: false });
    const error = container.querySelector(`#${input.getAttribute('aria-describedby')}`);

    // when
    userEvent.type(input, 'invalid email');
    fireEvent.blur(input);

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/invalid/i);
    });
  });

  it('should display error when full name has no spaces', async () => {
    // given
    const { container } = render(<SignupForm onSubmit={() => {}} />);

    const input = screen.getByRole('textbox', { name: /full name/i, exact: false });
    const error = container.querySelector(`#${input.getAttribute('aria-describedby')}`);

    // when
    userEvent.type(input, 'invalid-name');
    fireEvent.blur(input);

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/missing/i);
    });
  });

  it('should display error when password is too short', async () => {
    // given
    const { container } = render(<SignupForm onSubmit={() => {}} />);

    const [input] = screen.getAllByLabelText(/password/i, { exact: false });
    const error = container.querySelector(`#${input.getAttribute('aria-describedby')}`);

    // when
    userEvent.type(input, 'short');
    fireEvent.blur(input);

    // then
    await waitFor(() => {
      expect(error).toHaveTextContent(/too short/i);
    });
  });

  it('should display error when confirm password does not match password', async () => {
    // given
    const { container } = render(<SignupForm onSubmit={() => {}} />);

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i, {
      exact: false,
    });
    const confirmPasswordError = container.querySelector(
      `#${confirmPasswordInput.getAttribute('aria-describedby')}`,
    );

    // when
    userEvent.type(passwordInput, 'firstPassword');
    userEvent.type(confirmPasswordInput, 'secondPassword');
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

    let submittedValues: SignupFormValues;
    const handleSubmit = (values: SignupFormValues) => {
      submittedValues = values;
    };

    render(<SignupForm onSubmit={handleSubmit} />);
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
      expect(submittedValues).toEqual(initialValues);
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
    userEvent.type(emailInput, initialValues.email);
    userEvent.type(fullNameInput, initialValues.name);
    userEvent.type(passwordInput, initialValues.password);
    userEvent.type(confirmPasswordInput, initialValues.confirmPassword);
    userEvent.click(submitButton);

    // then
    await waitFor(() => {
      expect(formError).toHaveTextContent(/contains errors/i);
    });
  });
});
