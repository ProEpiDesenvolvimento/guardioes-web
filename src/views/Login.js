import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { AsyncStorage } from 'AsyncStorage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminId: '',
            adminToken: null,
            isGod: false,
            email: '',
            password: '',
            test: null,
            statusCode: null,
        }; 
        this.GotoHome = this.GotoHome.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    GotoHome() {
        let path = `/welcome`;
        this.props.history.push(path);
        
            // return(<Redirect to="/welcome" />)
             
        
        
      }

    handleClick(event) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://apiguardioes.herokuapp.com/admin/login"
        fetch(proxyurl + url, {
            method: 'POST',
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "admin":
                {
                    "email": "proepi.desenvolvimento@gmail.com",
                    "password": "!ProEpiDev_1"
                }
            })
        }) /*end fetch */
            .then((response) => {
                this.setState({ adminToken: response.headers.get('authorization'), statusCode: response.status })
                if (this.state.statusCode == 200) {
                    return response.json()
                } else {
                    console.log("Algo deu errado");

                }
            })
            .then((responseJson) => {

                this.setState({
                    adminId: responseJson.id,
                    isGod: responseJson.is_god,
                })
                AsyncStorage.setItem('adminID', responseJson.id);
                AsyncStorage.setItem('adminName', responseJson.first_name);
                AsyncStorage.setItem('adminName', responseJson.last_name);
                AsyncStorage.setItem('adminToken', this.state.adminToken);
                AsyncStorage.setItem('adminEmail', responseJson.email);
                AsyncStorage.setItem('adminGod', responseJson.is_god);
                AsyncStorage.setItem('adminApp', responseJson.app_id);
                

            })
            this.GotoHome()
            console.log(this.state.adminToken)
    }

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
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/> 
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