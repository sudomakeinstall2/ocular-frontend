import React from 'react';
import axios from 'axios';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            deadline: '',
            cost: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('token');
        axios.post('http://localhost:8000/projects/', this.state).then(
            res => console.log(res)
        )
    }

    render() {
        return (
            <form id="project_form">
                <label>
                    Title:
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}/>
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        form="project_form"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Deadline:
                    <input
                        name="deadline"
                        type="date"
                        value={this.state.deadline}
                        onChange={this.handleChange}/>
                </label>
                <label>
                    Cost:
                    <input
                        name="cost"
                        type="number"
                        value={this.state.cost}
                        onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" onClick={e => this.handleSubmit(e)}/>
            </form>
        );
    }
}
export default ProjectForm;
