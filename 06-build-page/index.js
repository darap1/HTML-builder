const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'styles');
const fileDist = path.join(__dirname,'project-dist','style.css');
const project_dist = path.join(__dirname,'project-dist');

const writeToFile = fs.createWriteStream(fileDist); //tast 2
fs.promises.mkdir(project_dist , { recursive: true }).catch(console.error);

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

const src = path.join(__dirname,'assets');
const dist = path.join(__dirname,'project-dist','assets');



async function copyDir(src, dist) {
  await fs.promises.mkdir(dist, { recursive: true }).catch(console.error);
   
        for(let file of await fs.promises.readdir(src, {withFileTypes: true})){
         let srcFile =  path.join(src,file.name);
            let distFile = path.join(dist, file.name);
                 if (file.isDirectory()) {
                     copyDir(srcFile + '/', distFile + '/');
                      }
                else {await fs.promises.copyFile(srcFile, distFile, fs.constants.COPYFILE_EXCL);}
         }
   
}

 (async function() { 
    await fs.promises.rm(dist, {recursive: true, force: true}).catch(console.error);
    await copyDir(src, dist);}
  )();


  console.log('Если вас не затруднит ,оставьте пожалуйста свои контакты (discord or telegram), сегодня - завтра доделаю и сразу напишу ');