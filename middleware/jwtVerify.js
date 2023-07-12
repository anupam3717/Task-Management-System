require('dotenv').config();
const jwt=require('jsonwebtoken')

const authRequired = (req, res, next) => {
    const bearerHeader=req.headers['authorization']
    if (bearerHeader===undefined)
        return res.status(401).json({ message: 'No token, authorization denied' })

    const token = req.headers["authorization"].split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ mensagem: "Token invalid" });
      }
}

module.exports=authRequired