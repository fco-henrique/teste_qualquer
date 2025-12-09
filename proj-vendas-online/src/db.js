const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const config = connectionString 
    ? { connectionString } 
    : { 
        user: "postgres",
        host: "localhost",
        database: "gc",
        password: "h3nr1qu3",
        port: 5432
      };

const pool = new Pool(config);

async function initializeDatabase() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL
      );
    `);
    client.release(); 
    console.log("Tabela 'products' verificada/criada com sucesso.");
  } catch (err) {
    console.error('ERRO: Falha ao inicializar o banco de dados (tabela products):', err.message);
  }
}

initializeDatabase();

module.exports = pool;