import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  const email = `del-astro-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);

  const response = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Delete Me ${utils.randomString(6)}`,
      email,
      password,
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (response.statusCode !== 201) {
    utils.fail('Failed to create astronaut for deletion. Got ' + response.statusCode);
  }

  request.pathParameters.id = response.body.id;

  // Authenticate as this astronaut (must delete yourself)
  request.authorize = false;
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;

  return request;
};

export default hook;
