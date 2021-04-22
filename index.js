var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req,res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
    console.log('Un usuario se ha conectado.');

    var username;
    socket.on('crearUser',function(data){
        username = data;
    });
    socket.on('mjsNuevo',function(data){
        socket.emit('mensaje',{
            usuario: username,
            mensaje: data
        });
    });
});

http.listen(3000, function(){
    console.log("Servidor en marcha por puerto 3000");
});