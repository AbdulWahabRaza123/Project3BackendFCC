const express=require('express');
const path=require('path');
const cors=require('cors');
require('./conn');
const model=require('./model');
const staticPath=path.join(__dirname,'./public');
const port=process.env.PORT||8000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(staticPath));
app.get('/',(req,res)=>{
    res.send(url);
})
let count=0;
app.post('/api/shorturl',async(req,res)=>{
    try{
    const urlLink=await req.body.url;
    console.log("URL is ",req.body.url);
    const newUrl = new model({
        url: urlLink,
        shortUrl: count
    })
    const registered = await newUrl.save();
    count++;
    res.status(200).json({original_url:urlLink,short_url:registered.shortUrl });
    }catch(e){
        res.status(400).send("This is error ",e);
    }
});
app.get('/api/shorturl/:num',async(req,res)=>{
try{
    const sUrl=req.params.num;
    let get = await model.findOne({ shortUrl: sUrl });
    res.redirect(get.url);
}
catch(e){
res.json({ error: 'invalid url' });
}
})
app.listen(port,()=>{
    console.log("Listening to port ",port);
})