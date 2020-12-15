import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

type Topping = {
    id: string;
    name: string;
};

type CountedTopping = Topping & {
    count: number;
};

type PizzaNode = {
    toppings: Array<Topping>;
};

type Pizzas = {
    nodes: Array<PizzaNode>;
};

const ToppingsStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;

    a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        align-items: center;
        padding: 5px;
        background: var(--grey);
        border-radius: 2px;

        .count {
            background: #fff;
            padding: 2px 5px;
        }

        .active {
            background: var(--yellow);
        }
    }
`;

const countPizzasInToppings = (pizzasNodes: Array<PizzaNode>) => {
    const counts = pizzasNodes
        .map((pizza) => pizza.toppings)
        .flat()
        .reduce<Record<string, CountedTopping>>((acc, topping) => {
            // check if this is an existing topping
            // if it is, increment it by 1
            // otherwise create a new entry in our acc and set it to 1
            if (acc.hasOwnProperty(topping.id)) {
                acc[topping.id].count++;
            } else {
                acc[topping.id] = {
                    id: topping.id,
                    name: topping.name,
                    count: 1
                };
            }

            return acc;
        }, {});
    // sort them based on their count
    const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count);
    return sortedToppings;
};

const ToppingsFilter = () => {
    // Get a list of all the toppings
    // Get a list of all the pizzas with their toppings
    const { pizzas }: { pizzas: Pizzas } = useStaticQuery(graphql`
        query {
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `);
    // Count how many pizzas are in each topping
    const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
    // Loop over the list of toppings and display the topping and the count of pizzas in that topping
    // Link it up ...
    return (
        <ToppingsStyles>
            {toppingsWithCounts.map((topping) => (
                <Link to={`/topping/${topping.name}`}>
                    <span className='name'>{topping.name}</span>
                    <span className='count'>{topping.count}</span>
                </Link>
            ))}
        </ToppingsStyles>
    );
};

export default ToppingsFilter;
