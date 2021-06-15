import { rest } from 'msw';

const { REACT_APP_BACKEND_URL } = process.env;
const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

export const handlers = [
  rest.post(`${REACT_APP_BACKEND_URL}/users/register`, async (req, res, ctx) => {
    if (typeof req.body !== 'string') {
      return res(
        ctx.delay(delay),
        ctx.status(400),
        ctx.json({ message: 'String body expected.' }),
      );
    }

    const user = JSON.parse(req.body);

    if (user.email === 'already@registered.com') {
      return res(
        ctx.delay(delay),
        ctx.status(200),
        ctx.json({
          message: "The e-mail address you've provided is already registered.",
        }),
      );
    }

    if (user.name === 'fail me') {
      return res(
        ctx.delay(delay),
        ctx.status(500),
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
      ctx.delay(delay),
      ctx.status(201),
      ctx.json({
        message: 'User was successfully registered.',
        user: { name: user.name, email: user.email },
      }),
    );
  }),
];
