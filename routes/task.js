const express=require('express');
const router=express.Router();
const task=require('../controllers/controller.task');

router.post('/getall',task.getAll);


module.exports=router;