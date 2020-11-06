import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout: React.FC = (props) => {
    return (
        <div>
            <Nav />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;
