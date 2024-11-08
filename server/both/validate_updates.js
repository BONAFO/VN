const args = process.argv.slice(2)[0];
const { readdir, writeFile,  exists, readFile } = require("fs");
const utils = require('util');
const path = require("path");
let readdir_pro = utils.promisify(readdir);
let writeFile_pro = utils.promisify(writeFile);
let exists_pro = utils.promisify(exists);
let readFile_pro = utils.promisify(readFile);


const get_images = async (url = path.join(__dirname , '../../vn/src/local/media/')) => {
    const dir = await readdir_pro(url);
    for (let i = 0; i < dir.length; i++) {
    
        
        if(await isDir(url + dir[i])){
           await get_images(url + dir[i] + "/")
        }else{
        images.push({i : dir[i] , url: url + dir[i]})            
        }
  
        
        
        
    }
    
}

let images_db =[];
const get_db =async ()=>{
    const url = path.join(__dirname , "../../vn/src/db/local/");
    const dir = await read_dir(url);
    for (let i = 0; i < dir.length; i++) {
        const data = JSON.parse((await readFile_pro(url + dir[i])).toString());
        images_db = images_db.concat(data)
        
    }
    
}

(async ()=>{

})()