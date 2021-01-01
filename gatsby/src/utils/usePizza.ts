import { useContext, useState } from 'react';
import OrderContext from '../contexts/OrderContext';
import { PizzaNode } from '../../types/graphql-types';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

type OrderedPizza = {
    id: string;
    size: string;
};

type InitalValues = {
    pizzas: Array<PizzaNode>;
    values: {
        name: string;
        email: string;
    };
};

const usePizza = ({ pizzas, values }: InitalValues) => {
    const [orders, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    // 2. Make a function to add things to the order
    function addToOrder(orderedPizza: OrderedPizza): void {
        setOrder([...orders, orderedPizza]);
    }
    // 3. Make a function to remove things from the order
    function removeFromOrder(index: number): void {
        setOrder([
            // everything before the item we want to remove
            ...orders.slice(0, index),
            // everything after the item we want to remove
            ...orders.slice(index + 1)
        ]);
    }

    // This is the function that is run when someone submits the form
    async function submitOrder(evt) {
        evt.preventDefault();

        setLoading(true);
        setError(null);
        setMessage('Go eat!');

        // Gather all the data
        const body = {
            order: attachNamesAndPrices(orders, pizzas),
            total: formatMoney(calculateOrderTotal(orders, pizzas)),
            name: values.name,
            email: values.email
        };

        // 4. Send this data to a serverless function when they check out
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const text = JSON.parse(await res.text());

        // Check if everything worked
        if (res.status >= 400 && res.status < 600) {
            setLoading(false); // Turn off loading
            setError(text.message);
        } else {
            // It worked!
            setLoading(false);
            setMessage('Success! Come on down for your pizza');
        }
    }

    return {
        orders,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder
    };
};

export default usePizza;
