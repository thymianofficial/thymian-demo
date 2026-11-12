import {
  httpRule,
  not,
  responseMediaType,
  statusCodeRange,
} from '@thymian/core';

// Every client error is reported as RFC 9457 Problem Details, so clients can
// handle all of them with one parser. The demo API answers with
// `{ "error": "..." }` as plain application/json instead.
export default httpRule('space-api/client-errors-are-problem-json')
  .severity('warn')
  .type('static', 'test', 'analytics')
  .description('A 4xx response must be application/problem+json')
  .appliesTo('server')
  .rule((ctx) =>
    ctx.validateCommonHttpTransactions({
      appliesTo: statusCodeRange(400, 499),
      violatedWhen: not(responseMediaType('application/problem+json')),
    }),
  )
  .done();
