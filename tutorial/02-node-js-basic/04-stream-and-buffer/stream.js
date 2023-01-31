const fs = require('fs');

const readStream = fs.createReadStream('./blog.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./blog2.txt');

// readStream.on('data', (chunk) => {
//   console.log('--- NEW CHUNK ---');
//   console.log(chunk);
//   if (fs.existsSync('./blog2.txt')) {
//     writeStream.write('----NEW CHUNK-----');
//     writeStream.write(chunk);
//   }
// });

//  ini sama dengan melakukan hal yang diatas. biar makin mudah
readStream.pipe(writeStream);

