import React, { Component } from 'react';
import { Container, Row, Col, Button, Navbar, Carousel } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import '../styles/welcome.css';
import ExampleApp from '../imgs/hero-a.svg';
import Logo from '../imgs/logo2.svg';
import MapSample from '../imgs/list1.png';
import ContentSample from '../imgs/list2.png';
import Footer from '../components/footer'

class Welcome extends Component {
    constructor(props) {
        super(props)
        
        this.GotoLogin = this.GotoLogin.bind(this);
        
    }
    
      GotoLogin() {
        let path = `/login`;
        this.props.history.push(path)
        
      }

    render() {

        return (
            <div className="WelcomeSC">
                <Navbar bg="primary" expand="lg">
                    <Navbar.Brand href="/">
                        <img
                            src={Logo}
                            width="150"
                            height="60"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="dark" onClick={this.GotoLogin}>Login</Button>
                    </Navbar.Collapse>
                </Navbar>

                <div className='Jumbotron'>
                    <Row>
                        <Col>
                            <h4 className='TextJumbotron'>Criando seu aplicativo você pode monitorar lorem impsum dolor et olor bolor  </h4><br />
                            <Button variant="primary">Solicite já o seu</Button>
                        </Col>
                        <Col><img className="ImageJumbotron" src={ExampleApp} width="75%" /></Col>
                    </Row>
                </div>
                <Container>
                    <div className='ListMapSample'>
                        <Row >
                            <Col>
                                <img className='ImageMapSample' src={MapSample} width='700' />
                            </Col>
                            <Col>
                                <h1>Função mapa</h1>
                                <p className='TextMapSample'>
                                    Você poderá monitorar surtos e presença de doenças no seu país Você poderá monitorar surtos e presença de doenças no seu país Você poderá monitorar surtos e presença de doenças no seu país
                                    Você poderá monitorar surtos e presença de doenças no seu país Você poderá monitorar surtos e presença de doenças no seu país Você poderá monitorar surtos e presença de doenças no seu país
                            </p>
                            </Col>
                        </Row>
                    </div>

                    <div className='ListMapSample'>
                        <Row >
                            <Col>
                                <h1>Adicionnando conteúdos</h1>
                                <p className='TextMapSample'>
                                    Você poderá adicionar conteúdos ao seu aplicativo e gerencia-lo Você poderá adicionar conteúdos ao seu aplicativo e gerencia-lo Você poderá adicionar conteúdos ao seu aplicativo e gerencia-lo
                                    Você poderá adicionar conteúdos ao seu aplicativo e gerencia-lo Você poderá adicionar conteúdos ao seu aplicativo e gerencia-lo Você poderá adicionar conteúdos ao seu aplicativo e gerencia-lo
                            </p>
                            </Col>
                            <Col>
                                <img className='ImageMapSample' src={ContentSample} width='700' />
                            </Col>
                        </Row>
                    </div>
                    <div className="CarouselView">
                        <Carousel className="CarouselView">
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={ExampleApp}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={ExampleApp}
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={ExampleApp}
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Container>

                <Footer/>
                
            </div >
        );
    }
}

export default withRouter(Welcome);