import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Authenticate as a non-Commander (Pilot) to trigger 403
  const email = `pilot-crew-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);

  await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Pilot ${utils.randomString(6)}`,
      email,
      password,
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  const launch = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Forbidden Crew ${utils.randomString(6)}`,
      launch_date: '2026-12-01',
      rocket_type_id: rocketTypes.body[0].id,
      is_manned: true,
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  if (launch.statusCode !== 201) {
    utils.fail('Failed to create launch. Got ' + launch.statusCode);
  }

  request.pathParameters.id = launch.body.id;
  request.body.astronaut_id = 1;
  request.authorize = false;
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;

  return request;
};

export default hook;
