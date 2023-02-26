const mongoose =require("mongoose");
const userSchema = new mongoose.Schema({
    name:String,
    age:String,
    gender:String,
    email:String,
    password:String,
    is_admin:{type:Number,default:0}
},{
    versionKey:false
})
const userModel = mongoose.model('user',userSchema);
module.exports = {userModel}