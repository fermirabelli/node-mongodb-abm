const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

var db

MongoClient.connect('mongodb://sa:salmon2@ds023435.mlab.com:23435/abm', (err, database) => {
	
	if (err) return console.log(err)
	db = database
	app.listen(3000, function() {
	  console.log('listening on 3000')
	})
})

/*app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html')
	  // Note: __dirname is the path to your current working directory. Try logging it and see what you get!
	  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})*/

app.get('/', (req, res) => {
	db.collection('ambientes').find().toArray(function(err, result) {
	//console.log(results)
	res.render('index.ejs', {ambientes: result})
  // send HTML file populated with quotes here
})
})

app.post('/ambientes', (req, res) => {
	 db.collection('ambientes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
	console.log(req.body.fechaenvio)
	
    res.redirect('/')
	})
})


//db.collections('quotes').findOneAndUpdate(
  // query, 
  // update, 
  // options,
  // callback
//)
  
  // The first parameter, query, allows us to filter the collection through key-value pairs given to it. 
  // We can filter the quotes collection for "Master Yoda’s" quotes by setting the name to "Yoda". 

app.put('/ambientes', (req, res) => {
  db.collection('ambientes')
  .findOneAndUpdate({nombreambiente: 'Buenos Aires'}, {
    $set: {
      name: req.body.nombreambiente,
      quote: req.body.usuario
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/ambientes', (req, res) => {
  db.collection('ambientes').findOneAndDelete({name: req.body.nombreambiente}, 
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('Se eliminó una entrada de Test')
  })
})