// metrics.js
import client from 'prom-client';

// Create a Registry to hold all metrics
// Using a custom registry gives you more control over what gets exposed
const register = new client.Registry();

// Add default metrics (CPU, memory, event loop lag, etc.)
// These provide valuable system-level insights out of the box
client.collectDefaultMetrics({ register });

// Counter: Track total HTTP requests
// The labelNames array defines which labels this metric accepts
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Histogram: Track request duration with custom buckets
// Buckets are chosen based on typical web application latencies
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register]
});

// Gauge: Track active requests currently being processed
const activeRequests = new client.Gauge({
  name: 'http_active_requests',
  help: 'Number of active HTTP requests',
  registers: [register]
});

// Gauge: Track database connection pool status
const dbPoolConnections = new client.Gauge({
  name: 'db_pool_connections',
  help: 'Database connection pool status',
  labelNames: ['state'],  // 'active', 'idle', 'waiting'
  registers: [register]
});

// Summary: Track external API call latencies with quantiles
const externalApiLatency = new client.Summary({
  name: 'external_api_duration_seconds',
  help: 'External API call duration',
  labelNames: ['service', 'endpoint'],
  percentiles: [0.5, 0.9, 0.95, 0.99],
  registers: [register]
});

export { register, httpRequestsTotal, httpRequestDuration, activeRequests };