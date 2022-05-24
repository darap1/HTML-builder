const fs = require('fs');
const path = require('path');
const src = path.join(__dirname,'files');
const dist = path.join(__dirname,'filesCopy');



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
    
    
  