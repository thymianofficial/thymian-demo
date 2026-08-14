import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  request.body = { mission_name: '' };
  return request;
};

export default hook;
