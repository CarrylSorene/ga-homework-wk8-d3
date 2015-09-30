var express = require('express')
var app = express()
var morgan = require('morgan')
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var server = require('http').createServer(app)

var io = require('socket.io')(server)

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', function(req, res) {
  res.render('index')
})

io.on('connection', function(socket){
  socket.on('chat', function(message) { //channel = 'chat' //on = listening for event
    console.log('Receiving')
    console.log(message.messageContent)
    io.emit('chat', { messageReceived: message })
  })
})

server.listen(port, function() {
  console.log('server has started on port %s', port)
})