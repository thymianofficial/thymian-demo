import { BeforeEachRequestHook } from '@thymian/hooks';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Get a valid rocket type ID
  const rocketTypes = await utils.request('GET http://localhost:3000/rocket_types', {}, { authorize: false, runHooks: false });

  if (rocketTypes.statusCode !== 200 || !rocketTypes.body.length) {
    utils.fail('Failed to fetch rocket types. Got ' + rocketTypes.statusCode);
  }

  const body = { ...request.body as object } as any;
  if (rocketTypes.statusCode === 200) {
    body.rocket_type_id = rocketTypes.body[0].id;
  }

  request.body = body;

  return request;
};

export default hook;
