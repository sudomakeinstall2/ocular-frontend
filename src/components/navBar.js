import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProposalForm from "./proposalForm";
import Login from "./login";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Register from "./register";


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class NavBar extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        is_dialog_open: false,
        tabNumber: 0,
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleOpenDialog = () => {this.setState({is_dialog_open: true})};
    handleCloseDialog = () => {
        this.setState({is_dialog_open: false});
        // window.location.reload();
    };

    handleChangeTab = (event, tabNumber) => {
        this.setState({tabNumber})
    };

    logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const login = (
            <React.Fragment>
                {/*<DialogTitle id="form-dialog-title">Log in</DialogTitle>*/}
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Login onSubmit={this.handleCloseDialog}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{this.handleCloseDialog(false)}} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </React.Fragment>
        );

        const register = (
            <React.Fragment>
                {/*<DialogTitle id="form-dialog-title">Log in</DialogTitle>*/}
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Register onSubmit={this.handleCloseDialog}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{this.handleCloseDialog(false)}} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </React.Fragment>
        );


        const loginOrRegister = (
            <React.Fragment>
                <Button color="inherit" onClick={this.handleOpenDialog}>Login</Button>
                <Dialog
                    open={this.state.is_dialog_open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    {/*<DialogTitle id="form-dialog-title">Log in</DialogTitle>*/}
                    {/*<DialogContent>*/}
                    {/*    <DialogContentText>*/}
                    {/*    </DialogContentText>*/}
                    {/*    <Login/>*/}
                    {/*</DialogContent>*/}
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={()=>{this.handleCloseDialog(false)}} color="primary">*/}
                    {/*        Cancel*/}
                    {/*    </Button>*/}
                    {/*</DialogActions>*/}
                    <AppBar position="static">
                        <Tabs value={this.state.tabNumber} onChange={this.handleChangeTab}>
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    </AppBar>
                    {this.state.tabNumber === 0 && login}
                    {this.state.tabNumber === 1 && register}
                    {/*{value === 1 && Item Two}*/}
                </Dialog>

            </React.Fragment>

        );

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.logout}>Log out</MenuItem>
                {/*<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>*/}
                {/*<MenuItem onClick={this.handleMenuClose}>My account</MenuItem>*/}
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        const renderRightSection = (
          <React.Fragment>
              <div className={classes.sectionDesktop}>
                  {/*<IconButton color="inherit">*/}
                  {/*    <Badge badgeContent={4} color="secondary">*/}
                  {/*        <MailIcon />*/}
                  {/*    </Badge>*/}
                  {/*</IconButton>*/}
                  <IconButton color="inherit">
                      <Badge badgeContent={0} color="secondary">
                          <NotificationsIcon />
                      </Badge>
                  </IconButton>
                  <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                  >
                      <AccountCircle />
                  </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                  <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                      <MoreIcon />
                  </IconButton>
              </div>
          </React.Fragment>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Material-UI
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        {localStorage.getItem("token")? renderRightSection: loginOrRegister}
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
