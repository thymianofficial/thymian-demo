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

export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}
export interface AstronautInput {
  name: string
  password: string
  email: string
  role: "Commander" | "Pilot" | "Specialist" | "PayloadMaster"
  [k: string]: unknown
}
export type DeleteAstronautsId204PathParam_Id = number
export type DeleteAstronautsId401PathParam_Id = number
export type DeleteAstronautsId403PathParam_Id = number
export type DeleteAstronautsId404PathParam_Id = number
export type DeleteLaunchesId204PathParam_Id = number
export type DeleteLaunchesId401PathParam_Id = number
export type DeleteLaunchesId403PathParam_Id = number
export type DeleteLaunchesId404PathParam_Id = number
export type GetAstronauts200ApplicationJsonQueryParam_Limit = number
export type GetAstronauts200ApplicationJsonQueryParam_Offset = number
export type GetAstronauts200ApplicationJsonResponseBody = Astronaut[]
export type GetAstronauts401QueryParam_Limit = number
export type GetAstronauts401QueryParam_Offset = number
export type GetAstronautsId200ApplicationJsonPathParam_Id = number
export type GetAstronautsId200ApplicationJsonResponseBody = Astronaut
export type GetAstronautsId401PathParam_Id = number
export type GetAstronautsId404PathParam_Id = number
export type GetLaunches200ApplicationJsonResponseBody = Launch[]
export type GetLaunchesId200ApplicationJsonPathParam_Id = number
export type GetLaunchesId200ApplicationJsonResponseBody = Launch
export type GetLaunchesId401PathParam_Id = number
export type GetLaunchesId404PathParam_Id = number
export type GetLaunchesIdCrewMembers200ApplicationJsonPathParam_Id = number
export type GetLaunchesIdCrewMembers200ApplicationJsonResponseBody = Astronaut[]
export type GetLaunchesIdCrewMembers401PathParam_Id = number
export type GetLaunchesIdCrewMembers404PathParam_Id = number
export type GetRocketTypes200ApplicationJsonResponseBody = RocketType[]
export interface Launch {
  id: number
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  created_by: Astronaut
  [k: string]: unknown
}
export interface LaunchInput {
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  [k: string]: unknown
}
export type PostAstronautsApplicationJson201ApplicationJsonRequestBody = AstronautInput
export type PostAstronautsApplicationJson201ApplicationJsonResponseBody = Astronaut
export type PostAstronautsApplicationJson400RequestBody = AstronautInput
export type PostAstronautsApplicationJson409RequestBody = AstronautInput
export type PostLaunchesApplicationJson201ApplicationJsonRequestBody = LaunchInput
export type PostLaunchesApplicationJson201ApplicationJsonResponseBody = Launch
export type PostLaunchesApplicationJson400RequestBody = LaunchInput
export type PostLaunchesApplicationJson401RequestBody = LaunchInput
export type PostLaunchesApplicationJson403RequestBody = LaunchInput
export type PostLaunchesIdCrewMembersApplicationJson201PathParam_Id = number
export interface PostLaunchesIdCrewMembersApplicationJson201RequestBody {
  astronaut_id: number
}
export type PostLaunchesIdCrewMembersApplicationJson400PathParam_Id = number
export interface PostLaunchesIdCrewMembersApplicationJson400RequestBody {
  astronaut_id: number
}
export type PostLaunchesIdCrewMembersApplicationJson401PathParam_Id = number
export interface PostLaunchesIdCrewMembersApplicationJson401RequestBody {
  astronaut_id: number
}
export type PostLaunchesIdCrewMembersApplicationJson403PathParam_Id = number
export interface PostLaunchesIdCrewMembersApplicationJson403RequestBody {
  astronaut_id: number
}
export type PostLaunchesIdCrewMembersApplicationJson404PathParam_Id = number
export interface PostLaunchesIdCrewMembersApplicationJson404RequestBody {
  astronaut_id: number
}
export type PostLaunchesIdCrewMembersApplicationJson409PathParam_Id = number
export interface PostLaunchesIdCrewMembersApplicationJson409RequestBody {
  astronaut_id: number
}
export type PutAstronautsIdApplicationJson200ApplicationJsonPathParam_Id = number
export type PutAstronautsIdApplicationJson200ApplicationJsonRequestBody = AstronautInput
export type PutAstronautsIdApplicationJson200ApplicationJsonResponseBody = Astronaut
export type PutAstronautsIdApplicationJson400PathParam_Id = number
export type PutAstronautsIdApplicationJson400RequestBody = AstronautInput
export type PutAstronautsIdApplicationJson401PathParam_Id = number
export type PutAstronautsIdApplicationJson401RequestBody = AstronautInput
export type PutAstronautsIdApplicationJson403PathParam_Id = number
export type PutAstronautsIdApplicationJson403RequestBody = AstronautInput
export type PutAstronautsIdApplicationJson404PathParam_Id = number
export type PutAstronautsIdApplicationJson404RequestBody = AstronautInput
export type PutAstronautsIdApplicationJson409PathParam_Id = number
export type PutAstronautsIdApplicationJson409RequestBody = AstronautInput
export type PutLaunchesIdApplicationJson200ApplicationJsonPathParam_Id = number
export type PutLaunchesIdApplicationJson200ApplicationJsonRequestBody = LaunchInput
export type PutLaunchesIdApplicationJson200ApplicationJsonResponseBody = Launch
export type PutLaunchesIdApplicationJson400PathParam_Id = number
export type PutLaunchesIdApplicationJson400RequestBody = LaunchInput
export type PutLaunchesIdApplicationJson401PathParam_Id = number
export type PutLaunchesIdApplicationJson401RequestBody = LaunchInput
export type PutLaunchesIdApplicationJson403PathParam_Id = number
export type PutLaunchesIdApplicationJson403RequestBody = LaunchInput
export type PutLaunchesIdApplicationJson404PathParam_Id = number
export type PutLaunchesIdApplicationJson404RequestBody = LaunchInput
export interface RocketType {
  id: number
  name: string
  [k: string]: unknown
}

