// The identities every hook authenticates as. All three are part of the demo's
// seed data (src/init.sql), so nothing has to be created to sign in.

export type Identity = { email: string; password: string };

/** Commander, id 1 — the run's default identity. */
export const sarah: Identity = {
  email: 'sarah.mitchell@space.org',
  password: 'starlight',
};

/** A second Commander, id 5 — owns nothing the hooks create, so ownership checks refuse her. */
export const emily: Identity = {
  email: 'emily.nakamura@space.org',
  password: 'cosmos',
};

/** A Pilot, id 2 — a lesser role, so role checks refuse him. */
export const john: Identity = {
  email: 'john.chen@space.org',
  password: 'moonbeam',
};

export function basic({ email, password }: Identity): string {
  return `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`;
}
