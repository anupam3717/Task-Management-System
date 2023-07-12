require('dotenv').config();
const mongoose=require('mongoose')
url=process.env.db_url

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
  };


mongoose.connect(url,connectionParams)
.then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

module.exports=mongoose.connection