import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create a launch to get a valid ID
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  const response = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Get Launch ${utils.randomString(6)}`,
      launch_date: '2026-12-01',
      rocket_type_id: rocketTypes.body[0].id,
      is_manned: true,
    },
    headers: { 'content-type': 'application/json' },
  }, { authorize: true, runHooks: false });

  if (response.statusCode !== 201) {
    utils.fail('Failed to create launch. Got ' + response.statusCode);
  }

  request.pathParameters.id = response.body.id;
  return request;
};

export default hook;
