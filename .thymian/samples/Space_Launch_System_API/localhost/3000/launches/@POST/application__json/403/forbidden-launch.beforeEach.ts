import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Authenticate as a non-Commander to trigger 403
  const email = `pilot-${utils.randomString(8)}@test.com`;
  const password = utils.randomString(12);

  const response = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Pilot ${utils.randomString(6)}`,
      email,
      password,
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (response.statusCode !== 201) {
    utils.fail('Failed to create pilot astronaut. Got ' + response.statusCode);
  }

  request.authorize = false;
  const token = Buffer.from(`${email}:${password}`).toString('base64');
  request.headers['authorization'] = `Basic ${token}`;

  // Valid launch body
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });
  request.body.mission_name = `Forbidden Mission ${utils.randomString(6)}`;
  request.body.launch_date = '2026-12-01';
  request.body.rocket_type_id = rocketTypes.body[0].id;
  request.body.is_manned = false;

  return request;
};

export default hook;
