const express = require('express')
const pool = require('./db')
const port = process.env.PORT || 5002

const app = express()
app.set('trust proxy', true)

const ipWhitelistMiddleware = async (req, res, next) => {
    const clientIp = req.ip;
    console.log(`IP USER: ${clientIp}`)
    
    try {
      const result = await pool.query('SELECT ip_address FROM whitelist_ips');
      const ipAddresses = result.rows.map(row => row.ip_address);
      
      if (ipAddresses.includes(clientIp)) {
        next();
      } else {
        res.status(403).send('Acesso não autorizado');
      }
    } catch (error) {
      console.error('Erro ao buscar IPs na whitelist:', error);
      res.status(500).send('Erro interno do servidor');
    }
  };

// Endpoint para busca de CEP
app.get('/cep/:id', ipWhitelistMiddleware, async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM ceps WHERE cep = $1', [id]);
      const cep = result.rows[0];
      if (cep) {
        res.json(cep);
      } else {
        res.status(404).send('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      res.status(500).send('Erro interno do servidor');
    }
  });

app.listen(port, () => console.log(`Serviço startado na porta: ${port}`))