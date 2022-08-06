
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mail = require("../mail")
const db = require("../mongo")

const service = {
    // registeration flow
    async register (req , res){
        try{
             // check if the user is already registered 
            const data = await db.loginData.findOne({email: req.body.email})
            if(data){
                return res.send("email already registered")
            }else{
                // if not then register the new user
                const salt = await bcrypt.genSalt()
                req.body.password = await bcrypt.hash(req.body.password , salt)
                await db.loginData.insertOne({...req.body , status:"pending"})

                // send email verifying mail
                mail.mailer2(req.body)

                res.send({message : "Registered successfully check your mail to verify"})
            }
        }catch(error){
            console.log(error)
        }
    },

    async login (req , res){
        // login flow
        try{
            // check for the mail
            const user = await db.loginData.findOne({email: req.body.email})
            if (!user){
                return res.send({message : "enter valid email id"})
            }
            // check for the email-verification if pending
            // tell user to verify the mail
            else if(user && user.status==="pending"){
                return res.send({message : "please verify your mail, check your MailBox"})
            }

            // else allow user to log in after checking the padssword
            else{
                const isValid = await bcrypt.compare(req.body.password , user.password)
                if(isValid){
                    const authToken = jwt.sign({user_id : user._id , email: user.email} , "admin123" ,{expiresIn :"24h"})
                    // console.log(authToken)
                    return res.send({authToken , message: "Logged In Successfully" , name : user.name,
                email: user.email , id : user._id})
                }else{
                    res.send({message : "wrong password"})
                }
             }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = service;