import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import FormSymptom from "../components/FormSymptom";
import InfoIcon from "@material-ui/icons/Info";
import Modal from 'react-responsive-modal';
import {api_url} from '../utils/urls';
const styles = theme => ({
  root: {
    display: "flex"
  },
  container: {
    flex: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  symptomParent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  symptomParentTitle: {
    alignSelf: "center",
    margin: 10
  },
  contentView: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  userNameView: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  userName: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px"
  },
  personIcon: {
    marginTop: 0
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(" + 0 + "," + 56 + "," + 69 + ")"
  },
  rootToolbar: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
    //  backgroundColor: "rgb("+0+","+56+","+69+")"
  },
  symptoms: {
    margin: 10
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  card: {
    minWidth: 375,
    margin: 10,
    flexDirection: "column",
    display: "inline-block"
  },
  cardHeader: {
    display: "inline",
    flexDirection: "row"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center"
  },
  titleContentView: {
    fontSize: 20
  },
  pos: {
    marginBottom: 12
  },
  symptomView: {
    flexDirection: "row",
    display: "inline-block",
    alignItems: "center"
  },
  textFieldBody: {
    minWidth: 375,
    margin: 10
  },
  textFieldTitle: {
    minWidth: 50,
    margin: 10
  },
  textFieldType: {
    minWidth: 100,
    margin: 10
  },
  formCreate: {
    margin: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  infoBtn: {
    float: "right"
  }
});
class Symptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFormCreate: true,
      appSymptoms: [],
      name: "",
      openModalDetails: false,
      modalBody: "",
      modalTitle: ""
    };
  }
  componentDidMount() {
    this._fetchAppData();
  }
  _fetchAppData = () => {
    let url =
      api_url + "/apps/" + this.props.location.state.adminAppId;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        Authorization: this.props.location.state.adminToken
      }
    }) /*end fetch */
      .then(response => {
        console.log(response);
        return response.json();
      })
      // proepi.desenvolvimento@gmail.com
      // !ProEpiDev_1
      .then(responseJson => {
        this.setState({
          appSymptoms: responseJson.app.symptoms
        });
        
      });
  };

  _renderSymptoms() {
    let appSymptoms = this.state.appSymptoms;
    return appSymptoms.map(symptom =>
      this.SimpleCard(symptom.description, symptom.details, symptom.id)
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.toolbar} />

        <div className={classes.symptoms}>
          <Typography variant={"h5"}>Sintomas</Typography>
          {this._renderSymptoms()}
        </div>
        {this.state.openModalDetails ? (
          this.modalDetails(this.state.modalTitle, this.state.modalBody)
        ) : null}
        <Divider variant={"middle"} />

        {this.state.renderFormCreate ? (
          <FormSymptom adminParams={this.props.location.state} title = "Criar" buttonText = "criar" action="create"/>
        ) : null}
      </div>
    );
  }

  deleteContent = (id) => {
    let url =
      api_url + "/symptoms/" + id;
      if (
        window.confirm("Are you sure you wish to delete this content?")
      )
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/json",
        Authorization: this.props.location.state.adminToken
      }
    }) /*end fetch */
      .then(response => {
        console.log(response);
        return response.json();
      })
      // proepi.desenvolvimento@gmail.com
      // !ProEpiDev_1
      .then(responseJson => {
        if (responseJson != null) {
          this.shouldComponentUpdate()
        }
      });
  };
  
  onOpenModalDetails = () => {
    this.setState({ openModalDetails: true });
  };

  onCloseModalDetails = () => {
    this.setState({ openModalDetails: false });
  };

  modalDetails(description, details, id) {
    const { openModalDetails } = this.state;
    return (
      <div>
        <Modal open={openModalDetails} onClose={this.onCloseModalDetails} center>
          <h5>{description}</h5>
          <h6>{details}</h6>
          <FormSymptom adminParams={this.props.location.state} title="Atualizar" buttonText="atualizar" contentId = {this.state.modalId} action="update" />
        </Modal>
      </div>
    );
  }
  SimpleCard(title, body, id) {
    const { classes, theme } = this.props;
    const { open } = this.state;
    
    return (
      <div className={classes.symptomView}>
        <Card className={classes.card}>
          
            <div button className={classes.cardHeader} onClick={() => {
              this.onOpenModalDetails();
              this.setState({modalTitle: title,
                              modalBody: body,
                              modalId:  id
                })
            }}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {title} 
              </Typography>

            <Typography variant="body2" component="p">
              {body}
            </Typography>
            </CardContent>
            </div>
          
          <CardActions>
            <Button
              size="small"
              variant={"contained"}
              color={"secondary"}
              onClick={() => this.deleteContent(id)}
                
            >
              Delete
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Symptom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Symptom);
