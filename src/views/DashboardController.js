import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/Dashboard.css';
import { api_url } from '../utils/urls';
import { withCookies } from 'react-cookie';
import moment from 'moment';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DashboardController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      apps: [],
      surveys: [],
      symptoms: [],
      year: '',
      surveys_week: []
    }
  }

  componentDidMount() {
    this.fetchDashboard();
  }

  fetchDashboard() {
    const { cookies } = this.props;
    try {
      fetch(api_url + '/dashboard', { method: 'GET', headers: { Accept: 'application/vnd.api+json', Authorization: cookies.get('authorization') } })
        .then((res) => res.status === 200 ? res.json() : null)
        .then(d => {
          if (d != null) {
            this.setState({
              users: d.users,
              apps: d.apps,
              surveys: d.surveys,
              symptoms: d.symptoms,
              year: d.year,
              surveys_week: d.surveys_week,
              all_users: d.all_users,
              all_surveys: d.all_surveys
            })
          }
        })
    } catch (error) {
      console.log("Error Fetch dashboard", error);
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  format(object, date = false) {
    let data = [];

    Object.values(object).map(u => {
      let length = u.length;
      let label = this.getKeyByValue(object, u);

      if (label != '') {
        data.push(date ? { y: u, label: moment(label).add(1, 'day').format("DD/MM/YYYY") } : { y: length, label });
      }
    })

    return data;
  }

  geraIndicadores(number, label) {
    return (
      <div className="indicador">
        <h1>{number}</h1>
        <p>{label.toUpperCase()}</p>
      </div>
    )
  }

  render() {
    const { all_surveys, all_users } = this.state;
    const options1 = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Number of New Users"
      },
      axisY: {
        title: "Users",
        includeZero: false
      },
      axisX: {
        title: 'Time'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: this.state.year.toString(),
        showInLegend: true,
        dataPoints: this.format(this.state.users)
      }]
    }
    const options2 = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Survey per city"
      },
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} surveys",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y} surveys",
        dataPoints: this.format(this.state.surveys)
      }]
    }

    const options3 = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Surveys per Week"
      },
      axisY: {
        title: "Surveys",
        includeZero: false
      },
      axisX: {
        title: 'Time'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: this.state.year.toString(),
        showInLegend: true,
        dataPoints: this.format(this.state.surveys_week, true)
      }]
    }

    return (
      <div
        style={{
          flex: 1,
          margin: '5%'

        }}
      >
        <div className="indicador-container">
          {this.geraIndicadores(all_users, "Users")}
          {this.geraIndicadores(all_surveys, "Surveys")}
        </div>

        <div style={{
          width: '80%',
        }}>
          <CanvasJSChart
            options={options3}
          /* onRef={ref => this.chart = ref} */
          />
          <CanvasJSChart
            options={options1}
          /* onRef={ref => this.chart = ref} */
          />
          <br />
          <CanvasJSChart
            options={options2}
          /* onRef={ref => this.chart = ref} */
          />

        </div>
      </div>
    );
  }
}

export default withCookies(DashboardController);
