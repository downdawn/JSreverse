var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello world</h1>');
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
    socket.on('chat message', (msg) => {
        console.log('chat message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
