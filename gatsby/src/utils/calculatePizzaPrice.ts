type Size = {
    [key: string]: number;
};

const sizes: Size = {
    S: 0.75,
    M: 1,
    L: 1.25
};

const calculatePizzaPrice = (cents: number, size: string): number => {
    return cents * sizes[size];
};

export default calculatePizzaPrice;
