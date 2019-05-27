import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    textFieldBody: {
      minWidth: 375,
      margin: 10,
    },
    textFieldTitle: {
      minWidth: 50,
      margin: 10,
    },
    textFieldType: {
      minWidth: 100,
      margin: 10,
    },
    formCreate: {
      margin: 10,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    sendBtn: {
      position: 'absolute',
      alignSelf: 'flex-end',
    },
  });
class FormContent extends Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  handleChangeName = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state.name);
  };
  handleChangeType = type => event => {
    this.setState({ [type]: event.target.value });
    console.log(this.state.type);
  };
  handleChangeBody = body => event => {
    this.setState({ [body]: event.target.value });
    console.log(this.state.body);
  };
  render() {
    const { classes, theme } = this.props;
    return(
    <form className={classes.formCreate} noValidate autoComplete="off">
          <Typography variant={"h5"}>Criar Conteúdos</Typography>
          <TextField
            label="Titulo"
            hintText="Title of the content"
            floatingLabelText="Title"
            onChange={this.handleChangeName("name")}
            margin="normal"
            className={classes.textFieldTitle}
          />

          <TextField
            id="standard-multiline-static"
            label="Corpo"
            multiline
            rows="10"
            defaultValue=""
            className={classes.textFieldBody}
            margin="normal"
            onChange={this.handleChangeBody("body")}
          />
          <FormControl className={classes.textFieldType}>
            <InputLabel htmlFor="age-simple">Tipo</InputLabel>
            <Select
              
              onChange={this.handleChangeType("type")}
              inputProps={{
                name: "type",
                id: "type-simple"
              }}
            >
          
              <MenuItem value={"list"}>List</MenuItem>
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"map"}>Map</MenuItem>
            </Select>
          </FormControl>
          <Button
              size="small"
              variant={"contained"}
              color={"inherit"}
              onClick={() => this._createContent()}
              color="primary"
              className={classes.sendBtn}
            >
              Criar
            </Button>
        </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FormContent);
