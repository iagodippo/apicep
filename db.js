require('dotenv').config();

const { Pool } = require('pg')
const pool = new Pool({
    url: process.env.DATABASE_URL
})

module.exports = pool