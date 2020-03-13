import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from "react-router";
import moment from 'moment';
import ProjectCard from './ProjectCard'

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
        console.log(res.data)
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
        <Container className="mt-5">
          <Row>
            <Col></Col>
            <Col>
              <small className="text-muted">User Info</small>
              <Card style={{ width: '60vw' }}>
                {this.state.user && <Card.Body>
                  <Card.Title>{this.state.user.username}</Card.Title>
                  <Card.Subtitle>{this.state.user.email}</Card.Subtitle>
                  <Card.Text>
                    join Startkicker on {moment(this.state.user.createdAt).subtract(10, 'days').calendar()}
                  </Card.Text>
                  
                </Card.Body>}
                
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Container className="mt-3">
          <Row>
            <Col></Col>
            <Col><small className="text-muted">My Project</small>
              <Card style={{ width: '60vw' }}>
                {(this.state.user&& this.state.user.ownPj) &&this.displayProject(this.state.user.ownPj)}
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Container className="mt-3">
          <Row>
            <Col></Col>
            <Col><small className="text-muted">Project I support(selectPlan)</small>
              <Card style={{ width: '60vw' }}>
                {(this.state.user&& this.state.user.supportPj) &&this.displayProject(this.state.user.supportPj)}
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </>
    )
  }

}


export default withRouter(Profile);