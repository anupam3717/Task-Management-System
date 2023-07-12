const express=require('express');
const router=express.Router();
const task=require('../controllers/controller.task');

router.post('/create', task.createTask);
router.get('/gettask',task.getAllTasks)
router.get('/gettaskbyid/:id',task.createTask)
router.put('/update/:id', task.updateTask);
router.delete('/delete/:id', task.deleteTask);



module.exports=router;