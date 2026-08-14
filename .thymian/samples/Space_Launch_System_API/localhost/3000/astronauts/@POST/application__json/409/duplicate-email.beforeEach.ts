import { BeforeEachRequestHook } from '../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // First create an astronaut, then try to create another with the same email
  const email = `duplicate-${utils.randomString(8)}@test.com`;

  const createResponse = await utils.request('POST http://localhost:3000/astronauts', {
    body: {
      name: 'Duplicate Test',
      email,
      password: utils.randomString(12),
      role: 'Pilot',
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: false, runHooks: false });

  if (createResponse.statusCode !== 201) {
    utils.fail('Failed to create initial astronaut for 409 test. Got ' + createResponse.statusCode);
  }

  request.body.email = email;
  request.body.name = 'Duplicate Test 2';
  request.body.password = utils.randomString(12);

  return request;
};

export default hook;
