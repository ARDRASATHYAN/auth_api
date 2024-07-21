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
//forgetpassword
exports.ForgetPassword=async(req,res,next)=>{
    try {
        const { email } = req.body;
        const oldUser = await userModel.findOne({ email });
        if (!oldUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: '5m'
        });
        const link = `http://localhost:5000/user/reset-password/${oldUser._id}/${token}`;
        console.log(link);

        // // Setup Nodemailer transporter
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail', // Use any service you prefer
        //     auth: {
        //         user: process.env.EMAIL_USER, // Your email id
        //         pass: process.env.EMAIL_PASS // Your email password
        //     }
        // });

        // // Setup email options
        // let mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: oldUser.email, // Send email to the oldUser's email
        //     subject: 'Password Reset',
        //     text: `Click on the following link to reset your password: ${link}`
        // };

        // // Send email
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return res.status(500).json({ message: 'Error sending email' });
        //     }
        //     res.status(200).json({ message: 'Password reset link sent to your email' });
        // });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
//verify the user's identity 
exports.verifyuser=async(req,res,next)=>{
    try {
        const { id, token } = req.params;
        console.log(req.params);
        const oldUser = await userModel.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            res.render("index", { email: verify.email, status: "Not Verified" });
        } catch (error) {
            console.log(error);
            res.send("Not Verified");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

exports.Resetpassword=async(req,res,next)=>{
    try{
        const { id, token } = req.params;
        const { password } = req.body;
      
        const oldUser = await userModel.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        try {
          const verify = jwt.verify(token, secret);
          const encryptedPassword = await hash(password, 10);
          await userModel.updateOne(
            {
              _id: id,
            },
            {
              $set: {
                password: encryptedPassword,
              },
            }
          );
      
          res.render("index", { email: verify.email, status: "verified" });
        } catch (error) {
          console.log(error);
          res.json({ status: "Something Went Wrong" });
        }
    }catch(error){
        
    }
}