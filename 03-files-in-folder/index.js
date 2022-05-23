const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'secret-folder\\');


fs.readdir(filePath, { withFileTypes: true },function (err, files) {
        files.forEach(file => {
            if (!file.isDirectory()) {
                fs.stat(filePath + file.name, (err, stats) => {
                    console.log(file.name.split('.')[0], path.extname(file.name).slice(1),stats.size);//callback for stats
                });
            }
        });
    });