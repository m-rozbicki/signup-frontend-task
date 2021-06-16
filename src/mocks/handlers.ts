import { rest, RestRequest } from 'msw';
import httpStatus from 'http-status-codes';
import { SignupFormValues } from '../signup/SignupForm/SignupForm';
import { validationSchema } from '../signup/SignupForm/SignupForm.schema';

const { REACT_APP_BACKEND_URL } = process.env;

const testEnv = process.env.NODE_ENV === 'test';
const delay = testEnv ? 0 : 1500;

const randomizeDelay = (standardDelay: number) =>
  standardDelay + (!testEnv ? Math.random() * 1000 - 500 : 0);

export const handlers = [
  rest.post(`${REACT_APP_BACKEND_URL}/users/register`, async (req: RestRequest<SignupFormValues>, res, ctx) => {
    try {
      validationSchema.validateSync(req.body);
    } catch (error) {
      return res(
        ctx.delay(randomizeDelay(delay)),
        ctx.status(httpStatus.BAD_REQUEST),
        ctx.json({ message: error }),
      );
    }

    const user = req.body;

    if (user.email === 'already@registered.com') {
      return res(
        ctx.delay(randomizeDelay(delay)),
        ctx.status(httpStatus.CONFLICT),
        ctx.json({
          message: 'The e-mail address you\'ve provided is already registered.',
        }),
      );
    }

    if (user.name === 'fail me') {
      return res(
        ctx.delay(randomizeDelay(delay)),
        ctx.status(httpStatus.INTERNAL_SERVER_ERROR),
        ctx.json({
          message:
            'There was an error processing your form data. Please contact support if issues persist.',
        }),
      );
    }

    if (user.name === 'timeout me') {
      return res(ctx.delay('infinite'));
    }

    if (user.name === 'network error me') {
      return res.networkError('Failed to connect.');
    }

    return res(
      ctx.delay(randomizeDelay(delay)),
      ctx.status(httpStatus.CREATED),
      ctx.json({
        message: 'User was successfully registered.',
        user: { name: user.name, email: user.email },
      }),
    );
  }),
];
