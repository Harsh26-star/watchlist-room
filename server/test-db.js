const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(res.rows)
  } finally {
    await pool.end();
  }
}

main();
