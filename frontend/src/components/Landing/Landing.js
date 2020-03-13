import React from 'react';
import ProjectCard from '../Profile/ProjectCard'
import axios from 'axios';

class Landing extends React.Component {
  state= {
    projects: []
  }
  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/project/all`)
      .then(res => {
        console.log(res.data)
        this.setState({
          projects: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  displayProject= projects => {
    return projects.map(project =>{
      return <ProjectCard project={project}/>
    })
  }
  render(){
    return(
      <>
      <h1>Landing</h1>
      {this.displayProject(this.state.projects)}
      </>
    )
  }
  
}

export default Landing;