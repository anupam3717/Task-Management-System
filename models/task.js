const mongoose= require('mongoose')
const Schema=mongoose.Schema;

const taskSchema=new Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted:{type:Boolean,required:true}
});

const Task=mongoose.model('task',taskSchema);

module.exports = Task;