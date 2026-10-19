import { authorize, beforeEach, defineSample } from '@thymian/hooks';
import type { HookUtils } from '@thymian/hooks';

import { basic } from './identities.js';

// The handlers check in this order, so a negative status is reached by passing
// every check before it:
//   auth (401) → schema (400) → existence (404) → self-only (403) → email taken (409)

/** Creates an astronaut nobody else knows the password of, and returns how to sign in as them. */
async function createAstronaut(utils: HookUtils) {
  const email = `astronaut-${utils.randomString(8)}@thymian.dev`;
  const password = utils.randomString(16);

  const created = await utils.request(
    'POST /astronauts (application/json) -> 201 (application/json)',
    {
      body: {
        name: `Astronaut ${utils.randomString(6)}`,
        email,
        password,
        role: 'Pilot',
      },
    },
    { runHooks: false },
  );

  if (created.statusCode !== 201) {
    utils.fail(
      `Could not create an astronaut, the API answered ${created.statusCode}.`,
    );
  }

  return { id: created.body.id, email, password };
}

// POST /astronauts ------------------------------------------------------------

// An email can be registered once, so every request claims a fresh one.
export const uniqueEmail = beforeEach(
  'POST /astronauts (application/json) -> 201 (application/json)',
  (request, ctx, utils) => {
    request.body.email = `astronaut-${utils.randomString(8)}@thymian.dev`;
  },
);

export const missingName = defineSample(
  'POST /astronauts (application/json) -> 400',
  (draft, utils) => {
    utils.setBody({
      email: 'no-name@thymian.dev',
      password: 'secret',
      role: 'Pilot',
    });
  },
);

export const emailTaken = beforeEach(
  'POST /astronauts (application/json) -> 409',
  (request) => {
    request.body.email = 'sarah.mitchell@space.org';
  },
);

// GET /astronauts/{id} --------------------------------------------------------

// Sarah is seed data and is never changed by any hook, so she can be read.
export const existingAstronaut = defineSample(
  'GET /astronauts/{id} -> 200 (application/json)',
  (draft) => {
    draft.pathParameters.id = 1;
  },
);

// PUT /astronauts/{id} --------------------------------------------------------

// An astronaut may update only themselves, and the update rewrites the very
// credentials it authenticated with. So each request signs in as a fresh
// astronaut, seeded here because the fixture *is* the credential: a rule that
// probes the unauthenticated case skips this hook and earns a real 401.
export const selfUpdate = authorize(
  'PUT /astronauts/{id} (application/json) -> 200 (application/json)',
  async (request, ctx, utils) => {
    const self = await createAstronaut(utils);

    request.pathParameters.id = self.id;
    request.headers['authorization'] = basic(self);
    request.body = {
      name: 'Renamed Astronaut',
      email: self.email,
      password: self.password,
      role: 'Pilot',
    };
  },
);

export const invalidUpdate = defineSample(
  'PUT /astronauts/{id} (application/json) -> 400',
  (draft, utils) => {
    utils.setBody({ name: 'Missing everything else' });
  },
);

// Sarah tries to update John.
export const updateSomeoneElse = defineSample(
  'PUT /astronauts/{id} (application/json) -> 403',
  (draft) => {
    draft.pathParameters.id = 2;
  },
);

// A fresh astronaut tries to take Sarah's email.
export const updateToTakenEmail = authorize(
  'PUT /astronauts/{id} (application/json) -> 409',
  async (request, ctx, utils) => {
    const self = await createAstronaut(utils);

    request.pathParameters.id = self.id;
    request.headers['authorization'] = basic(self);
    request.body = {
      name: 'Email Thief',
      email: 'sarah.mitchell@space.org',
      password: self.password,
      role: 'Pilot',
    };
  },
);

// DELETE /astronauts/{id} -----------------------------------------------------

// An astronaut may delete only themselves, so the credentials die with the row.
export const selfDelete = authorize(
  'DELETE /astronauts/{id} -> 204',
  async (request, ctx, utils) => {
    const self = await createAstronaut(utils);

    request.pathParameters.id = self.id;
    request.headers['authorization'] = basic(self);
  },
);

// Sarah tries to delete John.
export const deleteSomeoneElse = defineSample(
  'DELETE /astronauts/{id} -> 403',
  (draft) => {
    draft.pathParameters.id = 2;
  },
);
