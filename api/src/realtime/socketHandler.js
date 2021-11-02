const socketio = require('socket.io');

class SocketIOHandler {
  register(server) {
    const sio = socketio(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    this.io = sio;
  }

  /**
     * Get socket instance
     *
     * @returns {SocketIO}
     * @memberof SocketIOHandler
     */
  getIO() {
    if (!this.io) {
      throw new Error('initialize io module');
    }

    return this.io;
  }
}

const handler = new SocketIOHandler();

module.exports = handler;
