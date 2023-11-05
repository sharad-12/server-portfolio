
require('dotenv').config();
const mongoose =require('mongoose');
mongoose.connect(process.env.CONFIG_MONGOOSE).then(()=>{console.log('database connected');}).catch(err=>{console.log(err);})

const schema =new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    date:Date
});

const model =mongoose.model('user',schema);
module.exports =model;