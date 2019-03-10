const express=require('express')
const app=express();

const {Pool} = require('pg')
const strConn = 'postgresql://kbuser:j@localhost:5432/kb'
const pool = new Pool({
	connectionString: strConn,
})
pool.on('error', (err, client)=>{
	console.error('Unexpected error on idle client', err)
})

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello Word'));
app.get('/add_files', (req, res)=>{
	res.setHeader('Content-Type','application/json')
	//db schema:file(name, path, tags, hash)
	sql = 'insert into files(name,path,tags,hash) values($1,$2,$3,$4) returning *'
	vals = []
	vals.push(req.query.name)
	vals.push(req.query.path)
	vals.push(req.query.tags)
	vals.push(req.query.hash)
	pool.query(sql,vals).then(qres=>{
		res.send(JSON.stringify(qres.rows[0]))
	}).catch(e=>{
		//console.error(e.stack)
		res.send(JSON.stringify({err:e.stack}))
	})
/*
	(async () => {
		const client = await pool.connect()
		try {
			const q = await pool.query(sql,vals)
			res.send(JSON.stringify(q.rows[0]))
		} finally {
			client.release()
		}
	})().catch(e=>console.log(e.stack))
i*/
})
app.get('/test', (req,res)=>{
	res.setHeader('Content-Type','application/json')
	res.send(JSON.stringify({res:'ok'}))
	for(n in req.query){
		if(req.query.hasOwnProperty(n)){
			console.log(n+':'+req.query[n]);
		}
	}
});
app.listen(3000, () => console.log('Listen on port 3000'));
