import React from 'react';

const checkIfUserIsLogin = (Element) => {
  // HoC
  class Wrapper extends React.Component {
    constructor(props) {
      super(props)
      // check if the user is loggedin
      const jwt = localStorage.getItem('jwt');
      if(!jwt){
        this.props.history.push('/login')
      }
    }
    render(){
      return <Element {...this.props}/>
      // return <div>{this.props.children}</div>
    }
  }
  return Wrapper; 
}

export default checkIfUserIsLogin;
// 1. function component
// const Landint = (props) => {
//    return <>{props}</>
// }
// function Landint (props) {
//    return <>{props}</>
// }

// 2. class based Component
// 3. PureComponent *deprecated

// Component types
// A: 1~3: importable pure view component
// B: wrapper/container component
// C: High Order Component(HoC)