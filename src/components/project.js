import React, { Component } from 'react';

class Project extends Component {
    title = this.props.project.title;
    cost = this.props.project.cost;
    deadline = this.props.project.deadline;

    render() {
        return (
            <tr>
                <td>
                    {this.title}
                </td>
                <td>
                    {this.cost}
                </td>
                <td>
                    {this.deadline}
                </td>
            </tr>
        );
    }

}
export default Project;
