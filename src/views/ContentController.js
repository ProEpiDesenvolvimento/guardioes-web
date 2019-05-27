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
import FormContent from "../components/FormContent";
import InfoIcon from "@material-ui/icons/Info";
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
  contentParent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  contentParentTitle: {
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
  contents: {
    margin: 10
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  card: {
    minWidth: 375,
    margin: 10
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
  contentView: {
    flexDirection: "row",
    display: "inline-block",
    justifyContent: "center",
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
  }
});
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFormCreate: true,
      appContents: [],
      name: ""
    };
  }
  componentDidMount() {
    this._fetchAppData();
  }
  _fetchAppData = () => {
    let url =
      "http://localhost:3001/apps/" + this.props.location.state.adminAppId;
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
          appContents: responseJson.app.contents
        });
        console.log(this.state.appContents[0].title);
      });
  };

  _renderContents() {
    let appContents = this.state.appContents;
    return appContents.map(content => 
      this.SimpleCard(content.title, content.body, content.id)
    );
    // return this.state.appContents[0].body
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.toolbar} />

        <div className={classes.contents}>
          <Typography variant={"h5"}>Conteúdos</Typography>
          {this._renderContents()}
        </div>

        <Divider variant={"middle"} />

        {this.state.renderFormCreate ? (
          <FormContent adminParams={this.props.location.state} />
        ) : null}
      </div>
    );
  }

  SimpleCard(title, body, id) {
    const { classes, theme } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.contentView}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>

            <Button
              size="small"
              variant={"contained"}
              color={"inherit"}
              onClick={() => this.toggleModal}
            >
              <InfoIcon />
            </Button>

            <Typography variant="body2" component="p">
              {body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant={"contained"}
              color={"inherit"}
              onClick={() => this.toggleModal}
            >
              Update
              <UpdateIcon />
            </Button>
            <Button size="small" variant={"contained"} color={"secondary"}>
              Delete
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Content);
