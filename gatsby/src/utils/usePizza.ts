import { useState } from 'react';

type OrderedPizza = {
    id: string;
    size: string;
};

const usePizza = () => {
    // 1. Create some state to hold our order
    const [orders, setOrder] = useState<OrderedPizza[]>([]);
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
    // TODO: 4. Send this data to a serverless function when they check out

    return {
        orders,
        addToOrder,
        removeFromOrder
    };
};

export default usePizza;
