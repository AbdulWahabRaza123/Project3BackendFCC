const express=require('express');
const path=require('path');
const cors=require('cors');
const url=require('url');
const dns = require("dns");
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
app.post('/api/shorturl',(req,res)=>{
        const urlLink=req.body.url;
        try{
        const urlObject = new URL(urlLink);
        // console.log(urlObject);
        dns.lookup(urlObject.hostname, (err,address,service) => {
            if (err) {
                console.log("Hello error");
                res.status(400).json({ error: 'invalid url' });
            } 
            else{
            console.log("This is address ",address," ",service);
        const newUrl = new model({
        url: urlLink,
        shortUrl: count
    })

    newUrl.save(function(e, data) {
        if (e) {
            res.status(400).json({ error: 'invalid url' });
                 }
                 else{
                    count++;
                    res.status(200).json({original_url:urlLink,short_url:data.shortUrl });
                 }
      });
    
            }
})
        }catch(e){
            res.json({ error: 'invalid url' });
        }
});
app.get('/api/shorturl/:num',async(req,res)=>{
try{
    const sUrl=req.params.num;
    let get = await model.findOne({ shortUrl: sUrl });
    console.log(get);
    res.redirect(get.url);
}
catch(e){
res.status(400).json({ error: 'invalid url' });
}
})
app.listen(port,()=>{
    console.log("Listening to port ",port);
})