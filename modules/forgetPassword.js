
const bcrypt = require("bcrypt")
const mail = require("../mail")
const db = require("../mongo")

const service ={
    // checking whether the user is a valid user or not and then allow to 
    // reset him the password
    async reset (req,res){
        try{
            const data = await db.loginData.findOne({email:req.body.email})
            if(data){
                await mail.mailer(req.body)
                return res.send({message : "check your mail"})
            }else{
               return  res.send({message : "entered mail id is wrong"})
            }
        }catch(error){
            console.log(error)
        }
       
    },
    // update  password
    async updatePassword (req,res){
        try{
            // generate the salt for the new password 
            const salt = await bcrypt.genSalt()
            // save new password to that salt
            req.body.newpassword = await bcrypt.hash(req.body.newpassword , salt)
            const data = await db.loginData.findOne({verifyToken:req.body.token})
            if(data){
                await db.loginData.findOneAndUpdate({email:data.email},{$set:{password:req.body.newpassword , verifyToken : undefined}})
                return res.send({message: "password reseted successfully"})
            }else{
                return res.send({ message : "check your link"})
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = service