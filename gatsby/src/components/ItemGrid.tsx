import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

type Item = {
    name: string;
    _id: string;
    image: {
        asset: {
            url: string;
            metadata: {
                lqip: string;
            };
        };
    };
};

type ItemGridProps = {
    items: Array<Item>;
};

const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
    return (
        <ItemsGrid>
            {items.map((item) => (
                <ItemStyles key={item._id}>
                    <p>
                        <span className='mark'>{item.name}</span>
                    </p>
                    <img
                        width='500'
                        height='400'
                        src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
                        alt={item.name}
                        style={{
                            background: `url(${item.image.asset.metadata.lqip}) no-repeat`,
                            backgroundSize: 'cover'
                        }}
                    />
                </ItemStyles>
            ))}
        </ItemsGrid>
    );
};

export default ItemGrid;
