import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Send invalid body to trigger 400
  request.body = { mission_name: '' };
  return request;
};

export default hook;
