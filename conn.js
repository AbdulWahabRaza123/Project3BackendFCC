const mongoose = require("mongoose");
url = "mongodb+srv://Raza:03117851141@cluster0.nsaso.mongodb.net/test";
// url = 'mongodb://localhost:27017';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connection is successful");
}).catch((e)=>{
    console.log("no connection");
})