/** Every HTTP method the description uses. */
export type Method = "DELETE" | "GET" | "POST" | "PUT";

/** Every status code the description declares. */
export type Status = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409;

/** Every status class the declared statuses fall into. */
export type StatusClass = "2XX" | "4XX";

/** Every path template the description declares, base path included. */
export type Path = "/astronauts" | "/astronauts/{id}" | "/launches" | "/launches/{id}" | "/launches/{id}/crew-members" | "/rocket_types";

/** Every media type a request node declares. */
export type RequestMediaType = "application/json";

/** Every media type a response node declares. */
export type ResponseMediaType = "application/json";

/**
 * Every Transaction the description declares, keyed by its Selector.
 *
 * One key is exactly one Transaction, so a key carries its own status and
 * media types — nothing about a *target* has to be narrowed. What the
 * server answers with is a different question, and `Responses` answers it.
 */
export type Endpoints = {
  "DELETE /astronauts/{id} -> 204": {
    method: "delete";
    operation: "DELETE /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 204;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteAstronautsId204PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 204;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /astronauts/{id} -> 401": {
    method: "delete";
    operation: "DELETE /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 401;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteAstronautsId401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /astronauts/{id} -> 403": {
    method: "delete";
    operation: "DELETE /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 403;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteAstronautsId403PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 403;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /astronauts/{id} -> 404": {
    method: "delete";
    operation: "DELETE /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 404;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteAstronautsId404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /launches/{id} -> 204": {
    method: "delete";
    operation: "DELETE /launches/{id}";
    path: "/launches/{id}";
    status: 204;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteLaunchesId204PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 204;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /launches/{id} -> 401": {
    method: "delete";
    operation: "DELETE /launches/{id}";
    path: "/launches/{id}";
    status: 401;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteLaunchesId401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /launches/{id} -> 403": {
    method: "delete";
    operation: "DELETE /launches/{id}";
    path: "/launches/{id}";
    status: 403;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteLaunchesId403PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 403;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "DELETE /launches/{id} -> 404": {
    method: "delete";
    operation: "DELETE /launches/{id}";
    path: "/launches/{id}";
    status: 404;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": DeleteLaunchesId404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /astronauts -> 200 (application/json)": {
    method: "get";
    operation: "GET /astronauts";
    path: "/astronauts";
    status: 200;
    requestMediaType: "";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    "limit"?: GetAstronauts200ApplicationJsonQueryParam_Limit;
    "offset"?: GetAstronauts200ApplicationJsonQueryParam_Offset;
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: GetAstronauts200ApplicationJsonResponseBody;
    };
  };
  "GET /astronauts -> 401": {
    method: "get";
    operation: "GET /astronauts";
    path: "/astronauts";
    status: 401;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    "limit"?: GetAstronauts401QueryParam_Limit;
    "offset"?: GetAstronauts401QueryParam_Offset;
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /astronauts/{id} -> 200 (application/json)": {
    method: "get";
    operation: "GET /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 200;
    requestMediaType: "";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetAstronautsId200ApplicationJsonPathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: GetAstronautsId200ApplicationJsonResponseBody;
    };
  };
  "GET /astronauts/{id} -> 401": {
    method: "get";
    operation: "GET /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 401;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetAstronautsId401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /astronauts/{id} -> 404": {
    method: "get";
    operation: "GET /astronauts/{id}";
    path: "/astronauts/{id}";
    status: 404;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetAstronautsId404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /launches -> 200 (application/json)": {
    method: "get";
    operation: "GET /launches";
    path: "/launches";
    status: 200;
    requestMediaType: "";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: GetLaunches200ApplicationJsonResponseBody;
    };
  };
  "GET /launches/{id} -> 200 (application/json)": {
    method: "get";
    operation: "GET /launches/{id}";
    path: "/launches/{id}";
    status: 200;
    requestMediaType: "";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetLaunchesId200ApplicationJsonPathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: GetLaunchesId200ApplicationJsonResponseBody;
    };
  };
  "GET /launches/{id} -> 401": {
    method: "get";
    operation: "GET /launches/{id}";
    path: "/launches/{id}";
    status: 401;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetLaunchesId401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /launches/{id} -> 404": {
    method: "get";
    operation: "GET /launches/{id}";
    path: "/launches/{id}";
    status: 404;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetLaunchesId404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /launches/{id}/crew-members -> 200 (application/json)": {
    method: "get";
    operation: "GET /launches/{id}/crew-members";
    path: "/launches/{id}/crew-members";
    status: 200;
    requestMediaType: "";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetLaunchesIdCrewMembers200ApplicationJsonPathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: GetLaunchesIdCrewMembers200ApplicationJsonResponseBody;
    };
  };
  "GET /launches/{id}/crew-members -> 401": {
    method: "get";
    operation: "GET /launches/{id}/crew-members";
    path: "/launches/{id}/crew-members";
    status: 401;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetLaunchesIdCrewMembers401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    "WWW-Authenticate"?: string | string[];
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /launches/{id}/crew-members -> 404": {
    method: "get";
    operation: "GET /launches/{id}/crew-members";
    path: "/launches/{id}/crew-members";
    status: 404;
    requestMediaType: "";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": GetLaunchesIdCrewMembers404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "GET /rocket_types -> 200 (application/json)": {
    method: "get";
    operation: "GET /rocket_types";
    path: "/rocket_types";
    status: 200;
    requestMediaType: "";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body?: unknown;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: GetRocketTypes200ApplicationJsonResponseBody;
    };
  };
  "POST /astronauts (application/json) -> 201 (application/json)": {
    method: "post";
    operation: "POST /astronauts (application/json)";
    path: "/astronauts";
    status: 201;
    requestMediaType: "application/json";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body: PostAstronautsApplicationJson201ApplicationJsonRequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 201;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: PostAstronautsApplicationJson201ApplicationJsonResponseBody;
    };
  };
  "POST /astronauts (application/json) -> 400": {
    method: "post";
    operation: "POST /astronauts (application/json)";
    path: "/astronauts";
    status: 400;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostAstronautsApplicationJson400RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 400;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /astronauts (application/json) -> 409": {
    method: "post";
    operation: "POST /astronauts (application/json)";
    path: "/astronauts";
    status: 409;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostAstronautsApplicationJson409RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 409;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches (application/json) -> 201 (application/json)": {
    method: "post";
    operation: "POST /launches (application/json)";
    path: "/launches";
    status: 201;
    requestMediaType: "application/json";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body: PostLaunchesApplicationJson201ApplicationJsonRequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 201;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: PostLaunchesApplicationJson201ApplicationJsonResponseBody;
    };
  };
  "POST /launches (application/json) -> 400": {
    method: "post";
    operation: "POST /launches (application/json)";
    path: "/launches";
    status: 400;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesApplicationJson400RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 400;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches (application/json) -> 401": {
    method: "post";
    operation: "POST /launches (application/json)";
    path: "/launches";
    status: 401;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesApplicationJson401RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches (application/json) -> 403": {
    method: "post";
    operation: "POST /launches (application/json)";
    path: "/launches";
    status: 403;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesApplicationJson403RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 403;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches/{id}/crew-members (application/json) -> 201": {
    method: "post";
    operation: "POST /launches/{id}/crew-members (application/json)";
    path: "/launches/{id}/crew-members";
    status: 201;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesIdCrewMembersApplicationJson201RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PostLaunchesIdCrewMembersApplicationJson201PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 201;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches/{id}/crew-members (application/json) -> 400": {
    method: "post";
    operation: "POST /launches/{id}/crew-members (application/json)";
    path: "/launches/{id}/crew-members";
    status: 400;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesIdCrewMembersApplicationJson400RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PostLaunchesIdCrewMembersApplicationJson400PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 400;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches/{id}/crew-members (application/json) -> 401": {
    method: "post";
    operation: "POST /launches/{id}/crew-members (application/json)";
    path: "/launches/{id}/crew-members";
    status: 401;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesIdCrewMembersApplicationJson401RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PostLaunchesIdCrewMembersApplicationJson401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches/{id}/crew-members (application/json) -> 403": {
    method: "post";
    operation: "POST /launches/{id}/crew-members (application/json)";
    path: "/launches/{id}/crew-members";
    status: 403;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesIdCrewMembersApplicationJson403RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PostLaunchesIdCrewMembersApplicationJson403PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 403;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches/{id}/crew-members (application/json) -> 404": {
    method: "post";
    operation: "POST /launches/{id}/crew-members (application/json)";
    path: "/launches/{id}/crew-members";
    status: 404;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesIdCrewMembersApplicationJson404RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PostLaunchesIdCrewMembersApplicationJson404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "POST /launches/{id}/crew-members (application/json) -> 409": {
    method: "post";
    operation: "POST /launches/{id}/crew-members (application/json)";
    path: "/launches/{id}/crew-members";
    status: 409;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PostLaunchesIdCrewMembersApplicationJson409RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PostLaunchesIdCrewMembersApplicationJson409PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 409;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /astronauts/{id} (application/json) -> 200 (application/json)": {
    method: "put";
    operation: "PUT /astronauts/{id} (application/json)";
    path: "/astronauts/{id}";
    status: 200;
    requestMediaType: "application/json";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body: PutAstronautsIdApplicationJson200ApplicationJsonRequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutAstronautsIdApplicationJson200ApplicationJsonPathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: PutAstronautsIdApplicationJson200ApplicationJsonResponseBody;
    };
  };
  "PUT /astronauts/{id} (application/json) -> 400": {
    method: "put";
    operation: "PUT /astronauts/{id} (application/json)";
    path: "/astronauts/{id}";
    status: 400;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutAstronautsIdApplicationJson400RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutAstronautsIdApplicationJson400PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 400;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /astronauts/{id} (application/json) -> 401": {
    method: "put";
    operation: "PUT /astronauts/{id} (application/json)";
    path: "/astronauts/{id}";
    status: 401;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutAstronautsIdApplicationJson401RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutAstronautsIdApplicationJson401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /astronauts/{id} (application/json) -> 403": {
    method: "put";
    operation: "PUT /astronauts/{id} (application/json)";
    path: "/astronauts/{id}";
    status: 403;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutAstronautsIdApplicationJson403RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutAstronautsIdApplicationJson403PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 403;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /astronauts/{id} (application/json) -> 404": {
    method: "put";
    operation: "PUT /astronauts/{id} (application/json)";
    path: "/astronauts/{id}";
    status: 404;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutAstronautsIdApplicationJson404RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutAstronautsIdApplicationJson404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /astronauts/{id} (application/json) -> 409": {
    method: "put";
    operation: "PUT /astronauts/{id} (application/json)";
    path: "/astronauts/{id}";
    status: 409;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutAstronautsIdApplicationJson409RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutAstronautsIdApplicationJson409PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 409;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /launches/{id} (application/json) -> 200 (application/json)": {
    method: "put";
    operation: "PUT /launches/{id} (application/json)";
    path: "/launches/{id}";
    status: 200;
    requestMediaType: "application/json";
    responseMediaType: "application/json";
    authorize: boolean;
    req: {
      body: PutLaunchesIdApplicationJson200ApplicationJsonRequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutLaunchesIdApplicationJson200ApplicationJsonPathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 200;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: PutLaunchesIdApplicationJson200ApplicationJsonResponseBody;
    };
  };
  "PUT /launches/{id} (application/json) -> 400": {
    method: "put";
    operation: "PUT /launches/{id} (application/json)";
    path: "/launches/{id}";
    status: 400;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutLaunchesIdApplicationJson400RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutLaunchesIdApplicationJson400PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 400;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /launches/{id} (application/json) -> 401": {
    method: "put";
    operation: "PUT /launches/{id} (application/json)";
    path: "/launches/{id}";
    status: 401;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutLaunchesIdApplicationJson401RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutLaunchesIdApplicationJson401PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 401;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /launches/{id} (application/json) -> 403": {
    method: "put";
    operation: "PUT /launches/{id} (application/json)";
    path: "/launches/{id}";
    status: 403;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutLaunchesIdApplicationJson403RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutLaunchesIdApplicationJson403PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 403;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
  "PUT /launches/{id} (application/json) -> 404": {
    method: "put";
    operation: "PUT /launches/{id} (application/json)";
    path: "/launches/{id}";
    status: 404;
    requestMediaType: "application/json";
    responseMediaType: "";
    authorize: boolean;
    req: {
      body: PutLaunchesIdApplicationJson404RequestBody;
      query?: {
    [query: string]: unknown;
  };
      path?: {
    "id": PutLaunchesIdApplicationJson404PathParam_Id;
    [param: string]: unknown;
  };
      headers?: {
    [header: string]: string | string[] | undefined;
  };
      cookies?: {
    [cookie: string]: unknown;
  };
    };
    res: {
      statusCode: 404;
      headers: {
    [header: string]: string | string[] | undefined;
  };
      body: unknown;
    };
  };
};

