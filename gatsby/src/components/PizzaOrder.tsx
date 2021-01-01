import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import { PizzaNode } from '../../types/graphql-types';

type Order = {
    id: string;
    size: string;
};

type PizzaOrderProps = {
    orders: Array<Order>;
    pizzas: Array<PizzaNode>;
    removeFromOrder: (index: number) => void;
};

const PizzaOrder: React.FC<PizzaOrderProps> = ({ orders, pizzas, removeFromOrder }) => {
    return (
        <>
            {orders.map((order, index) => {
                const pizza = pizzas.find((pizza) => pizza.id === order.id);

                return (
                    <MenuItemStyles key={`${order.id}-${index}`}>
                        <Img fluid={pizza?.image?.asset?.fluid} />
                        <h2>{pizza?.name}</h2>
                        <p>
                            {formatMoney(calculatePizzaPrice(pizza?.price ?? 0, order.size))}
                            <button
                                type='button'
                                className='remove'
                                title={`Remove ${order.size} ${pizza?.name} from Order`}
                                onClick={() => removeFromOrder(index)}
                            >
                                &times;
                            </button>
                        </p>
                    </MenuItemStyles>
                );
            })}
        </>
    );
};

export default PizzaOrder;
