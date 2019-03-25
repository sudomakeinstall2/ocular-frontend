import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import About from './components/pages/about'
import Projects from './components/projects';
import ProjectForm from './components/project_form';
import Login from './components/login';
import axios from 'axios';

class App extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.get('http://localhost:8000/projects/').then(
          res => this.setState({projects: res.data})
      )
  }

    render() {
    console.log(this.state.projects);
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={props => (
              <React.Fragment>
                  <ProjectForm/>
                  <Projects projects={this.state.projects}/>
              </React.Fragment>
          )}/>
          <Route path="/about" render={props => (
              <React.Fragment>
                <About/>
              </React.Fragment>
          )}/>
          <Route path="/login" render={props => (
              <React.Fragment>
                  <Login/>
              </React.Fragment>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
