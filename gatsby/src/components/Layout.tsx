import React from 'react';
import 'normalize.css';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Nav from './Nav';
import Footer from './Footer';
import stripes from '../assets/images/stripes.svg';

const SiteBorderStyles = styled.div`
    max-width: 1000px;
    margin: 12rem auto 4rem;
    margin-top: clamp(2rem, 10vw, 12rem);
    background: #fff url(${stripes});
    background-size: 1500px;
    padding: 5px;
    padding: clamp(5px, 1vw, 25px);
    border: 5px solid #fff;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);

    @media (max-width: 1100px) {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
    }
`;

const ContentStyles = styled.div`
    background-color: #fff;
    padding: 2rem;
`;

const Layout: React.FC = (props) => {
    return (
        <>
            <GlobalStyles />
            <Typography />
            <SiteBorderStyles>
                <ContentStyles>
                    <Nav />
                    {props.children}
                    <Footer />
                </ContentStyles>
            </SiteBorderStyles>
        </>
    );
};

export default Layout;
