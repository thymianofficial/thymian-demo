import type { Parameter } from '@thymian/core';
import type { ObservedTransaction } from '@thymian/rules-testing';

// Test support for the space-api rules: Transactions of the Space Launch System
// API, as its OpenAPI document describes them.
//
// `ObservedTransaction['described']` takes the full Thymian Format nodes, so
// every field the format requires has to be spelled out here once, even the
// ones no rule of ours looks at (label, sourceName, cookies, ...).

type Described = ObservedTransaction['described'];

export type DescribedOptions = {
  /** The response headers the specification declares, by name. */
  responseHeaders?: string[];
  /** The response media type the specification declares; none by default. */
  responseMediaType?: string;
  secured?: boolean;
};

export function described(
  method: string,
  path: string,
  statusCode: number,
  options: DescribedOptions = {},
): Described {
  const { responseHeaders = [], responseMediaType = '', secured } = options;

  return {
    request: {
      type: 'http-request',
      label: `${method} ${path}`,
      sourceName: 'space-api-tests',
      protocol: 'http',
      host: 'localhost',
      port: 3000,
      path,
      method,
      headers: {},
      queryParameters: {},
      cookies: {},
      pathParameters: {},
      mediaType: '',
    },
    response: {
      type: 'http-response',
      label: String(statusCode),
      sourceName: 'space-api-tests',
      statusCode,
      headers: Object.fromEntries(
        responseHeaders.map((name) => [name, stringHeader]),
      ),
      mediaType: responseMediaType,
    },
    secured,
  };
}

const stringHeader: Parameter = {
  required: true,
  schema: { type: 'string' },
  style: { style: 'simple', explode: false },
};
