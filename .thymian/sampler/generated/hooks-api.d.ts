/*
 * ========================================================================
 *
 * WARNING: THIS FILE IS GENERATED. DO NOT EDIT.
 *
 * Regenerate it with `thymian sampler sync`, and commit the result: these
 * types are the baseline the drift gate compares against, so an edit here is
 * indistinguishable from the API description having changed.
 *
 * ========================================================================
 */

import type {
  Endpoints,
  Method,
  Path,
  RequestMediaType,
  ResponseMediaType,
  Responses,
  Selector,
  Status,
  StatusClass,
  TransactionResponse,
} from './request-types.js';

export type {
  Endpoints,
  Method,
  Path,
  RequestMediaType,
  ResponseMediaType,
  Responses,
  Selector,
  Status,
  StatusClass,
  TransactionResponse,
};

/**
 * A path glob, by shape: at least one `*`.
 *
 * A string with no `*` is not a `PathGlob`, so it has to be an exact `Path` —
 * which is what keeps a typo'd exact path a compile error while a glob stays a
 * plain string. The shape deliberately never touches the `Path` union;
 * vacuousness is reported by `sampler validate` and fails a run at load.
 *
 * `*` is exactly one path segment and a trailing `**` is one or more, so
 * `/admin/**` is everything *under* `/admin` and not `/admin` itself.
 */
export type PathGlob = `${string}*${string}`;

/** The fields a filter can constrain. Each value is spec-derived and closed. */
export type FilterFields = {
  readonly method?: Method | readonly Method[];
  readonly status?: Status | readonly Status[];
  readonly statusClass?: StatusClass | readonly StatusClass[];
  readonly path?: Path | PathGlob | readonly (Path | PathGlob)[];
  readonly requestMediaType?: RequestMediaType | readonly RequestMediaType[];
  readonly responseMediaType?: ResponseMediaType | readonly ResponseMediaType[];
};

/**
 * Targets a set of Transactions.
 *
 * Fields AND-combine; an array within a field OR-combines. `not` excludes, one
 * level deep by construction.
 */
export type TransactionFilter = FilterFields & {
  readonly not?: FilterFields | readonly FilterFields[];
};

/** What a per-transaction hook is aimed at. */
export type HookTarget = Selector | readonly Selector[] | TransactionFilter;

/** One parameter group of a Transaction's request, as a hook sees it. */
type GroupOf<
  T extends Selector,
  K extends 'query' | 'path' | 'headers' | 'cookies',
> = NonNullable<Endpoints[T]['req'][K]>;

/**
 * The request a hook shapes, for one Transaction.
 *
 * Built field by field rather than by intersecting `Endpoints[T]['req']`. That
 * intersection was wrong in a way the compiler could not warn about: `req.path`
 * is the *path-parameter group*, while the live request's `path` is the URL
 * template — so `path` came out as an object type intersected with a string
 * literal. Assigning the template was a false compile error, and
 * `request.path.id = …` compiled and then threw at run time.
 *
 * Distributive by construction (`T` is naked in the conditional), which is what
 * turns a union of Selectors into a union of requests.
 */
export type RequestForSelector<T> = T extends Selector
  ? {
      /**
       * The method as the description spells it, casing included — which for an
       * OpenAPI document is the lowercase path-item key. The uppercase form
       * lives in `Method` and in Selectors, where it is canonical.
       */
      method: Endpoints[T]['method'];
      /** The path template, with its `{param}` placeholders intact. */
      path: Endpoints[T]['path'];
      origin: string;
      authorize: boolean;
      bodyEncoding?: string;
      pathParameters: GroupOf<T, 'path'>;
      query: GroupOf<T, 'query'>;
      headers: GroupOf<T, 'headers'>;
      cookies: GroupOf<T, 'cookies'>;
    } & BodyOf<T>
  : never;

/**
 * The request a hook shapes, for whatever its target names.
 *
 * An **array of Selectors is the union of its members' requests** — the same
 * safety a single Selector gets, distributed. Only a `TransactionFilter` falls
 * back to `GenericRequest`: a filter's membership is decided at load time
 * against the catalog, so there is no set of Transactions for the compiler to
 * name.
 */
export type RequestOf<T> = T extends Selector
  ? RequestForSelector<T>
  : T extends readonly Selector[]
    ? RequestForSelector<T[number]>
    : GenericRequest;

