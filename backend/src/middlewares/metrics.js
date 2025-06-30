const client = require('prom-client');
const express = require('express');
const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5]
});

const metricsMiddleware = (req, res, next) => {
    const startEpoch = Date.now();
    res.on('finish', () => {
        const responseTimeInMs = Date.now() - startEpoch;
        httpRequestDurationMicroseconds
            .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
            .observe(responseTimeInMs / 1000);
    });
    next();
};

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

module.exports = { metricsMiddleware, metricsApp: app };
