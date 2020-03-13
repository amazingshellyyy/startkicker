const db = require('../models');

const create = async(req, res) => {
  
  const user = req.curUserId;
  const plan = {...req.body, user};
  delete plan._id
  console.log(plan);
  console.log(plan.project)

  if (!plan.price || !plan.subtitle || !plan.content || !plan.estDelivery || !plan.project ) {
    return res.status(400).json({message: 'All filed is required'})
  }
  if (plan.price < 0 || plan.price == 0){
    return res.status(400).json({message:'the price cannot be equal to or smaller than 0'})
  }

  try {
    console.log(plan.project)
    const foundProject = await db.Project.findById(plan.project);
    const newPlan = await db.Plan.create(plan);
    console.log('foundProject',foundProject);
    foundProject.plan.push(newPlan._id)
    const savedProject = await foundProject.save();
    console.log(newPlan);
    res.status(200).json(newPlan)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong when creating a new plan', err: err
    })
  }
  
}
const update = async(req, res) => {
  try {
    let updatedPlan = await db.Plan.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(updatedPlan);
    res.status(200).json(updatedPlan)
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong when updating plan', err:err
    })
  }
}
const show = async(req, res) => {
  try {
    let showPlan = await db.Plan.findById(req.params.id);
    console.log(showPlan)
    res.status(200).json(showPlan)
  } catch (err){
    return res.status(500).json({
      message: 'Something wrong when getting the plan', err:err
    })
  }
}
const destroy = async(req, res) => {
  try {
    let deletedPlan = await db.Plan.findByIdAndDelete(req.params.id)
    console.log(deletedPlan)
    res.status(200).json({message:'successfully deleted',deletedPlan})
  } catch(err) {
    return res.status(500).json({
      message: 'Something wrong when try to delete the plan'
    })
  }
}
const showAll = async(req, res) => {
  console.log(req.params.projectId);
  try {
    const foundPlans = await db.Plan.find({project: req.params.projectId});
    res.status(200).json(foundPlans)
    

  } catch(err) {
    return res.status(500).json({
      message: 'Something wrong when try to get plans within this project'
    })
  }
}


module.exports = {
  create,
  update,
  show,
  destroy,
  showAll
}