/** The address of exactly one Transaction. */
export type Selector = keyof Endpoints;

/**
 * A media type as the wire carries it: the essence, lowercased, with any
 * parameters dropped.
 *
 * A description may declare `application/json; charset=utf-8`, but what a
 * response reports is what actually crossed — the essence — so the
 * declared literal is the wrong discriminator: narrowing on it compiles
 * and then never matches. Normalizing the type is what keeps the two the
 * same string. The declared spelling stays on `responseMediaType`, which
 * is what a Selector is written with.
 *
 * Trimmed as well as lowercased, because the runtime trims: a content key
 * spelled `application/json ; charset=utf-8` reports `application/json`,
 * and typing it one space wider is the same never-matches one space away.
 */
export type WireMediaType<T extends string> =
  T extends `${infer Essence};${string}`
    ? WireMediaType<Essence>
    : T extends ` ${infer Trimmed}` | `${infer Trimmed} `
      ? WireMediaType<Trimmed>
      : Lowercase<T>;

/**
 * One declared response, as a cross-endpoint call sees it: the four fields
 * a caller reads, narrowed by the literal `statusCode` and — where one
 * status declares several media types — by `mediaType`.
 */
export type TransactionResponse<T extends Selector> = {
  statusCode: Endpoints[T]['status'];
  mediaType: WireMediaType<Endpoints[T]['responseMediaType']>;
  headers: Endpoints[T]['res']['headers'];
  body: Endpoints[T]['res']['body'];
};

