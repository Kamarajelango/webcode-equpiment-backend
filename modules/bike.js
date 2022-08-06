
const { ObjectId } = require("bson");
const db = require("../mongo")

const service = {
    // gettting bike data
    async bike (req , res){
        try{
            const data = await db.rentalData.find().toArray();
            res.send(data)
        }catch(error){
            console.log(error)
        }
       
    },
    // booking bike
    async bookBike (req,res){
        try{
            const data = await db.rentalData.findOneAndUpdate({_id : ObjectId(req.body._id)},
            {$push:{booking:{...req.body , userId : req.user.user_id, bookId : ObjectId() }}},   {returnDocument:"after"})
            res.send({...data.value , message : "Bike Booked Successfully"})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = service;