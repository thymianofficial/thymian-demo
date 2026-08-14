import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create a launch and add an astronaut as crew, then try to add again for 409
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  const launch = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Dup Crew ${utils.randomString(6)}`,
      launch_date: '2026-12-01',
      rocket_type_id: rocketTypes.body[0].id,
      is_manned: true,
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  if (launch.statusCode !== 201) {
    utils.fail('Failed to create launch. Got ' + launch.statusCode);
  }

  const astronaut = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Dup Crew ${utils.randomString(6)}`,
      email: `dup-crew-${utils.randomString(8)}@test.com`,
      password: utils.randomString(12),
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (astronaut.statusCode !== 201) {
    utils.fail('Failed to create astronaut. Got ' + astronaut.statusCode);
  }

  // Add crew member first time
  await utils.request('POST http://localhost:3000/launches/{id}/crew-members', {
    body: { astronaut_id: astronaut.body.id },
    path: { id: launch.body.id },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  // Now try to add again (should be 409)
  request.pathParameters.id = launch.body.id;
  request.body.astronaut_id = astronaut.body.id;

  return request;
};

export default hook;
