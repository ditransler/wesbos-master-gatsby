import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import { PizzasQuery } from '../../types/graphql-types';
import useForm from '../utils/useForm';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

type OrderPageProps = {
    data: PizzasQuery;
};

const OrderPage: React.FC<OrderPageProps> = ({ data }) => {
    const { values, updateValue } = useForm({
        name: '',
        email: ''
    });
    const pizzas = data.pizzas.nodes;

    return (
        <>
            <SEO title='Order a Pizza!' />
            <OrderStyles>
                <fieldset>
                    <legend>Your Info</legend>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' value={values.name} onChange={updateValue} />
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' value={values.email} onChange={updateValue} />
                </fieldset>
                <fieldset>
                    <legend>Menu</legend>
                    {pizzas.map((pizza) => (
                        <MenuItemStyles key={pizza.id}>
                            <Img width='50' height='50' fluid={pizza.image.asset.fluid} alt={pizza.name} />
                            <div>
                                <h2>{pizza.name}</h2>
                            </div>
                            <div>
                                {['S', 'M', 'L'].map((size) => (
                                    <button type='button' key={size}>
                                        {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                                    </button>
                                ))}
                            </div>
                        </MenuItemStyles>
                    ))}
                </fieldset>
                <fieldset>
                    <legend>Order</legend>
                </fieldset>
            </OrderStyles>
        </>
    );
};

export default OrderPage;

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                slug {
                    current
                }
                price
                image {
                    asset {
                        fluid(maxWidth: 100) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
