import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import { PizzasQuery } from '../../types/graphql-types';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';

type OrderPageProps = {
    data: PizzasQuery;
};

const OrderPage: React.FC<OrderPageProps> = ({ data }) => {
    const { values, updateValue } = useForm({
        name: '',
        email: ''
    });
    const pizzas = data.pizzas.nodes;
    const { orders, addToOrder, removeFromOrder } = usePizza();

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
                                    <button type='button' key={size} onClick={() => addToOrder({ id: pizza.id, size })}>
                                        {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                                    </button>
                                ))}
                            </div>
                        </MenuItemStyles>
                    ))}
                </fieldset>
                <fieldset className='order'>
                    <legend>Order</legend>
                    <PizzaOrder orders={orders} pizzas={pizzas} removeFromOrder={removeFromOrder} />
                </fieldset>
                <fieldset>
                    <h3>Your Total is {formatMoney(calculateOrderTotal(orders, pizzas))}</h3>
                    <button type='submit'>Order Ahead</button>
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
