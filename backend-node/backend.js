const express = require('express')
const { Pool } = require('pg');
const cors = require('cors');
const app = express()
const port = 8090

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'database',
  password: 'caio',
  port: 5432,
});

app.use(express.json());
app.use(cors()); // TODO: change cors params

app.get('/users', async (req, res) => {

  try {
    const query = `
      SELECT * FROM users;
    `;

    const { rows } = await pool.query(query);
    console.log(rows);
    res.status(201).json(rows);
    return result.rows;
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
})

app.post('/user', async (req, res) => {
    const { username, password } = req.body;
     
    console.log(req.body);

    if (!username) {
      return res.status(400).json({ error: "Missing username"});
    }

    if (!password) {
      return res.status(400).json({ error: "Missing password"});
    }
  
    try {
      const query = `
        SELECT id, name FROM users WHERE username = $1 AND userpassword = $2
      `;

      const values = [username, password];
  
      const { rows } = await pool.query(query, values);
      console.log(rows);
      res.status(201).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json(error);
    }
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})