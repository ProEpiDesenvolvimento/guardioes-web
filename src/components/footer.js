import React, { Component } from 'react';
import { Footer } from 'react-materialize';

class FooterC extends Component {
    render() {
        return (
            <div>
                <Footer copyrights="&copy 2015 Copyright Text"
                    moreLinks={
                        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    }
                    links={
                        <a className="grey-text text-lighten-3" href="https://www.facebook.com/AssociacaoProEpi/">ProEpi - facebook</a>

                    }
                    className='example'
                >
                    <h5 className="white-text">Guardiões da Saúde</h5>
                    <p className="grey-text text-lighten-4">Monitore a saúde da população</p>
                </Footer>
            </div>
        );
    }
}


export default FooterC;