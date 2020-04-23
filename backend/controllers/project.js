const db = require('../models');

const create = async(req, res) => {
  
  const user = req.curUserId;
  const project = {...req.body, user, balance:0};
  console.log(project);

  if (!project.title || !project.content || !project.endDate) {
    return res.status(400).json({message: 'All filed is required'})
  }
  if (project.goal < 0 || project.goal == 0){
    return res.status(400).json({message:'the goal cannot be equal to or smaller than 0'})
  }
 
  try {
    const foundUser = await db.User.findById(user);
    const newProject = await db.Project.create(project);

    foundUser.ownPj.push(newProject);
    const savedUser = await foundUser.save();
    console.log('newPorject',newProject);
    res.status(200).json(newProject)
  } catch (err) {
    
    return res.status(500).json({
      message: 'Something went wrong when creating a new project', err: err
    })
  }
  
}
const update = async(req, res) => {
  try {
    let updatedProject = await db.Project.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('plan').populate('author').populate('category')
    console.log(updatedProject);
    res.status(200).json(updatedProject)
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong when updating project', err:err
    })
  }
}
const show = async(req, res) => {
    
  try {
    let showProject = await db.Project.findById(req.params.id).populate('user').populate('plan');
    console.log(showProject)
    res.status(200).json(showProject)
  } catch (err){
    return res.status(500).json({
      message: 'Something wrong when getting the project', err:err
    })
  }
}
const destroy = async(req, res) => {
  try {
    let foundProject = await db.Project.findById(req.params.id);
    foundProject.plan.forEach(plan => {
      db.Plan.findByIdAndDelete(plan, (err, deletedPlan) =>{
        if(err) return res.status(500).send(err)
      })
    });
    let deletedProject = await db.Project.findByIdAndDelete(req.params.id);
    console.log(deletedProject)
    res.status(200).json({message:'successfully deleted',deletedProject})
  } catch(err) {
    return res.status(500).json({
      message: 'Something wrong when try to delete the project'
    })
  }
}

const showAll = async(req, res) => {
    console.log('hii')
    // console.log('req in show',req);
    // console.log(req.headers);
  try{
    const allProject = await db.Project.find({}).populate('user').populate('plan')
    res.status(200).json(allProject)
  }catch(err){
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong when trying to get all projects'
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



