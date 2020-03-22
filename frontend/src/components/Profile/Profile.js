import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from "react-router";
import moment from 'moment';
import ProjectCard from './ProjectCard';
import {Link} from 'react-router-dom';

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user:{},
    }
  }
  

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${this.props.match.params.userId}`)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  displayProject=projects=> {
    return projects.map(project => {
      return <ProjectCard key={project._id} project={project} selectPlan={this.state.user.selectPlan}/>
    })
  }

  render() {
    return (
      <>
      <div style={{minHeight:"86vh"}}>
        <Container className="mt-5">
          <Row>
            <Col xs={1}></Col>
            <Col xs={10}>
              <small className="text-muted">User Info</small>
              <Card >
                {this.state.user && <Card.Body>
                 
                  <Card.Title>{this.state.user.username}</Card.Title>
                  <Card.Subtitle>{this.state.user.email}</Card.Subtitle>
                  <small className="text-muted mt-3">
                    join Startkicker on {moment(this.state.user.createdAt).subtract(10, 'days').calendar()}
                  </small>
                  
                </Card.Body>}
                
              </Card>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
        <Container className="mt-3">
          <Row>
            <Col xs={1}></Col>
            <Col xs={10}><small className="text-muted">My Project</small>
              <Card >
                {(this.state.user&& this.state.user.ownPj) &&this.displayProject(this.state.user.ownPj)}
                {(this.state.user.ownPj && this.state.user.ownPj.length == 0) && <Link to='/create/project'><div className="btn btn-primary m-5">Create a Project</div></Link>}
              </Card>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
        <Container className="mt-3 mb-3">
          <Row>
            <Col xs={1}></Col>
            <Col xs={10}><small className="text-muted">Project I support(selectPlan)</small>
              <Card >
                {(this.state.user&& this.state.user.supportPj) &&this.displayProject(this.state.user.supportPj)}
                {(this.state.user.supportPj && this.state.user.supportPj.length == 0) && <Link to='/'><div className="btn btn-default m-5">Explore Projects now</div></Link>}
              </Card>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
        </div>
      </>
    )
  }

}


export default withRouter(Profile);