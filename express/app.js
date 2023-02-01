const express = require('express');

const app = express();

// listening port
app.listen(3000);

// routing
// app.get('/', (req, res) => {
//   res.send('<p>hellloooooo</p>')
// res.send itu gabungan dari res.write(data) sama res.end()
// });

// register view engine
app.set('view engine', 'ejs');
// app.set('views', './myviews');
// untuk mengganti folder views bisa menggunakan app.set('views', 'directory');

app.get('/', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  // res.render akan merender file ejs.
  // path akan langsung mengarah ke folder views
  // folder views merupakan folder defaul tempat menyimpan file ejs
  const blogs = [
    { title: 'Blog1', snippet: 'Lorem ipsum dolor sit amet' },
    { title: 'Blog2', snippet: 'Lorem ipsum dolor sit amet' },
    { title: 'Blog3', snippet: 'Lorem ipsum dolor sit amet' },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  // res.sendFile('./views/blog.html', { root: __dirname });
  res.render('create', { title: 'New Blog' });
});

// redirect
// app.get('/about-me', (req, res) => {
//   res.redirect('/about');
// });

// 404 not found
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: 'Oops!' });
});
