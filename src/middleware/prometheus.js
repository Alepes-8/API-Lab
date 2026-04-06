
import { httpRequestsTotal, httpRequestDuration, activeRequests } from './metrics.js';
httpRequestsTotal.labels('GET', '/init', '200').inc(0);
httpRequestDuration.labels('GET', '/init', '200').observe(0);
activeRequests.set(0);

export function metricsMiddleware(req, res, next) {

      // Skip the metrics endpoint itself
    console.log('metricsMiddleware hit:', req.path)
    if (req.path.endsWith('/metrics')) {
        return next();
    }
    
    const start = process.hrtime();

    // Increase active requests
    activeRequests.inc();
    activeRequests.get().then(data => {
        console.log('Active requests 11:', data.values);
    });

    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const duration = seconds + nanoseconds / 1e9;

        const route = req.route
            ? req.baseUrl + req.route.path
            : req.path;

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