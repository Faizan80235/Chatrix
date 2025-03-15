
const express = require('express');
const router = express.Router();
const {createMessage,getMessages}=require("../Controller/Message")
router.post("/",createMessage);
router.get("/:sender_id/:receiver_id",getMessages);


module.exports = router;
