const express = require('express');

const app = express();

// listening port
app.listen(3000);

// routing
// app.get('/', (req, res) => {
//   res.send('<p>hellloooooo</p>')
// });

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/blog', (req, res) => {
  res.sendFile('./views/blog.html', { root: __dirname });
});

// redirect
app.get('/about-me', (req, res) => {
  res.redirect('/about');
});

// 404 not found
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});

