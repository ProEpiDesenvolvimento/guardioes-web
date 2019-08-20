import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {api_url} from "../utils/urls"
const styles = theme => ({
  textFieldBody: {
    minWidth: 375,
    margin: 10
  },
  textFieldTitle: {
    minWidth: 50,
    margin: 10,
    alignItems: "center",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
  textFieldType: {
    minWidth: 100,
    margin: 10
  },
  formCreate: {
    flex: 1,
    margin: 10
  },
  sendBtn: {
    position: "relative",
    marginTop: "190px"
  }
});
class FormSymptom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.adminParams.adminLastName);
  }

  _createContent = () => {
    let url = api_url + "/symptoms";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        Authorization: this.props.adminParams.adminToken
      },
      body: JSON.stringify({
        symptom: {
          description: this.state.description,
          details: this.state.details,
          code: this.state.code,
          app_id: this.props.adminParams.adminAppId
        }
      })
    }) /*end fetch */
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(responseJson => {});
  };

  _updateContent = () => {
    let url = api_url + this.props.contentId;
    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        Authorization: this.props.adminParams.adminToken
      },
      body: JSON.stringify({
        symptom: {
            description: this.state.description,
            details: this.state.details,
            code: this.state.code,
            app_id: this.props.adminParams.adminAppId
          }
      })
    }) /*end fetch */
      .then(response => {
        this.setState(this.state)
        console.log(response);
        return response.json();
      })
      .then(responseJson => {});
  };
  
 _selectAction = () => {
   if (this.props.action === "create") {
     this._createContent()
   }else if(this.props.action === "update" ) {
    this._updateContent()
   } 
   
 }
  handleChangeName = description => event => {
    this.setState({ [description]: event.target.value });
    console.log(this.state.description);
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
    const AdminParams = { AdminParams };
    return (
      <form className={classes.formCreate} noValidate autoComplete="off">
        <Typography variant={"h5"}>{this.props.title} Sintomas </Typography>
        <TextField
          label="Titulo"
          hintText="Title of the content"
          floatingLabelText="Title"
          onChange={this.handleChangeName("description")}
          margin="normal"
          className={classes.textFieldTitle}
        />

        <TextField
          id="standard-multiline-static"
          label="Detalhes"
          multiline
          rows="10"
          defaultValue=""
          className={classes.textFieldBody}
          margin="normal"
          onChange={this.handleChangeBody("details")}
        />
         <TextField
          label="Código"
          defaultValue=""
          className={classes.textFieldBody}
          margin="normal"
          onChange={this.handleChangeType("code")}
        />
        <Button
          size="small"
          variant={"contained"}
          color={"inherit"}
          onClick={() => this._selectAction()}
          color="blue"
          className={classes.sendBtn}
        >
          {this.props.buttonText}
        </Button>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FormSymptom);
