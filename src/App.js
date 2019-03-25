import React, { Component } from 'react';
import './App.css';
import Projects from './components/projects';

class App extends Component {
  state = {
    projects: [
      {
        id: 1,
        title: 'p1'
      },
      {
        id: 2,
        title: 'p2'
      }
    ]
  };

  render() {
    console.log(this.state.projects);
    return (
      <div className="App">
        <Projects projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;
