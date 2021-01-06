import { graphql } from 'gatsby';
import React from 'react';
import { PizzasQuery } from '../../types/graphql-types';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

type PizzasPageProps = {
    data: PizzasQuery;
    pageContext: {
        topping: string;
    };
};

const PizzasPage: React.FC<PizzasPageProps> = ({ data, pageContext }) => {
    const pizzas = data.pizzas.nodes;
    return (
        <>
            <SEO title={pageContext.topping ? `Pizzas With ${pageContext.topping}` : `All Pizzas`} />
            <ToppingsFilter activeTopping={pageContext.topping} />
            <PizzaList pizzas={pizzas} />
        </>
    );
};

export const query = graphql`
    query PizzaQuery($toppingRegex: String) {
        pizzas: allSanityPizza(filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }) {
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
