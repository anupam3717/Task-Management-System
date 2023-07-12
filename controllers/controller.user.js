require('dotenv').config();
const User=require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

signup=async(req,res)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "please provide email and password." })
    }

    const user = await User.findOne({ email }).exec();

    if (user) {
        return res.status(409).json({ message: "email already exists." });;
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashPassword});
        const result = await newUser.save();

        return res.status(201).json({ message: `User created ${email}`, id: result._id });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}


login=async(req,res)=>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "please provide email and password." });
        }

        const foundUser = await User.findOne({ email }).exec();

        if (!foundUser) {
            return res.status(409).json({ message: "No user found." })
        }

        let validUser= await bcrypt.compare(password, foundUser.password);

        if (!validUser) {
            return res.status(401).json({ message: "Invalid Crendentials" });
        }

        return res.status(200).json({
           message: 'login successfully, please use theis token as header',
           token: generateToken(foundUser)
        });

        
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256'
  };
  
  function generateToken(user) {
    const token = jwt.sign({ email: user.email, role: user.role }, secret, jwtConfig);
    return token;
  }

module.exports = { signup,login};