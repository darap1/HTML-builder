const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'styles');
const fileDist = path.join(__dirname,'project-dist','style.css');
const project_dist = path.join(__dirname,'project-dist');

//styles
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

//assets
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

//html
  (async function () {
  const components = path.join(__dirname, 'components') 
  const elements = (await  fs.promises.readdir(components, {withFileTypes: true}))
    .filter((el) => {
        return path.extname(el.name).toLowerCase() === '.html';
    })
    .map(el => {
        return el.name;
    });
   let  template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8'); 
   for (const elem of elements) {
      const oldElem= new RegExp(`{{${elem.replace(/\.[^/.]+$/, '')}}}`, 'g');// место фрагмента
      const newElem = await fs.promises.readFile(path.join(components, elem), 'utf-8'); 
      template = template.replace(oldElem, newElem);     // замена фрагментов
    }
        await fs.promises.writeFile(path.join(project_dist, 'index.html'), template)
    })();
