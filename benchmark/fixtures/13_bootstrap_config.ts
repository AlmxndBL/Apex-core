export const BOOTSTRAP_CONFIG = {
  app: {
    name: 'apex-console',
    locale: 'th-TH',
    fallbackLocale: 'en-US',
    features: {
      auditTrail: true,
      billingPortal: true,
      experimentalSearch: false,
    },
  },
  http: {
    baseURL: '/api/v1',
    timeoutMs: 15_000,
    retry: { maxAttempts: 3, backoff: 'exponential', jitter: true },
    headers: { 'X-Client': 'console-web', 'X-Trace': 'baggage' },
  },
  theme: {
    defaultMode: 'system',
    radiusScale: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem' },
    surfaces: {
      canvas: '#fafafa',
      card: '#ffffff',
      elevated: '#ffffff',
    },
  },
  tableDefaults: {
    pageSize: 20,
    pageSizes: [10, 20, 50],
    density: 'compact',
    stickyHeader: true,
  },
};

export type BootstrapConfig = typeof BOOTSTRAP_CONFIG;

export function resolveFeatureFlags(config: BootstrapConfig = BOOTSTRAP_CONFIG) {
  return Object.entries(config.app.features).flatMap(([flag, enabled]) => (enabled ? [flag] : []));
}
