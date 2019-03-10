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
funB = function() {
  sql = 'select * from files;';
  pool.query(sql).then(recs => {
    q=[];
    for(w in recs.rows) {
      j=recs.rows[w];
      if(j['tags']){
        p={c:j['tags'].split('\n'),l:[j['name']]};
        console.log(p);
        q.push(p);
      }
    }
    console.log(q);
  }).catch(e => {console.log(e.stack);});
}
funB();
pool.end();
funA = function(){
	//db schema:file(name, path, tags, hash)
	sql = 'insert into files(name,path,tags,hash) values($1,$2,$3,$4) returning *'
	vals = []
	vals.push(req.query.name)
	vals.push(req.query.path)
	vals.push(req.query.tags)
	vals.push(req.query.hash)
	pool.query(sql,vals).then(qres=>{
		console.log(JSON.stringify(qres.rows[0]))
	}).catch(e=>{
		console.error(e.stack)
	})
};
