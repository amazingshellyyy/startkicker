import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, ProgressBar } from 'react-bootstrap';
import { withRouter } from "react-router";
import './Project.css'
import PlanList from '../Plan/PlanList';
import moment from 'moment';

const pattern = "[0-9]+".r
class Project extends React.Component {
  state = {
    curProject: {},
    show: false
  }

  componentDidMount() {

    const projectId = this.props.match.params.projectId;
    axios.get(`${process.env.REACT_APP_API_URL}/project/${projectId}`,{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        this.setState({
          curProject: res.data
        })
      })
      .catch(err => {
        this.props.history.push('/');
      })
  }

  handleEdit = event => {
    event.preventDefault();
    this.props.history.push(`/project/${this.props.match.params.projectId}/edit`)
  }
  handleDelete = event => {
    event.preventDefault();
    const projectId = this.props.match.params.projectId;
    axios.delete(`${process.env.REACT_APP_API_URL}/project/${projectId}`, { headers: { "authorization": `bearer ${localStorage.getItem('jwt')}`,'Access-Control-Allow-Origin': '*'} })
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err.response)
      })
  }


  handleModal = () => {
    if (this.state.show) {
      this.setState({
        show: false
      })
    } else {
      this.setState({
        show: true
      })
    }
  }
  handleAddPlan = event => {
    event.preventDefault();
    this.props.history.push(`/create/project/${this.state.curProject._id}/plan`)
  }

  handleBacking = event => {
    event.preventDefault();
    this.props.history.push(this.props.location.pathname.concat(`/plan/checkout`))
  }

  displayPercent = (balance,goal) => {
    return balance/goal*100
  }

  displayButtons=()=>{
    if(this.state.curProject.user && this.state.curProject.user._id === this.props.curUser){
      return (<>
      <Button className="mr-2 " variant="outline-dark" onClick={this.handleEdit}>Edit</Button>
      <Button className="m-2" variant="outline-danger" onClick={this.handleModal}>Delete</Button>
      <Button className="m-2" variant="outline-primary" onClick={this.handleAddPlan}>Add more plans</Button>
      <Modal className="modal" show={this.state.show} onHide={this.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are trying to delete a project you owned, are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" variant="primary" onClick={this.handleDelete}>Delete</Button>
          <Button variant="secondary" onClick={this.handleModal}>Close</Button>
          
        </Modal.Footer>
      </Modal>

    </>)
    } else if (this.state.curProject.backers.indexOf(this.props.curUser) === -1){
      return <Button onClick={this.handleBacking}>Back the Project</Button>
    } else {
      return <Button disabled>You've already back this project</Button>
    }
  }
  

  render() {

    return (
      <>
        {this.state.curProject && <>
          <div className="head">
            <Container>
              <Row>
                <Col>{(this.state.curProject && this.state.curProject.user) && <>
                  <div className="text-center pt-5 pb-5 mb-3">
                    <h3>{this.state.curProject.title}</h3>
                    <Row>
                      <Col sm={8}><img width="100%" src={this.state.curProject.image} /></Col>
                      <Col sm={4} className="text-left">
                        <div className="mb-3">
                          
                          <ProgressBar className="mt-5 mb-3" animated now={this.displayPercent(this.state.curProject.balance, this.state.curProject.goal)} />
                          <h3 className="m-0">${this.state.curProject.balance}</h3>
                          <small className="text-muted">pledged of {this.state.curProject.goal} goal</small>
                        </div>
                        <div className="mb-3">
                          <h3 className="m-0">{this.state.curProject.backersNum}</h3>
                          <small className="text-muted">backers</small>
                        </div>
                        <div className="mb-3">
                          <h3 className="m-0">{moment(this.state.curProject.endDate).fromNow()}</h3>
                          <small className="text-muted">time till end</small>
                        </div>


                        {/* <div>{this.state.curProject.user.username}</div> */}
                        <div className="mt-5">
                          {this.displayButtons()}</div>
                      </Col>



                    </Row>
                  </div>

                </>}
                </Col>
              </Row>
            </Container>
          </div>
          <Container className="pt-5">
            <Row>
              <Col sm={8}>
              <h3>Our Story</h3>
              <p className="text-justify">{this.state.curProject.content}</p></Col>
              <Col sm={4}>
                <Container>
                  <Row>
                    <Col>
                      <Row>
                        
                        <Col>{(this.state.curProject && this.state.curProject.user) &&
                          <Card style={{ width: '20rem', margin: "10px" }}>
                            <Card.Body>
                              <small className="text-muted">About the Creater</small>
                              <Card.Title>{this.state.curProject.user.username}</Card.Title>
                            </Card.Body>
                          </Card>
                        }</Col>
                        
                      </Row>
                    </Col>
                  </Row>
                </Container>
                {(this.state.curProject.plan && this.state.curProject.plan.length !== 0) && <PlanList plans={this.state.curProject.plan} curUser={this.props.curUser} />}
                {this.state.curProject.plan && this.state.curProject.plan.length == 0 && (this.props.curUser === this.state.curProject.user._id) && <Button onClick={this.handleAddPlan}>Add Plans</Button>}
              </Col>
            </Row>
          </Container>
        </>}

      </>
    )
  }
}

export default withRouter(Project);