const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'text.txt');

const readline = require('readline');
const rl = readline.createInterface({input: process.stdin,output: process.stdout,});
const fileStream = fs.createWriteStream(filePath);

const created = ()=>{
    console.log(`File created , path ${filePath}`);
    fileStream.end();
    process.exit(0);
}

console.log('Write text:');

rl.on('SIGINT', () => {created()}); //ctrl + c
rl.on('line', (input) => {input === 'exit'?created():fileStream.write(input + '\n');}); // exit or + line