import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { api_url } from '../utils/urls';
import '../styles/Login.css';

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

	setTokenCookie = token => (
		this.props.cookies.set('authorization', token, {
			path: '/',
			maxAge: 900 //15 minutes
		})
	)

	updateTokenCookie = (Authorization) => (
		fetch(api_url + '/admin/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				Authorization
			}
		})
			.then(res => {
				if(res.status.ok) {
					this.setTokenCookie(Authorization);
				}
			})
	)

	checkIfTheresCookies = () => {
		const { cookies } = this.props;
		const { history } = this.props;
	
		if (cookies && cookies.get('authorization')) { //If cookies exist and there's an authorization cookie, login.
			this.updateTokenCookie(cookies.get('authorization')) ? history.push('/home') : history.push('/');
		}
	}

	componentWillMount() {
		this.checkIfTheresCookies();
	}

	_setTheStatePush = () => {
		this.props.history.push({
			pathname: '/home',
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
		console.log("Parapametros pushados")
	}
	
	handleClick = async () => {
		const url = api_url + "/admin/login";
		fetch(url, {
			method: 'POST',
			headers: {
				"Accept": "application/vnd.api+json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"admin": {
					"email": this.state.name,
					"password": this.state.password
					// "email": "proepi.desenvolvimento@gmail.com",
					// "password": "!ProEpiDev_1"
				}
			})
		}) /*end fetch */
			.then(async response => {
				if (response.status === 200) {
					this.setTokenCookie(response.headers.get('authorization'));
					this.setState({ adminToken: response.headers.get('authorization') });

					const adminInfo = await response.json();
					const { id, first_name, last_name, email, is_god, app_id } = adminInfo;
					
					this.props.history.push({
						pathname: '/home',
						state: {
							adminToken: response.headers.get('authorization'),
							adminName: first_name,
							adminLastName: last_name,
							adminEmail: email,
							adminId: id,
							adminIsGod: is_god,
							adminAppId: app_id
						}
					});
				} else if (response.status === 401) {
					alert("Usuário ou senha incorretos.");
				}
			});
	}
	handleChangeName = (name) => event => {
		this.setState({ [name]: event.target.value });
		console.log(this.state.name)
	};
	handleChange = (password) => event => {
		this.setState({ [password]: event.target.value });
		console.log(this.state.password)
	};
	handleForgotPassword = () => {
		alert("esqueci a senha, carai de asa");
	}
	render() {
		return (
			<div className="container">
				<MuiThemeProvider>
					<div>
						<AppBar
							title="Login"
						/>
						<TextField
							type="email"
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
						<button onClick={this.handleForgotPassword} className='forgotPassword'>FORGOT PASSWORD</button>
						<br />
						<div>
							<RaisedButton label="Submit" primary={true} style={style} onClick={() => this.handleClick()} />
						</div>
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