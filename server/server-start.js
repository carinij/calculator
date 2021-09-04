const app = require('./server.js');

const host = 'localhost';
const port = '3000';

app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});