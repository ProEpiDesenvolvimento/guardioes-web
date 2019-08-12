import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { api_url } from "../utils/urls";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  titleView: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(" + 0 + "," + 56 + "," + 69 + ")"
  },
  isGodView: {
    display: "flex",
    flex: 1,
    marginTop: 10
  }
});
class IsGodComponent extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.isGodView}>
        
        <Typography className={classes.titleView}>
          Administre os Aplicativos do GDS
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(IsGodComponent);
