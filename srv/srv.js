const express=require('express')
const app=express();

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello Word'));

app.listen(3000, () => console.log('Listen on port 3000'));
