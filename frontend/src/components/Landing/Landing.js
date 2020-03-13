import React from 'react';
import ProjectCard from '../Profile/ProjectCard'
import axios from 'axios';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Landing extends React.Component {
  state = {
    projects: []
  }
  componentDidMount() {
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

  displayProject = projects => {
    return projects.map(project => {
      return <ProjectCard project={project} />
    })
  }
  render() {
    return (
      <>
        <div className="jumbotron">
          <Container>
          <h1 className="display-4">Welcome to Startkicker</h1>
          <p className="lead">This is place for you to start a kicker project or support other kicker projects! </p>
         
            <p className="lead">
              <Link to='/create/project'>
              <div className="btn btn-primary btn-lg"  role="button">Create NOW</div>
              </Link>
            </p>
            </Container>
        </div>
        <Container>
          <h3>Explore Projects Here </h3>
          {this.displayProject(this.state.projects)}
        </Container>
        
      </>
    )
  }
  
}

export default Landing;