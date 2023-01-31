const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url } = req;

  res.setHeader('Content-Type', 'text/html');

  let path = './views';
  switch (url) {
    case '/':
      path += '/index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += '/about.html';
      res.statusCode = 200;
      break;
    case '/blog':
      path += '/blog.html';
      res.statusCode = 200;
      break;
      // oh jadi kalau gak di break mah bisa aja jadi /blog.html/404.html
    default:
      path += '/404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      res.statusCode = 500;
    } else {
      res.end(data);
      /**
       * kalau pakai res.write(data).end() gak tahu kenapa gak jalan
       * tapi kalau pakai res.write(data); res.end() jalan
       * res.seHeader ..().end(data) juga jalan
       */
    }
  });

});

server.listen(3000, 'localhost', () => {
  console.log('Server listening on port 3000');
});