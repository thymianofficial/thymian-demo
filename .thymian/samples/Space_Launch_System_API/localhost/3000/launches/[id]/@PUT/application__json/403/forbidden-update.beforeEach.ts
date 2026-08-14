import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create a launch as the auth user (Commander), then try to update it as a different user
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  // Create launch as default auth user
  const launch = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Forbidden Update ${utils.randomString(6)}`,
      launch_date: '2026-12-01',
      rocket_type_id: rocketTypes.body[0].id,
      is_manned: true,
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  if (launch.statusCode !== 201) {
    utils.fail('Failed to create launch. Got ' + launch.statusCode);
  }

  // Create a different Commander to attempt the update
  const email = `other-cmd-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);
  const other = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Other Commander ${utils.randomString(6)}`,
      email,
      password,
      role: 'Commander',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (other.statusCode !== 201) {
    utils.fail('Failed to create other commander. Got ' + other.statusCode);
  }

  request.pathParameters.id = launch.body.id;
  request.authorize = false;
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;
  request.body.mission_name = `Should Not Work`;
  request.body.launch_date = '2027-01-01';
  request.body.rocket_type_id = rocketTypes.body[0].id;
  request.body.is_manned = false;

  return request;
};

export default hook;
