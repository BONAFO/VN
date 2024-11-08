const args = process.argv.slice(2)[0];
const { readdir, writeFile,  exists, readFile } = require("fs");
const utils = require('util');
const path = require("path");
let readdir_pro = utils.promisify(readdir);
let writeFile_pro = utils.promisify(writeFile);
let exists_pro = utils.promisify(exists);
let readFile_pro = utils.promisify(readFile);

(async ()=>{
    const url = path.join(__dirname , '../../vn/src/App.jsx');
    let file = (await readFile_pro(url)).toString();
    const line = ['// import a from "./local/importer"' , 'import a from "./local/importer"'];
    if(args == "de"){
       file = file.replace(line[0], line[1])
    }else if (args == "co"){
        file = file.replace(line[1], line[0])
    }
    
    await writeFile_pro(url, file)
    
})()