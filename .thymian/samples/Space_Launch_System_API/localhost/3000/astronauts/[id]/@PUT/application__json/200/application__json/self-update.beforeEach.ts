import { BeforeEachRequestHook } from '../../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  const email = `put-astro-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);

  const response = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Astronaut ${utils.randomString(6)}`,
      email,
      password,
      role: 'Commander',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (response.statusCode !== 201) {
    utils.fail('Failed to create astronaut. Got ' + response.statusCode);
  }

  request.pathParameters.id = response.body.id;

  // Authenticate as this astronaut (must update yourself)
  request.authorize = false;
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;

  // Set valid update body
  request.body.name = `Updated ${utils.randomString(6)}`;
  request.body.email = `updated-${utils.randomString(8)}@test.com`;
  request.body.password = utils.randomString(12);
  request.body.role = 'Commander';

  return request;
};

export default hook;
