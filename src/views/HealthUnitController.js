import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CSVReader from 'react-csv-reader'
import GoogleMapReact from 'google-map-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Modal from 'react-responsive-modal';

const styles = theme => ({
  container: {
    flex: 1,
    margin: 10
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  root: {
    // width: '100%',
    // marginTop: theme.spacing(3),
    // overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  modalMap: {
    width: "50%",
    height: "50%"
  },
  mapView: {
    width: "50%",
    height: "50%",
    margin: 30,
  },
  titleView: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "rgb("+0+","+56+","+69+")",
  }
})
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class HealthUnitController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      healthUnits: [],
      openModalDetails: false,
      modalDescription: "",
      modalLat: 0,
      modalLng: 0
    };
  }
  componentDidMount(){
    console.log("Health ")
    this._fetchPublicHospitals()
  }
  handleForce = (data) => {
    this.setState({data})
    console.log(data[1])
    data.map( data_aux => {
       this._createPublicHospital(data_aux[1], data_aux[3], data_aux[4], data_aux[2])
    })
    
  }

  handleDarkSideForce = () => {
    console.log("Erro")
  }

    _createPublicHospital = (description, latitude, longitude, details) => {
      let url  = "http://localhost:3001/public_hospitals"

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/json",
          Authorization: this.props.location.state.adminToken
        },
        body: JSON.stringify({
          public_hospital: {
          app_id: this.props.location.state.adminAppId,
          description: description,
          latitude: latitude,
          longitude: longitude,
          details: details
        }
      })
      })
    } 

  _fetchPublicHospitals = () => {
    let url =
      "http://localhost:3001/public_hospital_admin/"
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        Authorization: this.props.location.state.adminToken
      },
      body: JSON.stringify({
        app_id: this.props.location.state.adminAppId
      })
    }) /*end fetch */
      .then(response => {
        console.log(response);
        return response.json();
      })
      // proepi.desenvolvimento@gmail.com
      // !ProEpiDev_1
      .then(responseJson => {
        this.setState({
          healthUnits: responseJson.public_hospitals
        });
        console.log(this.state.healthUnits)
      });
  };
  onOpenModalDetails = () => {
    this.setState({ openModalDetails: true });
  };

  onCloseModalDetails = () => {
    this.setState({ openModalDetails: false });
  };

  modalDetails(description, lat, lng) {
    const { openModalDetails } = this.state;
    const {classes} = this.props;
    return (
        <Modal open={openModalDetails} onClose={this.onCloseModalDetails} className={classes.modalMap} center>
        <div className={classes.mapView}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAVPgl2h7uETdFfsK11Chdw4UQy-GAKF0w" }}
                defaultCenter={{
                  lat: lat,
                  lng: lng
                }}
                defaultZoom={11}
              >
                <AnyReactComponent
                  lat={lat}
                  lng={lng}
                  text={description}
                />
              </GoogleMapReact>
              </div>
            
        </Modal>
      
    );
  }
  _renderHealtuunits = () => {
    const { classes, theme } = this.props;
    const healthUnits = this.state.healthUnits
    return (
      <Paper className={classes.root}>
    <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell >Telefone</TableCell>
            <TableCell >Detalhes</TableCell>
            <TableCell >Mapa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
    {healthUnits.map(unit => (
      
        <TableRow>
          <TableCell>
             <Typography>{unit.description}</Typography>
          </TableCell>
          <TableCell>
             <Typography>{unit.phone}</Typography>
          </TableCell>
          <TableCell>
             <Typography>{unit.details}</Typography>
          </TableCell>
          <TableCell>
          <Button
              size="small"
              variant={"contained"}
              color={"secondary"}
              onClick={() => {this.onOpenModalDetails()
                  this.setState({
                    modalDescription: unit.description,
                    modalLat: unit.latitude,
                    modalLng: unit.longitude
                  })
                }}
                
            >
              Veja no mapa
            </Button>
          </TableCell>
        </TableRow>
      
        ))}
        </TableBody>
      </ Table >
      </Paper>
    )
  }
  render() {
    const { classes, theme } = this.props;
    
    return (
      <div className={classes.container}>
      <div className={classes.toolbar} />
        <Typography className={classes.titleView}> Unidades de saúde </Typography>
        <CSVReader
          cssClass="react-csv-input"
          label="Selecione um arquivo .CSV para cadatrar suas unidades de saúde"
          onFileLoaded={this.handleForce}
      />
      
      {this.state.data ?(
        this._renderHealtuunits()
      ): null}

   
      {this.state.openModalDetails ? (
          this.modalDetails(this.state.modalDescription, this.state.modalLat, this.state.modalLng)
        ) : null}
        </div>
      
    );
  }
}

export default withStyles(styles, { withTheme: true })(HealthUnitController);
