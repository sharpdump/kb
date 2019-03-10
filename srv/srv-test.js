const express=require('express')
const app=express();

const {Pool} = require('pg')
const pool = new Pool({
  connectionString: 'postgresql://kbuser:j@localhost:5432/kb',
});
pool.on('error', (err, client)=>{
  console.err('Unexpected error on idle client', err)
});

app.use(express.static('public'));

app.get('/test', (req, res)=>{
  res.setHeader('Content-Type','application/json');
  res.send('[{"c":["this is paragraph A a first paragraph"," paragraph B"],"l":["abc","cbd","nbcdx"]},{"c":["ok","well","thx"],"l":["xxx"]}]');
});

app.get('/q', (req, res)=>{
  res.setHeader('Content-Type','application/json');
  if(req.query.hasOwnProperty('q') && req.query.hasOwnProperty('f')){
    j=[];
    j.push({c:[req.query['q']],l:[req.query['f']]});
    res.send(JSON.stringify(j));
  }
});
app.get('/query', (req, res)=>{
  res.setHeader('Content-Type','application/json');
  if(req.query.hasOwnProperty('q') && req.query.hasOwnProperty('f')){
    sql="SELECT * FROM files WHERE tags ~ '"+req.query['q']+"'";
    pool.query(sql).then(recs=>{
      q=[];
      for(r in recs.rows) {
        j=recs.rows[r];
        if(j['tags'] && j['name']) {
          p={c:j['tags'].split('\n'),l:[j['name']]}
          q.push(p);
        }
      }
      res.send(JSON.stringify(q));
    }).catch(e=>{
      res.send(JSON.stringify([{c:[e.stack],l:[]}]));
    });
  } else {
    res.send(JSON.stringify([{c:[req.query['q']],l:[req.query['f']]}]));
  }
});
app.listen(3000,()=>{console.log('good')});
