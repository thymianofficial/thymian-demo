import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  // Create launch as default auth user
  const launch = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Forbidden Delete ${utils.randomString(6)}`,
      launch_date: '2026-12-01',
      rocket_type_id: rocketTypes.body[0].id,
      is_manned: false,
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  if (launch.statusCode !== 201) {
    utils.fail('Failed to create launch. Got ' + launch.statusCode);
  }

  // Authenticate as a different Commander
  const email = `other-del-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);
  await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Other ${utils.randomString(6)}`,
      email,
      password,
      role: 'Commander',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  request.pathParameters.id = launch.body.id;
  request.authorize = false;
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;

  return request;
};

export default hook;
