import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

type LoadingGridProps = {
    count: number;
};

const LoadingGrid: React.FC<LoadingGridProps> = ({ count }) => {
    return (
        <ItemsGrid>
            {Array.from({ length: count }, (_, i) => (
                <ItemStyles key={`loader-${i}`}>
                    <p>
                        <span className='mark'>Loading...</span>
                    </p>
                    <img
                        src='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII='
                        className='loading'
                        alt='Loading'
                        width='500'
                        height='400'
                    />
                </ItemStyles>
            ))}
        </ItemsGrid>
    );
};

export default LoadingGrid;
