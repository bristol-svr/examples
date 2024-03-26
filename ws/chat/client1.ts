// const socket = new WebSocket('ws://localhost:8000/chat');
const socket = new WebSocket('ws://localhost:8000/chat', { headers: { token: 'J0xLHhZZRtyOzcdQLY1GQw==' } });

socket.addEventListener('open', () => {
  // subscribe to channel1 by default
  socket.send(JSON.stringify({
    "type": "subscribe",
    "channel": "channel1"
  }));
});

socket.addEventListener('message', (event) => {
  console.log('from server', event.data);
});

socket.addEventListener('close', (event) => {
  console.log('from server', event.code);
});

socket.addEventListener('error', (e) => {
  console.log(e)
})