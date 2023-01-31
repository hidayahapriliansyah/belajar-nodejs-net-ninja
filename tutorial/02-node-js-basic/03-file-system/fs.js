const fs = require('fs');

// read file
// ini asyncohrounus ya ...
fs.readFile('./docs/blog.txt', (err, data) => {
  if (err) {
    console.log(err);
  }

  console.log(data.toString());
});


// write file
fs.writeFile('./docs/blog2.txt', 'hello, blog2.txt', () => {
  console.log('finish write file');
});

// make and delete directory
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('finish remove directory');
  });
}

// delete file
if(fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('finish deleteme txt');
  })
} else {
  fs.writeFile('./docs/deleteme.txt', '', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('write deleteme.txt');
  })
}