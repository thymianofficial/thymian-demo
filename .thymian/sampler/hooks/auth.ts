import { authorize } from '@thymian/hooks';

import { basic, sarah } from './identities.js';

// Every request the description marks as secured signs in as Sarah, unless a
// targeted `authorize` hook claims it. Requests declared to answer 401 never
// reach this hook, so they stay unauthenticated.
export const credentials = authorize((request) => {
  request.headers['authorization'] = basic(sarah);
});
