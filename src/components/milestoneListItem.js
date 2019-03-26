import React, {Component} from 'react';

class MilestoneListItem extends Component {



    render() {
        const {title, deadline, description} = this.props.milestone;


        return (
            <React.Fragment>
                {title}, {deadline}, {description}
            </React.Fragment>
        );
    }
}

export default MilestoneListItem;
