import React from 'react';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Nav from './Nav';
import Footer from './Footer';

const Layout: React.FC = (props) => {
    return (
        <div>
            <GlobalStyles />
            <Typography />
            <Nav />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;
