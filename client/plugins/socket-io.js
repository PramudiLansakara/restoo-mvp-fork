// ~/plugins/socket.io.js
import Vue from 'vue';
import { io } from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

export default ({ store, $config: { socketHost } }) => {
  const socket = io(socketHost, { autoConnect: false });
  Vue.use(VueSocketIOExt, socket, { store });
}
