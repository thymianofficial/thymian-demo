import { BeforeEachRequestHook } from '../../../../../types';

const hook: BeforeEachRequestHook = async (request, context, utils) => {
  request.pathParameters.id = 999999;
  request.body.mission_name = 'Nonexistent';
  request.body.launch_date = '2027-01-01';
  request.body.rocket_type_id = 1;
  request.body.is_manned = false;
  return request;
};

export default hook;