/**
 * The body field, required exactly when the Transaction requires a body.
 *
 * Declaring it optional unconditionally made the documented mutate-in-place
 * idiom need a non-null assertion — `draft.body!.rank = …` — on every
 * body-touching hook, for a body the description says is always there. An
 * optional property does not satisfy a required one, so the check below lands
 * on the right branch by itself.
 */
type BodyOf<T extends Selector> = Endpoints[T]['req'] extends { body: infer B }
  ? { body: B }
  : { body?: Endpoints[T]['req']['body'] };

/** The request a hook shapes when its target covers more than one Transaction. */
export type GenericRequest = {
  method: string;
  path: Path;
  origin: string;
  authorize: boolean;
  bodyEncoding?: string;
  query: Record<string, unknown>;
  pathParameters: Record<string, unknown>;
  headers: Record<string, string | string[] | undefined>;
  cookies: Record<string, unknown>;
  body?: unknown;
};

/**
 * A recursive partial: objects recurse, arrays and primitives replace whole.
 *
 * Arrays are deliberately not recursed into. "Merge the third element of this
 * list" needs an index the caller cannot know is stable, and a partial element
 * would be an element the schema does not describe.
 */
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/**
 * What a cross-endpoint call may pass for one Transaction.
 *
 * Everything is optional, because the call **overlays** the generated request:
 * what you leave out comes from the description, already shaped by the target's
 * own `defineSample`. Parameter groups merge per key; the body deep-merges,
 * so you state the one field that differs and nothing else.
 *
 * Requiring the full `req` here made the documented seeding idiom —
 * `utils.request(selector, {}, { authorize: true })` — a compile error for
 * every operation with a required body, which is the only kind anyone seeds
 * with.
 */
export type RequestArgsOf<T extends Selector> = {
  body?: DeepPartial<Endpoints[T]['req']['body']>;
  query?: Partial<GroupOf<T, 'query'>>;
  path?: Partial<GroupOf<T, 'path'>>;
  headers?: Partial<GroupOf<T, 'headers'>>;
  cookies?: Partial<GroupOf<T, 'cookies'>>;
};

/**
 * Every response the operation behind `T` declares.
 *
 * A Selector says which Transaction to *initiate*; the server decides which one
 * actually happens. So the answer is a discriminated union over every declared
 * response of that operation — narrow it with `if (res.statusCode === 201)`,
 * and where one status declares several media types, with `res.mediaType`.
 *
 * A status the description never declares is not in this union at all: it
 * throws `UndeclaredResponseError`.
 */
export type ResponsesOf<T extends Selector> = Responses[Endpoints[T]['operation']];

/**
 * The server answered with a status the description never declares for this
 * operation.
 *
 * Not a union member, because the union is what the description promises and
 * this is the case where the promise was broken. Catch it to react, or let it
 * escape: at the transaction boundary it is caught for you, and the transaction
 * is skipped with this seed and its actual status named.
 */
export declare class UndeclaredResponseError extends Error {
  readonly selector: Selector;
  readonly statusCode: number;
  readonly headers: Record<string, string | string[] | undefined>;
  readonly body: unknown;
}

/** The response a hook observes, for one Transaction. Distributive. */
export type ResponseForSelector<T> = T extends Selector
  ? {
      statusCode: Endpoints[T]['res']['statusCode'];
      headers: Record<string, string | string[] | undefined>;
      body?: string;
      bodyEncoding?: string;
      trailers: Record<string, string>;
      duration: number;
    }
  : never;

/** The response a hook observes. An array target unions its members'. */
export type ResponseOf<T> = T extends Selector
  ? ResponseForSelector<T>
  : T extends readonly Selector[]
    ? ResponseForSelector<T[number]>
    : GenericResponse;

/** The response a hook observes when its target covers more than one Transaction. */
export type GenericResponse = {
  statusCode: Status;
  headers: Record<string, string | string[] | undefined>;
  body?: string;
  bodyEncoding?: string;
  trailers: Record<string, string>;
  duration: number;
};

/** Options for a cross-endpoint request. */
export type RequestOptions = {
  /**
   * Run the target's own `beforeEach` → `authorize` → `afterEach` pipeline, so
   * a seeding call behaves like the real run. Default `true`; `false` is the
   * raw-seeding escape, and the way out of a cycle.
   */
  runHooks?: boolean;
  /** Force authorization on or off for this call. */
  authorize?: boolean;
};

/**
 * The typed setters, the file helpers and everything else a hook is handed.
 *
 * Setters write into the same request direct mutation does — a setter is a place
 * for the compiler to know a name and a value type, not a second mechanism.
 */
