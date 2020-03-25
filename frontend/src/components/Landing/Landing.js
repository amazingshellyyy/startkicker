import React from 'react';
import ProjectCard from '../Profile/ProjectCard'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends React.Component {
  state = {
    projects: []
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/project/all`)
      .then(res => {
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
            <h1 className="display-4">StartKicker</h1>
            <p className="lead">This is place for you to start a kicker project or support other kicker projects! </p>

            <p className="lead">
              <Link to='/create/project'>
                <div className="btn btn-default" role="button">Start a project</div>
              </Link>
            </p>
            <small style={{fontSize:".7rem"}} className="text-muted">This is a kickstarter-clone project run by amazingshellyyy. you can see my repo <a href="https://github.com/amazingshellyyy/startkicker">here</a></small>
          </Container>
        </div>
        <div className="mission pt-5 pb-5">
          <Container>
            <Row className="pt-5">
              <Col sm lg={4} className="text-center mb-5">
                <img className="concept mb-3" src="./idea.svg" />
                <p>Make your ideas come true</p>
                <p className="text-muted content">with StartKicker, your ideas can be visualize and become reality.</p>
              </Col>
              <Col sm lg={4} className="text-center mb-5">
                <img className="concept mb-3" src="./invest.svg" />
                <p>Get support on your dream</p>
                <p className="text-muted content">with StartKicker, your ideas can be visualize and become reality.</p>
              </Col>
              <Col sm lg={4} className="text-center mb-5">
                <img className="concept mb-3" src="./launch.svg" />
                <p>Launch your project and grow big!</p>
                <p className="text-muted content">with StartKicker, your ideas can be visualize and become reality.</p>
              </Col>
            </Row>
            <Row>
              <Col sm></Col>
              <Col sm>
                <div className="text-center">
                  <Link to='/explore'>
                    <div className="btn btn-default" role="button">Explore projects</div>
                  </Link>
                </div>
            </Col>
              <Col sm></Col>
            </Row>
            
          </Container>
        </div>
        <Container className="p-5">
          <h4 className="mb-4 text-center">Explore Projects Here </h4>
          <div>
          {this.displayProject(this.state.projects)}
          </div>
          <Row className="mt-4">
              <Col sm></Col>
              <Col sm>
                <div className="text-center">
                  <Link to='/explore'>
                    <div className="btn btn-default" role="button">more projects</div>
                  </Link>
                </div>
            </Col>
              <Col sm></Col>
            </Row>
        </Container>

      </>
    )
  }

}

export default Landing;