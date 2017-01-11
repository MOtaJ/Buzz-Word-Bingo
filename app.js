const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

let buzzWordList = {
  "buzzwords": []
}

let score = 0;
let heard = false;

console.log(buzzWordList);

  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
  })

  app.get('/buzzwords', (req, res, next) => {
    res.send(buzzWordList);
  })

  app.post('/buzzword', (req, res, next) => {
      buzzWordList.buzzwords.push(req.body);
      res.send('{"success" : true}');
  })

 app.put('/buzzword', (req, res, next) => {
  let reqBody = req.body;
  console.log(reqBody);
  for(var i = 0; i < buzzWordList.buzzwords.length; i++){
    if(buzzWordList.buzzwords[i].buzzword === reqBody.buzzword){
      let currentPoints = parseInt(buzzWordList.buzzwords[i].points);
      let newPoints = parseInt(reqBody.points);
      buzzWordList.buzzwords[i].points = currentPoints + newPoints;
        buzzWordList.buzzwords[i].heard = true;
      res.send(`{ "success": "true", newScore: ${buzzWordList.buzzwords[i].points} }`);
      }
    }
  });

 app.delete('/buzzword', (req, res, next) => {
  for(let i = 0; i < buzzWordList.buzzwords.length; i++){
    if(buzzWordList.buzzwords[i].buzzword === req.body.buzzword){
      buzzWordList.buzzwords.splice(i, 1);
      res.send('{"success": true}');
    }
  }
 });

 function reset(){
  buzzWordList.buzzwords.points = 0;
  buzzWordList.buzzwords = [];
 }

 app.post('/reset', (req, res, next) => {
   reset();
   res.send('{"success": true}');
 })


var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at', host, port);
})