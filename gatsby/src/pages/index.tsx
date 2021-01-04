import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ slicemasters }) => {
    return (
        <div>
            {!slicemasters && <LoadingGrid count={4} />}
            {slicemasters && !slicemasters?.length && <p>No one is working right now!</p>}
        </div>
    );
};

const HotSlices = ({ hotSlices }) => {
    return (
        <div>
            {!hotSlices && <LoadingGrid count={4} />}
            {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
        </div>
    );
};

const HomePage = () => {
    const { slicemasters, hotSlices } = useLatestData();

    return (
        <div className='center'>
            <h1>The Best Pizza Downtown!</h1>
            <p>Open 11am to 11pm Every Single Day</p>
            <HomePageGrid>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices hotSlices={hotSlices} />
            </HomePageGrid>
        </div>
    );
};

export default HomePage;
