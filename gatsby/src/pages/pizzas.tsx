import { graphql } from 'gatsby';
import React from 'react';
import { PizzasQuery } from '../../types/graphql-types';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

type PizzasPageProps = {
    data: PizzasQuery;
};

const PizzasPage: React.FC<PizzasPageProps> = ({ data }) => {
    const pizzas = data.pizzas.nodes;
    return (
        <>
            <ToppingsFilter />
            <PizzaList pizzas={pizzas} />
        </>
    );
};

export const query = graphql`
    query PizzaQuery {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                price
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fixed(width: 600, height: 200) {
                            ...GatsbySanityImageFixed
                        }
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;

export default PizzasPage;
