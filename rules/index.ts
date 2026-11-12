import type { RuleSet } from '@thymian/core';

// The Space Launch System's own API guidelines, loaded by thymian.config.yaml.
// Every `*.rule.ts` next to this file is one rule; tests and test support
// live beside them and are not matched.
export default {
  name: 'space-api',
  pattern: '*.rule.ts',
} satisfies RuleSet;
