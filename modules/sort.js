
const db = require("../mongo")

const service = {
    async ascending (req , res){
        try{
            const data = await db.rentalData.find({}).sort({rent:1}).toArray()
            res.send(data)
            // res.send(data)
        }catch(error){
            console.log(error)
        }
       
    },
    async descending (req , res){
        try{
            const data = await db.rentalData.find({}).sort({rent:-1}).toArray()
            res.send(data)
            // res.send(data)
        }catch(error){
            console.log(error)
        }
       
    }
}

module.exports =  service ; 