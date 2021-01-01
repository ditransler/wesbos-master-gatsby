import formatMoney from './formatMoney';
import calculatePizzaPrice from './calculatePizzaPrice';
import { PizzaNode } from '../../types/graphql-types';

type Order = {
    id: string;
    size: string;
};

type Orders = Array<Order>;
type Pizzas = Array<PizzaNode>;

const attachNamesAndPrices = (orders: Orders, pizzas: Pizzas) => {
    return orders.map((order) => {
        const pizza = pizzas.find((pizza) => pizza.id === order.id);

        return {
            ...order,
            name: pizza?.name,
            thumbnail: pizza?.image?.asset?.fluid?.src,
            price: formatMoney(calculatePizzaPrice(pizza?.price ?? 0, order.size))
        };
    });
};

export default attachNamesAndPrices;
