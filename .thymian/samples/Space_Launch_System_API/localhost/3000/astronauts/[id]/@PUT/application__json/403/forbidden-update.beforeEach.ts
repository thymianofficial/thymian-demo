import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create a different astronaut and try to update them (forbidden - not yourself)
  const response = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Other Astronaut ${utils.randomString(6)}`,
      email: `other-${utils.randomString(8)}@test.com`,
      password: utils.randomString(12),
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (response.statusCode !== 201) {
    utils.fail('Failed to create other astronaut. Got ' + response.statusCode);
  }

  request.pathParameters.id = response.body.id;
  request.body.name = 'Should Not Work';
  request.body.email = `forbidden-${utils.randomString(8)}@test.com`;
  request.body.password = utils.randomString(12);
  request.body.role = 'Pilot';

  return request;
};

export default hook;
