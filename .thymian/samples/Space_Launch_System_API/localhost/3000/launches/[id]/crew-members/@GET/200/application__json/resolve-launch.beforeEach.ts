import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  const launch = await utils.request('POST http://localhost:3000/launches', {
    body: {
      mission_name: `Crew Launch ${utils.randomString(6)}`,
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
  return request;
};

export default hook;
