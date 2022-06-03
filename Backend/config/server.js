const http = require('http');
const p = require('../utils/utils').port;

const server = function(app) {

    const servidor = http.Server(app);
    servidor.listen(p.port, p.hostname, () => {
        console.log(`El servidor se esta ejecutando en http://${p.hostname}:${p.port}/`)
    })

    const io = require('socket.io')(servidor, {
        options: {
            cors: '*'
        }
    });



    io.on('connection', socket => {
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).broadcast.emit('user-connected', userId);

            socket.on('disconnect', () => {
                socket.to(roomId).broadcast.emit('user-disconnected', userId);
            })
        });
    })
};

module.exports = server;