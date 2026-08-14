import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  // Create a launch
  const launch = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Add Crew Launch ${utils.randomString(6)}`,
      launch_date: '2026-12-01',
      rocket_type_id: rocketTypes.body[0].id,
      is_manned: true,
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  if (launch.statusCode !== 201) {
    utils.fail('Failed to create launch. Got ' + launch.statusCode);
  }

  // Create an astronaut to add as crew
  const astronaut = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Crew Member ${utils.randomString(6)}`,
      email: `crew-${utils.randomString(8)}@test.com`,
      password: utils.randomString(12),
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (astronaut.statusCode !== 201) {
    utils.fail('Failed to create astronaut. Got ' + astronaut.statusCode);
  }

  request.pathParameters.id = launch.body.id;
  request.body.astronaut_id = astronaut.body.id;

  return request;
};

export default hook;
