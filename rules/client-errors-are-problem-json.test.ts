import {
  createBadRequestResponse,
  createCreatedResponse,
  createPostRequest,
  createThymianFormatWithTransaction,
} from '@thymian/core-testing';
import {
  checkInput,
  inDeclaredContexts,
  type ObservedTransaction,
  runInContext,
  validationContexts,
} from '@thymian/rules-testing';
import { describe, expect, it } from 'vitest';

import rule from './client-errors-are-problem-json.rule.js';

// POST /astronauts -> 400 as the demo API has it: plain JSON.
const plainJsonError: ObservedTransaction = {
  described: {
    request: createPostRequest({ path: '/astronauts' }),
    response: createBadRequestResponse({ mediaType: 'application/json' }),
  },
  actual: {
    response: { headers: { 'content-type': 'application/json' } },
  },
};

// The same Transaction as Problem Details.
const problemJsonError: ObservedTransaction = {
  described: {
    request: createPostRequest({ path: '/astronauts' }),
    response: createBadRequestResponse({
      mediaType: 'application/problem+json',
    }),
  },
  actual: {
    response: { headers: { 'content-type': 'application/problem+json' } },
  },
};

// POST /astronauts -> 201: plain JSON, and rightly so.
const created: ObservedTransaction = {
  described: {
    request: createPostRequest({ path: '/astronauts' }),
    response: createCreatedResponse({ mediaType: 'application/json' }),
  },
  actual: {
    response: { headers: { 'content-type': 'application/json' } },
  },
};

describe(rule.meta.name, () => {
  const fixtures = inDeclaredContexts(rule, {
    violates: { observed: [plainJsonError] },
    conforms: { observed: [problemJsonError] },
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

  // The rule's scope: a success answered with plain JSON is fine. `test` gets
  // one row per Operation, so the 2xx and the 4xx of POST /astronauts go into
  // two inputs here rather than one list.
  it.each(validationContexts)(
    'leaves a plain JSON success alone in %s',
    async (context) => {
      const results = await runInContext(context, rule, {
        observed: [created],
      });

      expect(results.filter((result) => result.violation)).toHaveLength(0);
    },
  );

  // `static` and `analytics` take both answers of POST /astronauts in one list.
  it.each(['static', 'analytics'] as const)(
    'flags only the error of one Operation in %s',
    async (context) => {
      const results = await runInContext(context, rule, {
        observed: [created, plainJsonError],
      });

      expect(results.filter((result) => result.violation)).toHaveLength(1);
    },
  );

  // `test` cannot: both rows sample the same request, so it cannot tell which
  // row is meant to answer it.
  it('rejects two answers to one Operation in test', async () => {
    await expect(
      runInContext('test', rule, { observed: [created, plainJsonError] }),
    ).rejects.toThrow('give it one row per Operation');
  });

  // For comparison, the `violates` input of `test` written with the context's
  // own fields: a Thymian Format, and a `runRequest` standing in for the
  // server. This is the route for a server whose answer depends on the
  // request, keeps state, or times out.
  it('flags plain JSON from a hand-written server in test', async () => {
    const results = await runInContext('test', rule, {
      format: createThymianFormatWithTransaction(
        createPostRequest({ path: '/astronauts' }),
        createBadRequestResponse({ mediaType: 'application/json' }),
      ),
      runRequest: async () => ({
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        trailers: {},
        duration: 1,
      }),
    });

    expect(results.filter((result) => result.violation)).toHaveLength(1);
  });
});
