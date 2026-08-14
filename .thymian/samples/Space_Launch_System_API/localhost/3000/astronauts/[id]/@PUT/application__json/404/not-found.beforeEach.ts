import { BeforeEachRequestHook } from '@thymian/hooks';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  request.pathParameters.id = 999999;

  const body = { ...request.body as object } as any;

  body.name = `Nonexistent ${utils.randomString(6)}`;
  body.email = `notfound-${utils.randomString(8)}@test.com`;
  body.password = utils.randomString(12);
  body.role = 'Pilot';

  request.body = body;

  return request;
};

export default hook;
