import { AuthorizeHook } from '../types';

let credentials: { email: string; password: string } | null = null;

const hook: AuthorizeHook = async (request, context, utils) => {
  if (!credentials) {
    const email = `thymian-auth-${utils.randomString(8)}@test.com`;
    const password = utils.randomString(16);

    const response = await utils.request('POST http://localhost:3000/astronauts', {
      body: {
        name: 'Thymian Auth User',
        email,
        password,
        role: 'Commander',
      },
      headers: {
        'content-type': 'application/json',
      },
    }, { authorize: false, runHooks: false });

    if (response.statusCode !== 201) {
      utils.fail(
        'Failed to create auth user. Expected 201 but got ' + response.statusCode,
      );
    }

    credentials = { email, password };
  }

  const token = Buffer.from(`${credentials.email}:${credentials.password}`).toString('base64');

  request.headers['authorization'] = `Basic ${token}`;

  return request;
};

export default hook;
