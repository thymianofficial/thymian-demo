import { BeforeEachRequestHook } from '@thymian/hooks';


const hook: BeforeEachRequestHook = async (request, context, utils) => {
  const body = { ...request.body as object } as any;

  body.email = `astronaut-${utils.randomString(8)}@test.com`;
  body.name = `Astronaut ${utils.randomString(6)}`;
  body.password = utils.randomString(12);

  request.body = body;

  return request;
};

export default hook;
