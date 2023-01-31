const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url } = req;

  let path = './views';
  switch (url) {
    case '/':
      path += '/index.html'; 
      break;
    case '/about':
      path += '/about.html';
      break;
    case '/blog':
      path += '/blog.html';
      break;
      // oh jadi kalau gak di break mah bisa aja jadi /blog.html/404.html
    default:
      path += '/404.html';
      break;
  }

  console.log(path);

  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      res.statusCode = 500;
    } else {
      res.setHeader('Content-Type', 'text/html')
        .end(data);
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