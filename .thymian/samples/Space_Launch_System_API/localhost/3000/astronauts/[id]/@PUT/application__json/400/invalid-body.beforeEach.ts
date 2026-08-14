import { BeforeEachRequestHook } from '../../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  // Send a request missing required fields to trigger 400
  request.body = { name: 'incomplete' };
  return request;
};

export default hook;
