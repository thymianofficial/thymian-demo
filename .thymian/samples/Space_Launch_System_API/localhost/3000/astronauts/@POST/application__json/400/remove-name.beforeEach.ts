import { BeforeEachRequestHook } from '@thymian/hooks';
import { isRecord } from '@thymian/core';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  if (isRecord(request.body)) {
    delete request.body.name;
  }

  return request;
};


export default hook;
