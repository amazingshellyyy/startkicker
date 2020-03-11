import React from 'react';
import axios from 'axios';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import { withRouter } from "react-router";
import './Project.css'

class Project extends React.Component {
  state = {
    curProject: {},
    show: false
  }

  componentDidMount(){
    
    const projectId = this.props.match.params.projectId;
    console.log(projectId);
    axios.get(`${process.env.REACT_APP_API_URL}/project/${projectId}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          curProject: res.data
        })
      })
      .catch (err => {
        console.log(err.response)
        this.props.history.push('/');
      })
  }

  handleEdit = event => {
    event.preventDefault();
    console.log('edit')
    this.props.history.push(`/project/${this.props.match.params.projectId}/edit`)
  }
  handleDelete = event => {
    event.preventDefault();
    console.log('delete')
    const projectId = this.props.match.params.projectId;
    axios.delete(`${process.env.REACT_APP_API_URL}/project/${projectId}`,{headers: {"authorization": `bearer ${localStorage.getItem('jwt')}`}})
      .then(res => {
        console.log(res.data)
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  

  handleModal = () => {
    if (this.state.show) {
      this.setState({
        show:false
      })
    }else {
      this.setState({
        show:true
      })
    } 
  }

render(){

  return(
    <Container className="mt-5">
      <Row>
        <Col></Col>
        <Col>
        { (this.state.curProject && this.state.curProject.user)&&  <>
          <h1>{this.state.curProject.title}</h1>
          <p>{this.state.curProject.content}</p>
          <div>{this.state.curProject.goal}</div>
          <div>{this.state.curProject.endDate}</div>
          <div>{this.state.curProject.user.username}</div>
        </> }
        {(this.state.curProject.user&&this.state.curProject.user._id === this.props.curUser)&&<>
        <Button onClick={this.handleEdit}>Edit</Button>
        <Button onClick={this.handleModal}>Delete</Button>
        <Modal className="modal" show={this.state.show} onHide={this.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are trying to delete a project you owned, are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-danger" variant="primary" onClick={this.handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.handleModal}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
        </>}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}
}

export default withRouter(Project);