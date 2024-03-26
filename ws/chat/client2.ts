const socket = new WebSocket('ws://localhost:8000/chat');

socket.addEventListener('open', () => {
  socket.send('from client.');
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