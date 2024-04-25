require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Ajuste para false se não estiver usando SSL
    },
    idleTimeoutMillis: 30000 // Opcional: define o tempo limite para conexões inativas
});

module.exports = pool;
