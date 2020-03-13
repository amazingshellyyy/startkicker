const db = require('../models');

const create = async(req, res) => {
  
  
}
const update = async(req, res) => {
  
}
const show = async(req, res) => {
  console.log(req.params.id)
  try{
    const foundUser = await db.User.findById(req.params.id).populate('ownPj').populate('supportPj').populate('selectPlan').deepPopulate('selectPlan.project');
    console.log(foundUser);
    res.status(200).json(foundUser)

  } catch (err){
    res.status(500).json({
      message:'something went wrong when tyr to get user profile',
      err:err
    })
  }
}
const destroy = async(req, res) => {
  
}



module.exports = {
  
  show
  
}
