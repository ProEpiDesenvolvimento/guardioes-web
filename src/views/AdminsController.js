import React, { Component } from "react";
import { Typography, FormControl, TextField, Button, Divider } from "@material-ui/core";
import { url_live } from "../utils/urls";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IsGodComponent from "../components/IsGodComponent";

const styles = theme => ({
  container: {
    flex: 1,
    margin: 10
  },
  adminControllerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(" + 0 + "," + 56 + "," + 69 + ")"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  formAdmin: {
    alignSelf: "center",
    // display: 'flex',
    // flexDirection: 'row',
  }
});

class AdminsController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      confirmPassword: "",
      email: ""
    };
  }
  componentDidMount() {
    console.log(this.props.location.state.adminIsGod)
  }
  handleChangeName = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state.name);
  };
  handleChangeLastName = lastName => event => {
    this.setState({ [lastName]: event.target.value });
    console.log(this.state.lastName);
  };
  handleChangeEmail = email => event => {
    this.setState({ [email]: event.target.value });
    console.log(this.state.email);
  };
  handleChangePassword = password => event => {
    this.setState({ [password]: event.target.value });
  };

  handleChangeConfirmPassword = confirmPassword => event => {
    this.setState({ [confirmPassword]: event.target.value });
  };

  _renderIsGod = () => {
    return (
    <IsGodComponent /> 
    )
  }
  _createAdmin = () => {
    let confirmationPassword = false;
    const url = url_live + "/admin";
    if (this.state.password === this.state.confirmPassword) {
      confirmationPassword = true;
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/json",
          Authorization: this.props.location.state.adminToken
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          first_name: this.state.name,
          last_name: this.state.last_name,
          app_id: this.props.state.adminAppId,
          is_god: false
        })
      });
    } else {
      window.alert("Os campos de senha devem ser iguais");
    }
  };
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.toolbar} />
        <Typography className={classes.adminControllerTitle}>
          Gerencie aqui seus administradores
        </Typography>
        <FormControl error={true} className={classes.formAdmin}>
          <TextField
            id="standard-name"
            label="First Name"
            className={classes.textField}
            onChange={this.handleChangeName("name")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Last Name"
            className={classes.textField}
            onChange={this.handleChangeLastName("lastName")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Email"
            className={classes.textField}
            onChange={this.handleChangeEmail("email")}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={this.handleChangePassword("password")}
          />
          <TextField
            id="standard-password-input"
            label="Confirm Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={this.handleChangeConfirmPassword("confirmPassword")}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this._createAdmin();
            }}
          >
            Criar
          </Button>
        </FormControl>

        { this.location.state.adminIsGod? <IsGodComponent /> : <Divider />}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AdminsController);
