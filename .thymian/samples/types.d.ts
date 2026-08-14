
/*
 * ========================================================================
 *
 * WARNING: THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
 *
 * Any changes made to this file will be lost if the code is regenerated.
 *
 * ========================================================================
 */


export type HttpRequestTemplate = {
  origin: string;
  path: string;
  pathParameters: Record<string, unknown>;
  method: string;
  query: Record<string, unknown>;
  authorize: boolean;
  bodyEncoding?: string;
  body?: unknown;
  headers: Record<string, unknown>;
  cookies: Record<string, unknown>;
};

export type ThymianHttpTransaction = {
  thymianReq: ThymianHttpRequest;
  thymianReqId: string;
  thymianRes: ThymianHttpResponse;
  thymianResId: string;
  transactionId: string;
  transaction: HttpTransaction;
};

export interface ThymianHttpRequest  {
  host: string;
  port: number;
  protocol: 'http' | 'https';
  path: string;
  method: string;
  headers: Record<string, Parameter>;
  queryParameters: Record<string, Parameter>;
  cookies: Record<string, Parameter>;
  pathParameters: Record<string, Parameter>;
  description?: string;
  bodyRequired?: boolean;
  body?: ThymianSchema;
  mediaType: string;
  encoding?: Encoding;
}

export type Encoding = {
  [propertyName: string]: {
    contentType?: string;
    headers: Record<string, Parameter>;
    serializationStyle: SerializationStyle;
  };
};

export interface ThymianHttpResponse {
  description?: string;
  headers: Record<string, Parameter>;
  mediaType: string;
  statusCode: number;
  schema?: ThymianSchema;
}

export interface HttpTransaction {
}

export type HttpResponse = {
  statusCode: number;
  headers: Record<string, string | string[] | undefined>;
  body?: string;
  bodyEncoding?: string;
  trailers: Record<string, string>;
  duration: number;
};

export type HttpRequest = {
  origin: string;
  path: string;
  method: string;
  bodyEncoding?: string;
  body?: string;
  headers?: Record<string, string | string[] | undefined>;
};


export interface Parameter {
  description?: string;
  required: boolean;
  schema: ThymianSchema;
  contentType?: string;
  style: SerializationStyle;
}

export type Style =
  | 'matrix'
  | 'label'
  | 'form'
  | 'simple'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject';

export interface SerializationStyle {
  explode: boolean;

  style: Style;
}

export type ThymianSchemaType =
  | 'null'
  | 'boolean'
  | 'object'
  | 'array'
  | 'number'
  | 'string'
  | 'integer';

export type ThymianSchema = {
  // Type
  type?: ThymianSchemaType | ThymianSchemaType[];
  const?: unknown;
  enum?: unknown[];

  examples?: unknown[];
  description?: string;
  default?: unknown;

  // Numbers
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;

  // Strings
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
  contentEncoding?: string;
  contentMediaType?: string;

  // Arrays
  prefixItems?: ThymianSchema[];
  items?: ThymianSchema;
  contains?: ThymianSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minContains?: number;
  maxContains?: number;

  // Objects
  properties?: Record<string, ThymianSchema>;
  patternProperties?: Record<string, ThymianSchema>;
  additionalProperties?: ThymianSchema | boolean;
  propertyNames?: ThymianSchema;
  required?: string[];
  minProperties?: number;
  maxProperties?: number;
  dependentSchemas?: Record<string, ThymianSchema>;
  dependentRequired?: Record<string, string[]>;

  allOf?: ThymianSchema[];
  anyOf?: ThymianSchema[];
  oneOf?: ThymianSchema[];
  not?: ThymianSchema;
  if?: ThymianSchema;
  then?: ThymianSchema;
  else?: ThymianSchema;

  unevaluatedProperties?: ThymianSchema | boolean;
  unevaluatedItems?: ThymianSchema | boolean;

  $ref?: string;
  $anchor?: string;

  xml?: {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: string;
    wrapped?: boolean;
  };
};


export type BeforeEachRequestHook = (request: HttpRequestTemplate, context: ThymianHttpTransaction | undefined, utils: HookUtils) => HttpRequestTemplate | Promise<HttpRequestTemplate>;

export type AfterEachRequestHookContext =  {
      requestTemplate: HttpRequestTemplate;
      request: HttpRequest;
      thymianTransaction?: ThymianHttpTransaction;
}

export type AfterEachRequestHook = (response: HttpResponse, context: AfterEachRequestHookContext, utils: HookUtils) => HttpResponse | Promise<HttpResponse>;

export type AuthorizeHook = (response: HttpRequestTemplate, context: ThymianHttpTransaction | undefined, utils: HookUtils) => HttpRequestTemplate | Promise<HttpRequestTemplate>;

export interface HookUtils {
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

  request<R extends keyof Endpoints>(
    req: R,
    args: Endpoints[R]['req'],
    options?: {
      runHooks?: boolean;
      authorize?: boolean;
      forStatusCode?: number;
    }
  ): Promise<Endpoints[R]['res']>;

  randomString(length?: number): string;
}
export type GeneratedSchema1 = number

export type GeneratedSchema2 = number

export type GeneratedSchema3 = "application/json"

export type GeneratedSchema4 = Astronaut[]

export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema5 = "application/json"

export type GeneratedSchema6 = AstronautInput

export interface AstronautInput {
  name: string
  password: string
  email: string
  role: "Commander" | "Pilot" | "Specialist" | "PayloadMaster"
  [k: string]: unknown
}

export type GeneratedSchema7 = "application/json"

export type GeneratedSchema8 = Astronaut

export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema9 = number

export type GeneratedSchema10 = "application/json"

export type GeneratedSchema11 = Astronaut

export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema12 = number

