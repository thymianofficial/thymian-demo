import { httpRule, not, responseHeader, statusCode } from '@thymian/core';

// A client that created a resource needs to know where it lives. The demo API
// answers POST /astronauts, POST /launches and POST /launches/{id}/crew-members
// with 201 and a body, but never says where the new resource is.
export default httpRule('space-api/created-responses-have-location')
  .severity('warn')
  .type('static', 'test', 'analytics')
  .description(
    'A 201 Created response must name the new resource in a Location header',
  )
  .appliesTo('server')
  .rule((ctx) =>
    ctx.validateCommonHttpTransactions({
      appliesTo: statusCode(201),
      violatedWhen: not(responseHeader('location')),
    }),
  )
  .done();
