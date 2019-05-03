import React, {Component} from 'react';
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import HorizontalTimeline from "react-horizontal-timeline";
import * as settings from "./config";
import MilestoneForm from "./milestoneForm";



class MilestonesTimeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curIndex: 0,
            previous: -1,
            milestones: [],
            is_dialog_open: false,
        };

    }

    handleOpenDialog = () => {this.setState({is_dialog_open: true})};
    handleCloseDialog = (should_refresh) => {
        this.setState({is_dialog_open: false});
        if (should_refresh){
            this.getData();
        }
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${settings.host}project/${this.props.project_id}/milestones/`).then(
            res => {
                this.setState({
                    milestones: res.data.concat({'title': 'deadline', 'deadline': this.props.project.deadline})}
                    )
            }
        )
    }




    render() {
        const timeline = (
            <div>
                <div style={{ width: '80%', height: '100px', margin: '0 auto' }}>
                    <HorizontalTimeline
                        isOpenEnding={false}
                        index={this.state.curIndex}
                        indexClick={(index) => {
                            this.setState({ curIndex: index, previous: this.state.curIndex });
                        }}
                        values={ this.state.milestones.map(x => x.deadline) } />
                </div>
                <div className='text-center'>
                    {
                        (this.state.milestones.length) ?
                            this.state.milestones[this.state.curIndex].title:
                            0
                    }
                </div>
            </div>
        );

        const dialog = <Dialog
            open={this.state.is_dialog_open}
            onClose={this.handleCloseDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add Milestone</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can add milestone to your project.
                </DialogContentText>
                <MilestoneForm project_id={this.props.project_id} onSubmit={this.handleCloseDialog}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{this.handleCloseDialog(false)}} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>;

        return (
            <React.Fragment>
                <div>
                    <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
                        Milestones
                    </Typography>
                </div>
                {(this.state.milestones.length) ? timeline : <div></div>}
                {console.log(this.props)}
                {this.props.project.owner === localStorage.user_email?
                    <Fab onClick={this.handleOpenDialog} style={{margin: 10}}>
                        <AddIcon/>
                    </Fab>
                    :
                    <div/>
                }
                {dialog}
            </React.Fragment>

        );

    }

}

export default MilestonesTimeline;
