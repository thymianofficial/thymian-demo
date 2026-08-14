import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create a different astronaut and try to delete them (forbidden)
  const response = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: `Forbidden Del ${utils.randomString(6)}`,
      email: `forbid-del-${utils.randomString(8)}@test.com`,
      password: utils.randomString(12),
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (response.statusCode !== 201) {
    utils.fail('Failed to create astronaut. Got ' + response.statusCode);
  }

  request.pathParameters.id = response.body.id;
  return request;
};

export default hook;
