const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { response } = require('express');

const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://nodeninja:test12345678@node-ninja.jqk12sf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// listening port
// app.listen(3000);

// middleware 
// app.use((req, res, next) => {
//   console.log('new request was made');
//   console.log(req.hostname);
//   console.log(req.path);
//   console.log(req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('next middleware');
//   next();
// });

// middleware & static file
app.use(express.static('public'));

app.use(morgan('dev'));
// app.use(morgan('tiny'));
app.use(express.urlencoded());


// routing
// app.get('/', (req, res) => {
//   res.send('<p>hellloooooo</p>')
// res.send itu gabungan dari res.write(data) sama res.end()
// });

// register view engine
app.set('view engine', 'ejs');
// app.set('views', './myviews');
// untuk mengganti folder views bisa menggunakan app.set('views', 'directory');

// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'blog snippet',
//     body: 'full body of blog',
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.get('/', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  // res.render akan merender file ejs.
  // path akan langsung mengarah ke folder views
  // folder views merupakan folder defaul tempat menyimpan file ejs

  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  // res.sendFile('./views/blog.html', { root: __dirname });
  res.render('create', { title: 'New Blog' });
});

app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render('details', { blog: result, title: result.title });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Oops!' });
      // bedanya kalau pakai /itu absolute path, kalau gak relative
      console.log(err);
    });
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
