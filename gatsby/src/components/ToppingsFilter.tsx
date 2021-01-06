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
        text-decoration: none;
        font-size: clamp(1.5rem, 1.4vw, 2.5rem);

        .count {
            background: #fff;
            padding: 2px 5px;
        }

        &[aria-current='page'] {
            background: var(--yellow);
        }
    }
`;

const countPizzasInToppings = (pizzasNodes: Array<PizzaNode>) => {
    const counts = pizzasNodes
        .map((pizza) => pizza.toppings)
        .flat()
        .reduce<Record<string, CountedTopping>>((acc, topping) => {
            // Check if this is an existing topping
            const existingTopping = acc[topping.id];
            if (existingTopping) {
                // If it is, increment it by 1
                existingTopping.count++;
            } else {
                // Otherwise create a new entry in our acc and set it to 1
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

type ToppingsFilterProps = {
    activeTopping: string;
};

const ToppingsFilter: React.FC<ToppingsFilterProps> = ({ activeTopping }) => {
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
            <Link to='/pizzas'>
                <span className='name'>All</span>
                <span className='count'>{pizzas.nodes.length}</span>
            </Link>
            {toppingsWithCounts.map((topping) => (
                <Link
                    to={`/topping/${topping.name}`}
                    key={topping.id}
                    className={topping.name === activeTopping ? 'active' : ''}
                >
                    <span className='name'>{topping.name}</span>
                    <span className='count'>{topping.count}</span>
                </Link>
            ))}
        </ToppingsStyles>
    );
};

export default ToppingsFilter;
