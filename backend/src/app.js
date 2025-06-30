require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// const { metricsMiddleware, metricsApp } = require('./middlewares/metrics');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

client.collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});


// Middlewares  
app.use(cors());
app.use(express.json());
// app.use(metricsMiddleware);
app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();

    res.on('finish', () => {
        end({
            method: req.method,
            route: req.route ? req.route.path : req.originalUrl,
            status_code: res.statusCode,
        });
    });

    next();
});



// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/metrics', metricsApp); // Prometheus metrics

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'Backend healthy', uptime: process.uptime() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
