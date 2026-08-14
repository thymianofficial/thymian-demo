import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Create a launch, then update it as the same user (creator)
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  const response = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Update Launch ${utils.randomString(6)}`,
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
  request.body.mission_name = `Updated Mission ${utils.randomString(6)}`;
  request.body.launch_date = '2027-01-15';
  request.body.rocket_type_id = rocketTypes.body[0].id;
  request.body.is_manned = false;

  return request;
};

export default hook;
