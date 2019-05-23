import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RecentActorsIcon from "@material-ui/icons/RecentActorsOutlined";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import BugReportIcon from "@material-ui/icons/BugReportOutlined";
import LocalHospitalIcon from "@material-ui/icons/LocalHospitalOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import PeopleIcon from "@material-ui/icons/PeopleTwoTone";
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Content from "./ContentController";
import { AsyncStorage } from 'AsyncStorage';

import { Icon_Flag_BG, Icon_Flag_BR } from "material-ui-country-flags";




const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    // backgroundColor: "rgb("+0+","+56+","+69+")"
  },
  drawerOpen: {
    // backgroundColor: "rgb("+0+","+56+","+69+")",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    // backgroundColor: "rgb("+0+","+56+","+69+")",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  userNameView: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  userName: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px"
  },
  personIcon: {
    marginTop: 0
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb("+0+","+56+","+69+")"
  },
  rootToolbar: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  //  backgroundColor: "rgb("+0+","+56+","+69+")"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  // toolbarIcon: {
  //   backgroundColor: "white",
  // },
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      openToolbarNested: false,
      openToolbarNestedConfig: false,
      renderContent: false,
      adminToken: "",
      adminName: "",
      adminLastName: "",
    };
    this._renderContent = this._renderContent.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
  }

  componentDidMount() {
    const AdminParams = this.props.AdminParams
        console.log(AdminParams)
  }
  
    _retrieveData = async () => {
      try {
        const AdminParams = this.props.location.AdminParams
        console.log(AdminParams)
      } catch (error) {
        console.log(error)
      }
    };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickNestedToobar = () => {
    this.setState(state => ({ openToolbarNested: !state.openToolbarNested }));
  };
  handleClickNestedToobarConfig = () => {
    this.setState(state => ({ openToolbarNestedConfig: !state.openToolbarNestedConfig }));
  };

  _renderContent = () => {
    this.setState({renderContent: true});
    console.log(this.state.renderContent)
  }
  render() {
    const { classes, theme } = this.props;

    const primary = blue[500]
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.menu}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              Guardões da Saúde
            </Typography>

            <div className={classNames(classes.userNameView)}>
              <Typography
                variant="h8"
                color="inherit"
                className={classNames(classes.userName)}
              >
                {this.state.adminName + " " + this.state.adminLastName}
              </Typography>
              <div className={classNames(classes.personIcon)}>
                <PersonIcon />
              </div>
            </div>
            {/* <Icon_Flag_BR /> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <List
            component="nav"
            // subheader={
            //   <ListSubheader component="div">Nested List Items</ListSubheader>
            // }
            className={classes.rootToolbar}
          >
            <Divider />

            <ListItem button >
              <ListItemIcon >
                <HomeIcon color={primary}/>
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" color={"white"} />
            </ListItem>

            <Divider />

            <ListItem button onClick={this.handleClickNestedToobar}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText inset primary="Gerenciamento" />
              {this.state.openToolbarNested ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={this.state.openToolbarNested} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => this._renderContent()}>
                  <ListItemIcon>
                    <ArchiveIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Conteúdo" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <BugReportIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Sintomas" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <LocalHospitalIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Unidades de Saúde" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Usuários" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <Divider />

          <List
            component="nav"
            // subheader={
            //   <ListSubheader component="div">Nested List Items</ListSubheader>
            // }
            className={classes.rootToolbar}
          >
          <ListItem button onClick={this.handleClickNestedToobarConfig}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Configurações" />
              {this.state.openToolbarNestedConfig ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={this.state.openToolbarNestedConfig} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Administradores" />
                </ListItem>
                </List>
            </Collapse>
          </List>
        </Drawer>
        
        {this.state.renderContent ?
           <Content /> :
           null
        }
        </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
