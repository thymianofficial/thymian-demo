import {
  createCreatedResponse,
  createGetRequest,
  createOkResponse,
  createPostRequest,
  createRequiredParameter,
} from '@thymian/core-testing';
import {
  checkInput,
  inDeclaredContexts,
  type ObservedTransaction,
  runInContext,
  validationContexts,
} from '@thymian/rules-testing';
import { describe, expect, it } from 'vitest';

import rule from './created-responses-have-location.rule.js';

// POST /launches -> 201, described and answered without a Location header:
// what the demo API does today.
const createdWithoutLocation: ObservedTransaction = {
  described: {
    request: createPostRequest({ path: '/launches' }),
    response: createCreatedResponse(),
  },
};

// The same Transaction as the guideline wants it.
const createdWithLocation: ObservedTransaction = {
  described: {
    request: createPostRequest({ path: '/launches' }),
    response: createCreatedResponse({
      headers: { location: createRequiredParameter() },
    }),
  },
  actual: { response: { headers: { location: '/launches/11' } } },
};

// GET /launches -> 200 has no Location header either, but is not a creation.
const listedWithoutLocation: ObservedTransaction = {
  described: {
    request: createGetRequest({ path: '/launches' }),
    response: createOkResponse(),
  },
};

describe(rule.meta.name, () => {
  // The fixture bar: one input that must be flagged and one that must pass, in
  // every context the rule declares.
  const fixtures = inDeclaredContexts(rule, {
    violates: { observed: [createdWithoutLocation] },
    conforms: { observed: [createdWithLocation] },
  });

  describe.each(validationContexts)('in %s', (context) => {
    const fixture = fixtures[context];
    if (fixture === undefined) {
      return;
    }

    it.each(['violates', 'conforms'] as const)('%s', async (expected) => {
      const verdict = await checkInput(
        context,
        rule,
        fixture[expected],
        expected,
      );

      expect(verdict.met, verdict.reason).toBe(true);
    });
  });

  // The rule's scope: it judges the 201 and leaves GET -> 200 alone, though
  // that one has no Location header either.
  it.each(validationContexts)(
    'flags the creation and not the listing in %s',
    async (context) => {
      const results = await runInContext(context, rule, {
        observed: [createdWithoutLocation, listedWithoutLocation],
      });

      expect(results.filter((result) => result.violation)).toHaveLength(1);
    },
  );

  // Which of the two rows was flagged? `static` and `test` locate a violation
  // as `{ elementType: 'edge', elementId }`, the id of a Transaction in a
  // Thymian Format that `observed` builds internally and never hands out;
  // `analytics` locates it by a label string. The count above is the strongest
  // assertion a test can make today.
  it.todo('asserts that POST /launches -> 201 is the flagged Transaction');
});
