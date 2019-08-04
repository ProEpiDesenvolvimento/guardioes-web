import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { api_url } from '../utils/urls';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminToken: "",
            adminAppId: 0,
            adminEmail: "",
            adminIsGod: false,
            adminLastName: "",
            adminName: "",
            adminAppId: 1,
        };

        this.handleClick = this.handleClick.bind(this);
       
    }


    handleClick = async (event) => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const url = "https://apiguardioes.herokuapp.com/admin/login"
        // const url_local = "http://localhost:3001/admin/login"
        const url = api_url + "/admin/login";
        fetch(url, {
            method: 'POST',
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "admin":
                {
                    "email": this.state.name,
                    "password": this.state.password
                }
            })
        }) /*end fetch */
            .then(response => {
                 console.log(response)
                 this.setState({adminToken: response.headers.get('authorization')})
                 return response.json()
                })

                // proepi.desenvolvimento@gmail.com
                // !ProEpiDev_1

            .then((responseJson) => {
                this.setState({ 
                    adminName: responseJson.first_name,
                    adminLastName: responseJson.last_name,
                    adminEmail: responseJson.email,
                    adminId: responseJson.id,
                    adminIsGod: responseJson.is_god,
                    adminAppId: responseJson.app_id
                })
                console.log(responseJson.first_name)

                /* Block that make the redirect  */
                
                this.props.history.push({
                    pathname: '/',
                    state: {
                        adminToken: this.state.adminToken,
                        adminName: this.state.adminName,
                        adminLastName: this.state.adminLastName,
                        adminEmail: this.state.adminEmail,
                        adminId: this.state.adminId,
                        adminIsGod: this.state.adminIsGod,
                        adminAppId: this.state.adminAppId
                      }
                    
                });

            })
            
            
    }

    handleChangeName = (name) => event => {
        this.setState({ [name]: event.target.value });
        console.log(this.state.name)
      };

      handleChange = (password) => event => {
        this.setState({ [password]: event.target.value});
         console.log(this.state.password)
      };
    
    render() {


        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange={this.handleChangeName('name')}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={this.handleChange('password')}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={() => this.handleClick()}/> 
                    </div>
                </MuiThemeProvider>
            </div>


        );
    }
}

const style = {
    margin: 15,
   };

export default withRouter(Login);