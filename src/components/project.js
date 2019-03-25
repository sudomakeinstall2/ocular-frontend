import React, { Component } from 'react';

class Project extends Component {
    render() {
        return (
            <div>
                {this.props.project.title}
            </div>
        );
    }

}
export default Project;
