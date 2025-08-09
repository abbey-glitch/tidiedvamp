const express = require('express');
const server = express();
server.use(express.json());
const path = require('path')
const fs = require('fs').promises;
const readline = require("readline")
const r1 = readline.createInterface({
                input:process.stdin,
                output:process.stdout
            })

async function promptforFolder(){
    return new Promise((resolve)=>{
        r1.question("enter your folder name: ", (foldername)=>{
            resolve(foldername.trim())
        })
    })
}

// async function startserver() {
    // // endpoint to create directory

server.get('/createfolder', async(req, res)=>{
    const foldername = await promptforFolder()

    const filename = 'index.html'
    const filepath = path.join(foldername, filename)
    try{
        // check if directory exist
        const folder = await fs.mkdir(foldername, {recursive:true})
        
        await fs.writeFile(filepath,  `<h3>Hello</h3>`)
        const stat = await fs.stat(filepath)
        res.send({message:"folder created and file inserted",
            filesize:stat.size
        })
    }catch(err){
        res.status(500).send("unable to create ")
    }
})
// modify the directory
server.get('/modified', async(req, res)=>{
    try{
        const update = await fs.appendFile(filepath, `\n<form action='#'>
            <h3>Register</h3></form>`, {recursive:true})
        res.send("file modified")

    }catch(error){
        res.status(500).send("unable to upload file")
    }
})
// delete the directory endpoint
server.get('/deletefolder', async(req, res)=>{
    try{
    const olddir = path.join(__dirname, foldername)

    await fs.access(olddir)
    //    check if the file no longer exist
    await fs.rm(olddir, {recursive:true, force:true})
    res.send("deleted")

    }catch(error){
        res.status(500).send("no file to delete")
    }
})

server.get('/', async(req, res)=>{

    try {
        const data = await fs.readFile('sample.txt', 'utf-8');
        res.send(data);
    } catch (err) {
        res.status(500).send("Error reading file");
    }
})


server.listen(5000, (err)=>{
    if(err){
        console.log('connection error');
        
    } 
    console.log('connected');
    
})
        // r1.close()
    
// }
// startserver()


