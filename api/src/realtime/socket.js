const handler = require('./socketHandler');

const io = handler.getIO();
const { auth } = require('./middlewares/auth');

io.use(auth);

io.on('connection', (socket) => {
  socket.on('admin-join', () => {
    try {
      if (!socket.user) {
        throw new Error('user not found');
      }
      if (socket.user.role === 'admin') {
        socket.join('admin');
        console.log('joined to admin room');
      } else {
        throw new Error('not an admin role');
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('admin-response', (response, userToken) => {
    try {
      if (!userToken) {
        throw new Error('token not set');
      }
      socket.to(userToken).emit('requestStatus', { userToken, response });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('table-scan', (tableId, requestType) => {
    try {
      if (!socket.user && !socket.guestId) {
        throw new Error('user/guest token not set');
      }

      const userId = socket.user ? socket.user.id : socket.guestId;

      socket.join(userId);
      socket
        .to('admin')
        .emit('newTableRequest', { userId, tableId, requestType });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('new-order', (order) => {
    try {
      if (!socket.user && !socket.guestId) {
        throw new Error('user/guest token not set');
      }

      const userId = socket.user ? socket.user.id : socket.guestId;

      socket.join(userId);
      console.log(order);
      socket
        .to('admin')
        .emit('newOrder', { userId, order});
    } catch (error) {
      console.log(error);
    }
  });
});
