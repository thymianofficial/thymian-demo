import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create two astronauts with same email to test conflict on update
  const email = `conflict-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);

  // Create first astronaut with this email
  const first = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: 'First Astronaut',
      email,
      password: utils.randomString(12),
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (first.statusCode !== 201) {
    utils.fail('Failed to create first astronaut. Got ' + first.statusCode);
  }

  // Create second astronaut (the one we'll update)
  const secondEmail = `conflict-src-${utils.randomString(8)}@test.com`;
  const second = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: 'Second Astronaut',
      email: secondEmail,
      password,
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (second.statusCode !== 201) {
    utils.fail('Failed to create second astronaut. Got ' + second.statusCode);
  }

  // Try to update second astronaut with first astronaut's email
  request.pathParameters.id = second.body.id;
  request.authorize = false;
  const token = Buffer.from(`${secondEmail}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;
  request.body.name = 'Updated Name';
  request.body.email = email; // conflicting email
  request.body.password = utils.randomString(12);
  request.body.role = 'Pilot';

  return request;
};

export default hook;
