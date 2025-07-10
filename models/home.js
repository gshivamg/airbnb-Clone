const mongoose =require("mongoose");
const favourite = require("./favourite");

const homeSchema=mongoose.Schema({
  houseName:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  rating:{
    type: String,
    required: true
  },
  photoUrl:String,
  description:String
})


homeSchema.pre("findOneAndDelete",async function(next){
  const homeId=this.getQuery()._id;
  await favourite.deleteMany({houseId :homeId});
  next();
})






module.exports=mongoose.model("Home",homeSchema);

/**
 * 
 * 
  all the below feature are provide by mongoose by default we need not to code them any more ..
 * 
 * save()
 * 
 * fetchAll()
 * 
 * findById(homeId)
 * 
 * deleteById(homeId)
 * 
 */

