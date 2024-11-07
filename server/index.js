// const bodyParser = require("body-parser");
// const express = require("express");
// const cors = require("cors");


// const app = express();
// const port = 3001;

// app.use(bodyParser.json())
// app.use(cors)

// app.listen(port , ()=>{
//     console.log(`http://localhost:${port}/`);
    
// })
const { log } = require("console");
const { readdir , writeFile} = require("fs");
const utils = require('util');
 let readdir_pro = utils.promisify(readdir); 
 let writeFile_pro = utils.promisify(writeFile); 

 const build_imgs =async ()=>{
    const db_img = await readdir_pro('../vn/build/static/media');
    const final_db_imgs =[];

    const base = "./static/media/";
    const db = "../vn/src/db/";
    for (let i = 0; i < db_img.length; i++) {
        const manifiest = db_img[i].split("__");
        final_db_imgs.push({url :base + db_img[i], manifiest : manifiest.slice(0,manifiest.length -1).join('.') + "."} )
        
    }

    console.log(final_db_imgs);

    const dbs = {};

    for (let i = 0; i < final_db_imgs.length; i++) {
        if(!dbs[final_db_imgs[i].manifiest]){
            dbs[final_db_imgs[i].manifiest] =[];
        }
        dbs[final_db_imgs[i].manifiest].push(final_db_imgs[i].url)

    }

    const keys = Object.keys(dbs);

    for (let i = 0; i < keys.length; i++) {
        await writeFile_pro(db + keys[i] + 'imgs.json', JSON.stringify(dbs[keys[i]]))
        
    }


    
    // await writeFile_pro(db + 'imgs.json', JSON.stringify(final_db_imgs))
}

(async ()=>{
    build_imgs()
    
})()