/**
 * Every response an operation declares, keyed by the request half of its
 * Selectors.
 *
 * A selector initiates a Transaction; it cannot promise the outcome. This is
 * what the server is allowed to answer with — anything else is an
 * `UndeclaredResponseError`.
 */
export type Responses = {
  "DELETE /astronauts/{id}":
    | TransactionResponse<"DELETE /astronauts/{id} -> 204">
    | TransactionResponse<"DELETE /astronauts/{id} -> 401">
    | TransactionResponse<"DELETE /astronauts/{id} -> 403">
    | TransactionResponse<"DELETE /astronauts/{id} -> 404">;
  "DELETE /launches/{id}":
    | TransactionResponse<"DELETE /launches/{id} -> 204">
    | TransactionResponse<"DELETE /launches/{id} -> 401">
    | TransactionResponse<"DELETE /launches/{id} -> 403">
    | TransactionResponse<"DELETE /launches/{id} -> 404">;
  "GET /astronauts":
    | TransactionResponse<"GET /astronauts -> 200 (application/json)">
    | TransactionResponse<"GET /astronauts -> 401">;
  "GET /astronauts/{id}":
    | TransactionResponse<"GET /astronauts/{id} -> 200 (application/json)">
    | TransactionResponse<"GET /astronauts/{id} -> 401">
    | TransactionResponse<"GET /astronauts/{id} -> 404">;
  "GET /launches":
    | TransactionResponse<"GET /launches -> 200 (application/json)">;
  "GET /launches/{id}":
    | TransactionResponse<"GET /launches/{id} -> 200 (application/json)">
    | TransactionResponse<"GET /launches/{id} -> 401">
    | TransactionResponse<"GET /launches/{id} -> 404">;
  "GET /launches/{id}/crew-members":
    | TransactionResponse<"GET /launches/{id}/crew-members -> 200 (application/json)">
    | TransactionResponse<"GET /launches/{id}/crew-members -> 401">
    | TransactionResponse<"GET /launches/{id}/crew-members -> 404">;
  "GET /rocket_types":
    | TransactionResponse<"GET /rocket_types -> 200 (application/json)">;
  "POST /astronauts (application/json)":
    | TransactionResponse<"POST /astronauts (application/json) -> 201 (application/json)">
    | TransactionResponse<"POST /astronauts (application/json) -> 400">
    | TransactionResponse<"POST /astronauts (application/json) -> 409">;
  "POST /launches (application/json)":
    | TransactionResponse<"POST /launches (application/json) -> 201 (application/json)">
    | TransactionResponse<"POST /launches (application/json) -> 400">
    | TransactionResponse<"POST /launches (application/json) -> 401">
    | TransactionResponse<"POST /launches (application/json) -> 403">;
  "POST /launches/{id}/crew-members (application/json)":
    | TransactionResponse<"POST /launches/{id}/crew-members (application/json) -> 201">
    | TransactionResponse<"POST /launches/{id}/crew-members (application/json) -> 400">
    | TransactionResponse<"POST /launches/{id}/crew-members (application/json) -> 401">
    | TransactionResponse<"POST /launches/{id}/crew-members (application/json) -> 403">
    | TransactionResponse<"POST /launches/{id}/crew-members (application/json) -> 404">
    | TransactionResponse<"POST /launches/{id}/crew-members (application/json) -> 409">;
  "PUT /astronauts/{id} (application/json)":
    | TransactionResponse<"PUT /astronauts/{id} (application/json) -> 200 (application/json)">
    | TransactionResponse<"PUT /astronauts/{id} (application/json) -> 400">
    | TransactionResponse<"PUT /astronauts/{id} (application/json) -> 401">
    | TransactionResponse<"PUT /astronauts/{id} (application/json) -> 403">
    | TransactionResponse<"PUT /astronauts/{id} (application/json) -> 404">
    | TransactionResponse<"PUT /astronauts/{id} (application/json) -> 409">;
  "PUT /launches/{id} (application/json)":
    | TransactionResponse<"PUT /launches/{id} (application/json) -> 200 (application/json)">
    | TransactionResponse<"PUT /launches/{id} (application/json) -> 400">
    | TransactionResponse<"PUT /launches/{id} (application/json) -> 401">
    | TransactionResponse<"PUT /launches/{id} (application/json) -> 403">
    | TransactionResponse<"PUT /launches/{id} (application/json) -> 404">;
};
