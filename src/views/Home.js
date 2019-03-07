import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonToolbar, Navbar, NavDropdown, Form, FormControl, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import SideMenu from '../components/SideMenu';

class Home extends Component {

  constructor(props) {
    super(props)

    this.GotoHome = this.GotoHome.bind(this);

  }

  GotoHome() {
    let path = `/test`;
    this.props.history.push(path)

  }
  render() {
    return (

      <div style={{ alignItems: "inline" }}>
        <SideMenu />
        
         
           <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home"> GDS Api</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/welcome">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar> 

        <Container>
          <body>
            <Row>
              <Col>
                <h1>É um H1</h1>
              </Col>
              <Col>
                <ButtonToolbar>
                  <Button variant="primary" onClick={this.GotoHome}>Home</Button>
                </ButtonToolbar>
              </Col>
            </Row>

          </body>
        </Container>
        </div>
      
    )
  }
}

export default withRouter(Home);