export interface HookUtils<T = unknown> {
  setHeader(name: string, value: string | string[] | undefined): void;
  setQuery(name: string, value: unknown): void;
  setPathParam(name: string, value: unknown): void;
  setCookie(name: string, value: unknown): void;
  setBody(body: unknown): void;
  setAuthorize(authorize: boolean): void;

  /** Reads a file **beside the hook that asks for it**. */
  readFile(path: string): Uint8Array;
  readText(path: string, encoding?: FileEncoding): string;
  readJson<R = unknown>(path: string): R;

  skip(message: string): never;
  fail(message: string): never;
  info(message: string): void;
  warn(message: string, details?: string): void;
  assertionSuccess(message: string, assertion?: string): void;
  assertionFailure(
    message: string,
    details?: { assertion?: string; expected?: unknown; actual?: unknown },
  ): void;
  timeout(message: string, durationMs: number): void;
  randomString(length?: number): string;

  /**
   * Call another Transaction, addressed by its Selector.
   *
   * `args` overlays the generated request, so state only what differs. The
   * answer is every response that operation declares — branch on
   * `statusCode` — because initiating a Transaction is not the same as
   * getting one. There is no `forStatusCode`: the Selector carries the status
   * you asked for.
   */
  request<R extends Selector>(
    selector: R,
    args?: RequestArgsOf<R>,
    options?: RequestOptions,
  ): Promise<ResponsesOf<R>>;
}

/**
 * The encodings `readText` understands.
 *
 * Spelled out rather than reusing `BufferEncoding`, and `readFile` answers
 * `Uint8Array` rather than `Buffer`, so this surface needs no `@types/node`.
 * A hook file that imports `node:fs` needs it and can add
 * `"types": ["node"]` — the scaffolded tsconfig is the author's from the
 * moment it is written.
 */
export type FileEncoding =
  | 'utf-8'
  | 'utf8'
  | 'ascii'
  | 'latin1'
  | 'base64'
  | 'base64url'
  | 'hex'
  | 'ucs-2'
  | 'utf-16le';

/** What a registration is, opaquely. Export one from a hook file to load it. */
export type HookRegistration = { readonly __hook: unique symbol };

/** What a `beforeAll` may return to be run on close. */
export type CleanupFn = () => void | Promise<void>;

/**
 * Shapes the generated request for a Transaction, at generation time.
 *
 * At most one per Transaction: a second is a conflict, reported at load.
 */
export declare function defineSample<const T extends HookTarget>(
  target: T,
  callback: (draft: RequestOf<T>, utils: HookUtils<T>) => void,
): HookRegistration;

/** Runs before each request of the targeted Transaction(s). */
export declare function beforeEach<const T extends HookTarget>(
  target: T,
  callback: (
    request: RequestOf<T>,
    ctx: unknown,
    utils: HookUtils<T>,
  ) => void | Promise<void>,
): HookRegistration;

/** Runs after each response of the targeted Transaction(s). */
export declare function afterEach<const T extends HookTarget>(
  target: T,
  callback: (
    response: ResponseOf<T>,
    ctx: unknown,
    utils: HookUtils<T>,
  ) => void | Promise<void>,
): HookRegistration;

/**
 * Supplies credentials. `authorize(fn)` is global; `authorize(target, fn)` is
 * targeted and wins for the Transactions it covers.
 *
 * Whether it runs is decided by the run option and the request's own
 * `authorize` flag, so a registered hook is necessary but not sufficient.
 */
export declare function authorize(
  callback: (
    request: GenericRequest,
    ctx: unknown,
    utils: HookUtils,
  ) => void | Promise<void>,
): HookRegistration;
export declare function authorize<const T extends HookTarget>(
  target: T,
  callback: (
    request: RequestOf<T>,
    ctx: unknown,
    utils: HookUtils<T>,
  ) => void | Promise<void>,
): HookRegistration;

/**
 * Runs once before the first request of the run, in registration order. A throw
 * aborts the run. May return a cleanup closure to be run on close.
 */
export declare function beforeAll(
  callback: (utils: HookUtils) => void | CleanupFn | Promise<void | CleanupFn>,
): HookRegistration;

/**
 * Runs on close, together with the cleanups `beforeAll` returned: one
 * reverse-ordered list, best-effort, and only if the run sent a request.
 */
export declare function afterAll(
  callback: (utils: HookUtils) => void | Promise<void>,
): HookRegistration;
