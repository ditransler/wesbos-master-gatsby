export type Topping = {
    id: string;
    name: string;
};

type FixedImage = {
    base64: string;
    height: number;
    width: number;
    src: string;
    srcSet: string;
    srcSetWebp: string;
    srcWebp: string;
};

type FluidImage = {
    aspectRatio: number;
    base64: string;
    sizes: string;
    src: string;
    srcSet: string;
    srcSetWebp: string;
    srcWebp: string;
};

export type ImageAsset = {
    fixed: FixedImage;
    fluid: FluidImage;
};

export type PizzaNode = {
    name: string;
    id: string;
    price: number;
    slug: {
        current: string;
    };
    toppings: Array<Topping>;
    image: {
        asset: ImageAsset;
    };
};

export type PizzasQuery = {
    pizzas: {
        nodes: Array<PizzaNode>;
    };
};
