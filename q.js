const {Pool} = require('pg')
const connStr = 'postgresql://kbuser:j@localhost:5432/kb'
const pool = new Pool({
  connectionString: connStr,
})

pool.on('error', (err, client)=>{
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.connect((err, client, done) => {
  if(err) throw err

  client.query('SELECT NOW()', (err,res) => {
    done()
    if(err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
})

pool.end()
