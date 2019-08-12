import React, { Component } from "react";
import { Typography, FormControl, TextField, Button} from "@material-ui/core";

class ChangePassword extends Component {
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
              this._changePassword();
            }}
          >
            Trocar senha
          </Button>
        </FormControl>
       
      </div>
    );
  }
}

export default ChangePassword;
