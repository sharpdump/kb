const {Pool} = require('pg')
const connStr = 'postgresql://kbuser:j@localhost:5432/kb'
const pool = new Pool({
  connectionString: connStr,
})

pool.on('error', (err, client)=>{
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

(async () => {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT NOW()')
  } finally {
    client.release()
  }
})().catch(e => console.log(e.stack))
