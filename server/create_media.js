const { readdir, writeFile, readFile, stat, copyFile , mkdir } = require("fs");
const utils = require('util');
const path = require("path");
let readdir_pro = utils.promisify(readdir);
let writeFile_pro = utils.promisify(writeFile);
let readFile_pro = utils.promisify(readFile);
let stat_pro = utils.promisify(stat);
let copyFile_pro = utils.promisify(copyFile);
let mkdir_pro = utils.promisify(mkdir);

let _pro = utils.promisify(readFile);

const images = [];

const read_dir = async (url) => await readdir_pro(url)


const isDir = async (url) => (await stat_pro(url)).isDirectory()


const get_images = async (url = path.join(__dirname , '../vn/src/local/media/')) => {
    const dir = await read_dir(url);
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
    const url = path.join(__dirname , "../vn/src/db/");
    const dir = await read_dir(url);
    for (let i = 0; i < dir.length; i++) {
        const data = JSON.parse((await readFile_pro(url + dir[i])).toString());
        images_db = images_db.concat(data)
        
    }
    
}
 
const copy_img =async()=>{
    const head = "./static/media/";
    const build = path.join(__dirname,'../vn/build/static/media/');
        
    for (let i = 0; i < build.split("\\").length; i++) {
    try {
        await mkdir_pro(path.join((build.split("\\").slice(0,i+1)).join("\\") + "/"))
    } catch (error) {
        
    }
            
    }
    
    for (let i = 0; i < images_db.length; i++) {
        let img_spl = images_db[i].replace(head,"").split(".");
        img_spl = img_spl[0] +'.'+ img_spl[2]
        const found = images.filter(img => img.i == img_spl)[0]
        await copyFile_pro(path.join(found.url),path.join(build,images_db[i].replace(head , "")))
        
        
    }
}

(async () => {
   await get_images()
   console.log(images);
    await get_db()
    console.log(images_db);
    copy_img()
})()