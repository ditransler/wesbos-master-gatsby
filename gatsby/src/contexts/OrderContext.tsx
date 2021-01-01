import React, { useState } from 'react';

type Order = {
    id: string;
    size: string;
};

type ContextProps = [Array<Order>, React.Dispatch<React.SetStateAction<never[]>>];

// Create a order context
const OrderContext = React.createContext<Partial<ContextProps>>([]);

export const OrderProvider: React.FC = ({ children }) => {
    // We need to stick state in here
    const [orders, setOrder] = useState([]);
    return <OrderContext.Provider value={[orders, setOrder]}>{children}</OrderContext.Provider>;
};

export default OrderContext;
