const { readdir, writeFile,  exists, readFile, mkdir } = require("fs");
const utils = require('util');
const path = require("path");
let readdir_pro = utils.promisify(readdir);
let writeFile_pro = utils.promisify(writeFile);
let exists_pro = utils.promisify(exists);
let readFile_pro = utils.promisify(readFile);
let mkdir_pro = utils.promisify(mkdir);

(async ()=>{
    let db = path.join(__dirname, '../../vn/src/db/');

    try {
        await mkdir_pro(path.join(db , 'online'))
    } catch (error) {
        
    }
    try {
       await mkdir_pro(path.join(db , 'local'))
    } catch (error) {
        
    }

    const paths =[path.join(db , 'local') , path.join(db , 'online')];
    const manifiest = JSON.parse((await readFile_pro(path.join(db , 'manifiest.db.json'))).toString());
    for (let i = 0; i < manifiest.length; i++) {

        if(!await exists_pro(path.join(paths[0] , manifiest[i]))){
            await writeFile_pro(path.join(paths[0] , manifiest[i]), "[]")
        }
        if(!await exists_pro(path.join(paths[1] , manifiest[i]))){
            await writeFile_pro(path.join(paths[1] , manifiest[i]), "[]")
        }  
    }
})()