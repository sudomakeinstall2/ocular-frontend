import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import About from './components/pages/about'
import Projects from './components/projects';
import ProjectForm from './components/projectForm';
import Login from './components/login';
import Register from "./components/register";
import axios from 'axios';
import MilestoneForm from "./components/milestoneForm";
import ProposalForm from "./components/proposalForm";
import Proposals from "./components/proposalList";
import Album from "./components/pages/first";
import ProjectPage from "./components/pages/project"

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
            }} />
    )} />
);

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
        return (
            <Router>
                <div className="App">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <Route path="/" exact render={props => (
                        <React.Fragment>
                            <Album/>
                            {/*<Projects projects={this.state.projects}/>*/}

                            {/*<Proposals project_id={0}/>*/}
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
                    <Route path="/register" render={props => (
                        <React.Fragment>
                            <Register/>
                        </React.Fragment>
                    )}/>
                    <Route path="/project/:id" render={props => (
                        <React.Fragment>
                            <ProjectPage props={props}/>
                        </React.Fragment>
                    )}/>
                    <PrivateRoute path="/add_project" component={ProjectForm}/>
                    <PrivateRoute path="/add_milestone" component={MilestoneForm}/>
                    <PrivateRoute path="/add_proposal" component={ProposalForm}/>
                </div>
            </Router>
        );
    }
}

export default App;