export type GeneratedSchema13 = "application/json"

export type GeneratedSchema14 = AstronautInput

export interface AstronautInput {
  name: string
  password: string
  email: string
  role: "Commander" | "Pilot" | "Specialist" | "PayloadMaster"
  [k: string]: unknown
}

export type GeneratedSchema15 = "application/json"

export type GeneratedSchema16 = Astronaut

export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema17 = number

export type GeneratedSchema18 = "application/json"

export type GeneratedSchema19 = Launch[]

export interface Launch {
  id: number
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  created_by: Astronaut
  [k: string]: unknown
}
export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema20 = "application/json"

export type GeneratedSchema21 = LaunchInput

export interface LaunchInput {
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  [k: string]: unknown
}

export type GeneratedSchema22 = "application/json"

export type GeneratedSchema23 = Launch

export interface Launch {
  id: number
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  created_by: Astronaut
  [k: string]: unknown
}
export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema24 = number

export type GeneratedSchema25 = "application/json"

export type GeneratedSchema26 = Astronaut[]

export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema27 = string

export type GeneratedSchema28 = number

export type GeneratedSchema29 = "application/json"

export interface GeneratedSchema30 {
  astronaut_id: number
  [k: string]: {
    [k: string]: unknown
  }
}

export type GeneratedSchema31 = number

export type GeneratedSchema32 = "application/json"

export type GeneratedSchema33 = Launch

export interface Launch {
  id: number
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  created_by: Astronaut
  [k: string]: unknown
}
export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema34 = number

export type GeneratedSchema35 = "application/json"

export type GeneratedSchema36 = LaunchInput

export interface LaunchInput {
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  [k: string]: unknown
}

export type GeneratedSchema37 = "application/json"

export type GeneratedSchema38 = Launch

export interface Launch {
  id: number
  mission_name: string
  launch_date: string
  rocket_type_id: number
  is_manned: boolean
  created_by: Astronaut
  [k: string]: unknown
}
export interface Astronaut {
  id: number
  name: string
  role_id: number
  email: string
  [k: string]: unknown
}

export type GeneratedSchema39 = number

export type GeneratedSchema40 = "application/json"

export type GeneratedSchema41 = RocketType[]

export interface RocketType {
  id: number
  name: string
  [k: string]: unknown
}

export type Endpoints = 
{
  "GET http://localhost:3000/astronauts": {
    req:
    {
      query?:
      {
        "limit": GeneratedSchema1
        ;
        "offset": GeneratedSchema2
        ;
      }
       & { [query: string]: string | number | boolean }
      path?:
      {
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema3
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema4
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "POST http://localhost:3000/astronauts": {
    req:
    {
      body:
      GeneratedSchema6
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path?:
      {
      }
       & { [param: string]: string | number | boolean }
      headers:
      {
        "content-type": GeneratedSchema5
        ;
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 201;
      headers:
      {
        "content-type": GeneratedSchema7
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema8
    }
    |
    {
      statusCode: 400;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 409;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "GET http://localhost:3000/astronauts/{id}": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema9
        ;
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema10
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema11
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "PUT http://localhost:3000/astronauts/{id}": {
    req:
    {
      body:
      GeneratedSchema14
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema12
        ;
      }
       & { [param: string]: string | number | boolean }
      headers:
      {
        "content-type": GeneratedSchema13
        ;
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema15
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema16
    }
    |
    {
      statusCode: 400;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 403;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 409;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "DELETE http://localhost:3000/astronauts/{id}": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema17
        ;
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 204;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 403;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "GET http://localhost:3000/launches": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path?:
      {
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema18
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema19
    }
  }
  "POST http://localhost:3000/launches": {
    req:
    {
      body:
      GeneratedSchema21
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path?:
      {
      }
       & { [param: string]: string | number | boolean }
      headers:
      {
        "content-type": GeneratedSchema20
        ;
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 201;
      headers:
      {
        "content-type": GeneratedSchema22
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema23
    }
    |
    {
      statusCode: 400;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 403;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "GET http://localhost:3000/launches/{id}/crew-members": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema24
        ;
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema25
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema26
    }
    |
    {
      statusCode: 401;
      headers?:
      {
        "WWW-Authenticate": GeneratedSchema27
        ;
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "POST http://localhost:3000/launches/{id}/crew-members": {
    req:
    {
      body:
      GeneratedSchema30
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema28
        ;
      }
       & { [param: string]: string | number | boolean }
      headers:
      {
        "content-type": GeneratedSchema29
        ;
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 201;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 400;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 403;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 409;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "GET http://localhost:3000/launches/{id}": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema31
        ;
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema32
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema33
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "PUT http://localhost:3000/launches/{id}": {
    req:
    {
      body:
      GeneratedSchema36
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema34
        ;
      }
       & { [param: string]: string | number | boolean }
      headers:
      {
        "content-type": GeneratedSchema35
        ;
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema37
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema38
    }
    |
    {
      statusCode: 400;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 403;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "DELETE http://localhost:3000/launches/{id}": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path:
      {
        "id": GeneratedSchema39
        ;
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 204;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 401;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 403;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    |
    {
      statusCode: 404;
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
  }
  "GET http://localhost:3000/rocket_types": {
    req:
    {
      query?:
      {
      }
       & { [query: string]: string | number | boolean }
      path?:
      {
      }
       & { [param: string]: string | number | boolean }
      headers?:
      {
      }
       & { [param: string]: string | string[] | undefined }
    }
    ,
    res:
    |
    {
      statusCode: 200;
      headers:
      {
        "content-type": GeneratedSchema40
        ;
      }
       & { [param: string]: string | string[] | undefined }
      body:
      GeneratedSchema41
    }
  }
}