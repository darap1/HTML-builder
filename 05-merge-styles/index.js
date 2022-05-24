const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'styles');
const fileDist = path.join(__dirname,'project-dist','bundle.css');

const writeToFile = fs.createWriteStream(fileDist); //tast 2


fs.readdir(filePath, { withFileTypes: true },function (err, files) {    //task 3
    files.forEach(file => {
        if (!file.isDirectory()) {
                if(path.extname(file.name).slice(1) === 'css') {
                         fs.ReadStream(path.join(filePath,file.name)).on('data', async (chunk) => {   //2
                                writeToFile.write(chunk);
                         });
                 }
        }
    })
})