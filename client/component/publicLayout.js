import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import history from '../utils/history'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

class PersistentDrawer extends React.Component {
    state = {
        open: false,
        anchor: 'left',
    };
    componentDidMount(){
        let { dispatch } = this.props;
        let cookieArray = document.cookie.split('=')
        if(!_.isEmpty(cookieArray[1])){
            history.push('/dashboard')
            dispatch(actions.setUserLoginStatus(true))
        } else {
            history.push('/login')
            dispatch(actions.setUserLoginStatus(false))
        }
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleChangeAnchor = event => {
        this.setState({
        anchor: event.target.value,
        });
    };
    handleLogout(){
        this.props.dispatch(actions.userLogout())
    }
    render() {
        const { classes, theme, isLogin } = this.props;
        const { anchor, open } = this.state;
        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{ paper: classes.drawerPaper, }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </div>
                <Divider />
                {/* <List>{mailFolderListItems}</List> */}
                <Divider />
                {/* <List>{otherMailFolderListItems}</List> */}
            </Drawer>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                <AppBar
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                        [classes[`appBarShift-${anchor}`]]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        {
                            isLogin ?
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            : <div style={{padding: 24}}/>
                        }
                        <Typography variant="title" color="inherit" style={{flex: 1}} >
                            Ulysses
                        </Typography>
                        {
                            isLogin &&
                            <Button 
                                color="inherit" 
                                style={{paddingRight: 20}}
                                onClick={this.handleLogout.bind(this)}
                            >Logout</Button>
                        }
                    </Toolbar>
                </AppBar>
                {before}
                <main
                    className={classNames(classes.content, classes[`content-${anchor}`], {
                    [classes.contentShift]: open,
                    [classes[`contentShift-${anchor}`]]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.props.children}
                </main>
                {after}
                </div>
            </div>
        );
    }
}


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect((state) => {
    return {
        isLogin: state.common.isLogin
    }
})(withStyles(styles, { withTheme: true })(PersistentDrawer));