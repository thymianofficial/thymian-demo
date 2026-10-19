import { authorize, beforeAll, beforeEach, defineSample } from '@thymian/hooks';

import { basic, emily, john } from './identities.js';

// The handlers check in this order:
//   POST /launches                auth (401) → schema (400) → role (403)
//   /launches/{id}                auth (401) → schema (400) → existence (404) → ownership (403)
//   POST /launches/{id}/crew-...  auth (401) → schema (400) → role (403) → launch exists (404)
//                                 → astronaut exists (400) → already on the crew (409)
//
// Sarah (the default identity) owns every launch created here. Emily is a
// Commander too, so she is refused by ownership, not by role; John is a Pilot,
// so he is refused by role.

/** Falcon 9, from the seed data. A generated `0` matches no rocket type. */
const FALCON_9 = 1;

/** A launch Sarah owns, created once and only ever read or updated in place. */
let launchId = 0;

/** An astronaut already on that launch's crew. */
const CREW_MEMBER = 2;

export const seedLaunch = beforeAll(async (utils) => {
  const created = await utils.request(
    'POST /launches (application/json) -> 201 (application/json)',
    {},
    { authorize: true },
  );

  if (created.statusCode !== 201) {
    throw new Error(
      `Could not seed a launch, the API answered ${created.statusCode}.`,
    );
  }

  launchId = created.body.id;

  const crew = await utils.request(
    'POST /launches/{id}/crew-members (application/json) -> 201',
    { path: { id: launchId }, body: { astronaut_id: CREW_MEMBER } },
    { authorize: true, runHooks: false },
  );

  if (crew.statusCode !== 201) {
    throw new Error(
      `Could not seed a crew member, the API answered ${crew.statusCode}.`,
    );
  }
});

// Every body that has to pass validation names a real rocket type.
export const realRocketType = defineSample(
  [
    'POST /launches (application/json) -> 201 (application/json)',
    'POST /launches (application/json) -> 403',
    'PUT /launches/{id} (application/json) -> 200 (application/json)',
    'PUT /launches/{id} (application/json) -> 403',
  ],
  (draft) => {
    draft.body.mission_name = 'Thymian Demo Mission';
    draft.body.rocket_type_id = FALCON_9;
  },
);

// The seeded launch, for every transaction that needs one to exist.
export const existingLaunch = beforeEach(
  [
    'GET /launches/{id} -> 200 (application/json)',
    'PUT /launches/{id} (application/json) -> 200 (application/json)',
    'PUT /launches/{id} (application/json) -> 403',
    'DELETE /launches/{id} -> 403',
    'GET /launches/{id}/crew-members -> 200 (application/json)',
    'POST /launches/{id}/crew-members (application/json) -> 201',
    'POST /launches/{id}/crew-members (application/json) -> 409',
  ],
  (request) => {
    request.pathParameters.id = launchId;
  },
);

// Bodies that fail validation: a required field is missing.
export const invalidLaunch = defineSample(
  'POST /launches (application/json) -> 400',
  (draft, utils) => {
    utils.setBody({ mission_name: 'No date, no rocket' });
  },
);

export const invalidLaunchUpdate = defineSample(
  'PUT /launches/{id} (application/json) -> 400',
  (draft, utils) => {
    utils.setBody({ mission_name: 'No date, no rocket' });
  },
);

export const invalidCrewMember = defineSample(
  'POST /launches/{id}/crew-members (application/json) -> 400',
  (draft, utils) => {
    utils.setBody({});
  },
);

// Refused by ownership: Emily touches Sarah's launch.
export const notTheOwner = authorize(
  [
    'PUT /launches/{id} (application/json) -> 403',
    'DELETE /launches/{id} -> 403',
  ],
  (request) => {
    request.headers['authorization'] = basic(emily);
  },
);

// Refused by role: John is a Pilot.
export const notACommander = authorize(
  [
    'POST /launches (application/json) -> 403',
    'POST /launches/{id}/crew-members (application/json) -> 403',
  ],
  (request) => {
    request.headers['authorization'] = basic(john);
  },
);

// Deleting spends the launch, so every request deletes one of its own.
export const launchToDelete = beforeEach(
  'DELETE /launches/{id} -> 204',
  async (request, ctx, utils) => {
    const created = await utils.request(
      'POST /launches (application/json) -> 201 (application/json)',
      {},
      { authorize: true },
    );

    if (created.statusCode !== 201) {
      return utils.fail(
        `Could not create a launch to delete, the API answered ${created.statusCode}.`,
      );
    }

    request.pathParameters.id = created.body.id;
  },
);

// A crew slot is spent once filled, so every request adds a fresh astronaut.
export const newCrewMember = beforeEach(
  'POST /launches/{id}/crew-members (application/json) -> 201',
  async (request, ctx, utils) => {
    const created = await utils.request(
      'POST /astronauts (application/json) -> 201 (application/json)',
      {
        body: {
          name: `Crew ${utils.randomString(6)}`,
          password: utils.randomString(16),
          role: 'Specialist',
        },
      },
    );

    if (created.statusCode !== 201) {
      return utils.fail(
        `Could not create a crew member, the API answered ${created.statusCode}.`,
      );
    }

    request.body.astronaut_id = created.body.id;
  },
);

export const alreadyOnTheCrew = defineSample(
  'POST /launches/{id}/crew-members (application/json) -> 409',
  (draft) => {
    draft.body.astronaut_id = CREW_MEMBER;
  },
);
