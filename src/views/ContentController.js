import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      display: "flex"
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    contentView: {
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
class Content extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
        <div>
          <div className={classes.toolbar} />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        
        </div>
    );
  }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  export default withStyles(styles, { withTheme: true })(Content);