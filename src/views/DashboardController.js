import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/Dashboard.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DashboardController extends Component {
  render() {
    const options1 = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Number of New Users"
      },
      axisY: {
        title: "Number of Users",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: "2016",
        showInLegend: true,
        dataPoints: [
          { y: 155, label: "Jan" },
          { y: 150, label: "Feb" },
          { y: 152, label: "Mar" },
          { y: 148, label: "Apr" },
          { y: 142, label: "May" },
          { y: 150, label: "Jun" },
          { y: 146, label: "Jul" },
          { y: 149, label: "Aug" },
          { y: 153, label: "Sept" },
          { y: 158, label: "Oct" },
          { y: 154, label: "Nov" },
          { y: 150, label: "Dec" }
        ]
      },
      {
        type: "spline",
        name: "2017",
        showInLegend: true,
        dataPoints: [
          { y: 172, label: "Jan" },
          { y: 173, label: "Feb" },
          { y: 175, label: "Mar" },
          { y: 172, label: "Apr" },
          { y: 162, label: "May" },
          { y: 165, label: "Jun" },
          { y: 172, label: "Jul" },
          { y: 168, label: "Aug" },
          { y: 175, label: "Sept" },
          { y: 170, label: "Oct" },
          { y: 165, label: "Nov" },
          { y: 169, label: "Dec" }
        ]
      }]
    }
    const options2 = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Symptoms Reported"
      },
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Symptom 01" },
          { y: 49, label: "Symptom 02" },
          { y: 9, label: "Symptom 03" },
          { y: 5, label: "Symptom 04" },
          { y: 19, label: "Symptom 05" }
        ]
      }]
    }

    return (
      <div
        style={{
          width: '100%',
          height: '8%',
          marginTop: '5%',
          marginBottom: '3%',
          marginLeft: '2%',
          marginRight: '2%',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white'
        }}
      >
        <div style={{
          width: '80%',
        }}>
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

export default DashboardController;
