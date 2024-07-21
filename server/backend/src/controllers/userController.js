const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


//register
exports.userSignup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(401).json({ message: 'User already registered' });

        const hashedPassword = await hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}


//login
exports.login=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ message:'User not found'});

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message:'wrong password'});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}

exports.ForgetPassword=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const olduser=await userModel.findOne({email});
        if(!olduser){
            return res.status(401).json({ message:'User not found'});
        }
        const secret =process.env.JWT_SECRET +olduser.password;
        const token= jwt.sign({email:olduser.email,id:olduser._id},secret,{
            expiresIn:'5m'
        });
        const link =`http://localhost:5000/<route_name>/${olduser._id}/${token}`
        console.log(link);
    }catch(error){

    }
}