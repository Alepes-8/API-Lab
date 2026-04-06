
import { httpRequestsTotal, httpRequestDuration, activeRequests } from './metrics.js';

export function metricsMiddleware(req, res, next) {

      // Skip the metrics endpoint itself
    if (req.path === '/metrics') {
        return next();
    }
    
    const start = process.hrtime();

    // Increase active requests
    activeRequests.inc();

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const duration = seconds + nanoseconds / 1e9;

        // Normalize route path to prevent high cardinality
        // Express populates req.route for matched routes
        const route = req.route ? req.route.path : req.path;

        // Record the counter metric
        httpRequestsTotal
            .labels(req.method, route, res.statusCode.toString())
            .inc();

        // Record the histogram metric
        httpRequestDuration
            .labels(req.method, route, res.statusCode.toString())
            .observe(duration);

        // Decrement active requests
        activeRequests.dec();
    });

    next();
}