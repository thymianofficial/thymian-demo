import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Send invalid body
  request.body = {};
  return request;
};

export default hook;
