
const db = require("../mongo")
const mail = require("../mail")


const service = {
    // verify mail
    async verifyMail (req , res){
        try{
            const data =  await db.loginData.findOne({verifyToken:req.params.id})
            if(data){
                await db.loginData.findOneAndUpdate({email:data.email},{$set:{status:"verified" , verifyToken : undefined}})
                res.send({message : "you account is verified"})
            }else{
                res.send({message : "something went wrong"} )
            }
        }catch(error){
            console.log(error)
        }
       
    },
   
}

module.exports=service;