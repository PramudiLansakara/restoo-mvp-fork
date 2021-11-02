const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../../models/user.model');
/**
 * Authenticate an user
 *
 * @param {SocketIO.Socket} socket
 * @param {*} next
 */
const auth = async (socket, next) => {
  try {
    const { token } = socket.handshake.query;

    if (!token) {
      throw new Error('token not found');
    }

    const tokenData = token.split(' ');
    if (tokenData.length < 2) {
      throw new Error('invalid token');
    }

    const [tokenType, jwtToken] = tokenData;

    if (tokenType === 'Bearer') {
      // verify jwt
      const decoded = jwt.verify(jwtToken, config.secret);
      const user = await User.findById(decoded.sub);

      if (!user) {
        throw new Error('user not found');
      }

      socket.user = user;
    } else {
      socket.guestId = token;
    }

    next();
  } catch (error) {
    // log.error('Error authenticating', { error, type: 'socket' });
    next(error);
  }
};

exports.auth = auth;
