const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let buzzWordList = {
  'buzzWords' : []
}

  var urlencodedParser = bodyParser.urlencoded ({ extended: true })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })

  app.get('/buzzwords', (req, res) => {
    res.send(buzzWordList);
  })

  app.post('/buzzword', urlencodedParser, (req, res) => {
      buzzWordList.buzzWords.push(req.body);
      console.log(buzzWordList);
      res.send('{"success" : true}');
  })


var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at', host, port);
})