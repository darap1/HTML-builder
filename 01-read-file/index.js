const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'text.txt');

fs.ReadStream(filePath).on('data', (chunk)  => process.stdout.write(chunk));