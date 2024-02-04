import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;
const server = express();
// const pathh = path.dirname("F:\MERN Stack\Practice Projects\QR Image Generator\index.js");
var filepath = path.dirname(fileURLToPath(import.meta.url));

server.use(bodyParser.urlencoded({extended:true}));
server.use(express.static("public"));

server.get("/",(req, res)=>{
    res.render("index.ejs",{data:" "});
})
server.post('/submit',(req, res)=>{

    var qr_svg = qr.image(req.body['input'], { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(filepath+"/public/images/"+req.body['input']+'.png'));

    if(!req.body['check']){
        res.render("index.ejs",{ data: "Please Check the Checkbox",});
    }
    else{
        res.render("image.ejs",{ data: req.body['input'],});
    }
})

server.listen(port,()=>{
    console.log("This server is active");
});