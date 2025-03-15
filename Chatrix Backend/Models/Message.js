
const mongoose=require('mongoose');
const messageSchema= new mongoose.Schema({
    sender_id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    }
})
const Message=new mongoose.model("Message", messageSchema);
module.exports=Message