const http = require('http');
const { authenticate } = require('./auth');

const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      let credentials = {};
      try {
        credentials = JSON.parse(body);
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid request body\n');
        return;
      }

      if (authenticate(credentials.username, credentials.password)) {
        res.statusCode = 200;
        res.end(`Login successful. Welcome, ${credentials.username}!\n`);
      } else {
        res.statusCode = 401;
        res.end('Invalid username or password\n');
      }
    });
  } else if (req.url === '/about') {
  res.statusCode = 200;
        res.end('About Page\n');
  } else {
    res.statusCode = 200;
    res.end('Hello, this is a basic web app!\n');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
