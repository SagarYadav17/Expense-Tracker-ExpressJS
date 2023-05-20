const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

function run_query(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}
module.exports = run_query;
