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
            
        };

        this.handleClick = this.handleClick.bind(this);
       
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
                    "email": this.state.name,
                    "password": this.state.password
                }
            })
        }) /*end fetch */
            .then((response) => {
                AsyncStorage.setItem('adminToken', response.headers.get('authorization'));
                // console.log(response.headers.get('authorization'))
                if (response.status === 200) {
                    return response.json()
                    
                } else {
                    console.log(response.text());

                }
            })
            .then((responseJson) => {
                AsyncStorage.setItem('adminID', responseJson.id);
                AsyncStorage.setItem('adminName', responseJson.first_name);
                AsyncStorage.setItem('adminLastName', responseJson.last_name);
                AsyncStorage.setItem('adminEmail', responseJson.email);
                AsyncStorage.setItem('adminGod', responseJson.is_god);
                AsyncStorage.setItem('adminApp', responseJson.app_id);
                console.log(responseJson.first_name)

                /* Block that make the redirect  */
                let path = `/`;
                this.props.history.push(path);

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