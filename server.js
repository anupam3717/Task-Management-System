require('dotenv').config();
const express=require('express')
const app=express()
const dbConnection=require('./database/connection')
const userRoute=require('./routes/user')
const auth=require('./middleware/jwtVerify')
const taskRoute=require('./routes/task')

const bodyParesr= require('body-parser');

app.use(bodyParesr.json());
app.use(bodyParesr.urlencoded({ extended: true }));

app.use('/user',userRoute)
app.use('/task',auth,taskRoute)


app.listen(process.env.port,()=>{
    console.log('server is started')
})