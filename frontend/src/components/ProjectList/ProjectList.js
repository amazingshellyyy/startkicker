import React from 'react';
import ProjectCard from '../Profile/ProjectCard'
import axios from 'axios';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProjectList.css';

class ProjectList extends React.Component {
  state = {
    projects: [],
    index: 0,
    setIndex: 0
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      setIndex: selectedIndex
    })
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/project/all`,{headers: {'Access-Control-Allow-Origin': '*'}})
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
        <Carousel activeIndex={this.index} onSelect={this.handleSelect} >
      <Carousel.Item style={{maxHeight:"60vh"}}>
        <img
          className="d-block w-100"
          src="https://ksr-ugc.imgix.net/assets/028/318/046/bc62ade0cc5dfe6da19cb53fe26268e6_original.png?ixlib=rb-2.1.0&w=700&fit=max&v=1583331815&auto=format&gif-q=50&lossless=true&s=d9ee6d44d4852356456f23a951d27916"
          alt="First slide"
          style={{top:"-10vh"}}
        />
        <Carousel.Caption>
          <h3>Prompt: The Anti-Watch</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{maxHeight:"60vh"}}>
        <img
          className="d-block w-100"
          src="https://ksr-ugc.imgix.net/assets/028/330/460/c539c55d29300f7aaef3c61c47cb0fc7_original.jpg?ixlib=rb-2.1.0&w=680&fit=max&v=1583407239&auto=format&gif-q=50&q=92&s=c3a7888a37ab27ce4627f7968fe0bbb2"
          alt="Second slide"
          style={{top:"-10vh"}}
        />

        <Carousel.Caption>
          <h3>Vasco Backpack For Every Phase Of Your Life 5,000</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{maxHeight:"60vh"}}>
        <img
          className="d-block w-100"
          src="https://ksr-ugc.imgix.net/assets/028/242/847/ff7a4d14026dc0f36cad4ee1f4c482f9_original.png?ixlib=rb-2.1.0&w=680&fit=max&v=1582798910&auto=format&gif-q=50&lossless=true&s=74da3224f5c37d92aaffa92408019251"
          alt="Third slide"
          style={{top:"-10vh"}}
        />

        <Carousel.Caption>
          <h3>EyeRide HUD : Make Your Helmet Smart.</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
       
        <Container className="p-5">
          <h3>Explore Projects Here </h3>
          {this.displayProject(this.state.projects)}
        </Container>

      </>
    )
  }

}

export default ProjectList;