import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { url_live } from "../utils/urls";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    flex: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  viewTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(" + 0 + "," + 56 + "," + 69 + ")",
    margin: 10
  },
  textFieldParamContent: {
    margin: 10
  },
  textFieldParamToSearch: {
    margin: 10,
    width: 200,
    height: 10,
    alignSelf: "left",
    borderBottomWidth: 10,
    borderColor: "red"
  },
  formAndView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  formDiv: {
    display: 'flex',
    alignSelf: "left",
    borderBottomWidth: 10,
    borderColor: "red"
  },
  viewDiv: {
    alignContent: "right",
    borderBottomWidth: 10,
    borderColor: "red"
  }
});

class UsersController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramContent: "",
      paramToSearch: "",
      userData: []
    };
  }

  componentDidMount() {
    console.log("User controller");
  }

  handleChangeParamContent = paramContent => event => {
    this.setState({ [paramContent]: event.target.value });
    console.log(this.state.paramContent);
  };

  handleChangeParamToSearch = paramToSearch => event => {
    this.setState({ [paramToSearch]: event.target.value });
    console.log(this.state.paramToSearch);
  };

  _renderList = () => {
    let userData = this.state.userData
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> User Name</TableCell>
            <TableCell> Email </TableCell>
            <TableCell> Country </TableCell>
            <TableCell> Gender </TableCell>
            <TableCell> Race </TableCell>
            {/* <TableCell>No Agregados</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map(user => (
             <TableRow>
               <TableCell>{user.user_name}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>{user.country}</TableCell>
               <TableCell>{user.gender}</TableCell>
               <TableCell>{user.race}</TableCell>
               {/* <TableCell>{(user.households).lenght}</TableCell> */}
             </TableRow>
          )
          )
          }
        </TableBody>
      </Table>
    )
  }
  _fetchUserDataToSearch = () => {
    let url = url_live + "/render_user_by_filter";
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        Authorization: this.props.location.state.adminToken
      },
      body: JSON.stringify({
        param_to_search: this.state.paramToSearch,
        param_content: this.state.paramContent
      })
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson === null) {
          this.setState({ userData: [] });
        } else {
          this.setState({ userData: responseJson.users });
        }
        console.log(this.state.userData);
      });
  };
  _renderCharts = () => {
    return <Typography>OI</Typography>;
  };
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.toolbar} />
        <Typography className={classes.viewTitle}>
          Veja como estão seus usuários
        </Typography>
        <div className={classes.formAndView}>
          <div className={classes.formDiv}>
            <FormControl className={classes.textFieldParamToSearch}>
              <InputLabel htmlFor="age-simple">O que deseja buscar</InputLabel>
              <Select
                onChange={this.handleChangeParamToSearch("paramToSearch")}
                value={this.state.paramToSearch}
                inputProps={{
                  name: "paramToSearch",
                  id: "type-simple"
                }}
              >
                <MenuItem value={"name"}>Nome</MenuItem>
                <MenuItem value={"gender"}>Gênero</MenuItem>
                <MenuItem value={"race"}>Raça</MenuItem>
                <MenuItem value={"is_professional"}>
                  Profissional da saúde
                </MenuItem>
                <MenuItem value={"country"}>País</MenuItem>
              </Select>

              <TextField
                label="Qual o valor do filtro"
                onChange={this.handleChangeParamContent("paramContent")}
                margin="normal"
                className={classes.textFieldParamContent}
              />
              <Button
                size="small"
                variant={"contained"}
                color={"primary"}
                onClick={() => {
                  this._fetchUserDataToSearch();
                }}
              >
                Buscar
              </Button>
            </FormControl>
          </div>
          <div className={classes.viewDiv}>
            <Typography>TESTE 123</Typography>
            {this.state.userData != [] ? this._renderList() : null}
          </div>
          
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UsersController);
