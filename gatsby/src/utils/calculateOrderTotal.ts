import calculatePizzaPrice from './calculatePizzaPrice';

type Order = {
    id: string;
    size: string;
};

type Pizza = {
    id: string;
    price: number;
};

type Orders = Array<Order>;
type Pizzas = Array<Pizza>;

const calculateOrderTotal = (orders: Orders, pizzas: Pizzas) => {
    return orders.reduce((runningTotal, order) => {
        const pizza = pizzas.find((pizza) => pizza.id === order.id);
        return runningTotal + calculatePizzaPrice(pizza?.price ?? 0, order.size);
    }, 0);
};

export default calculateOrderTotal;
