import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { ImageAsset } from '../../types/graphql-types';
import SEO from '../components/SEO';

type SlicemasterPageProps = {
    data: {
        person: {
            name: string;
            id: string;
            description: string;
            image: {
                asset: ImageAsset;
            };
        };
    };
};

const SlicemasterPage: React.FC<SlicemasterPageProps> = ({ data: { person } }) => {
    return (
        <>
            <SEO title={person.name} image={person.image?.asset?.fluid?.src} />
            <div className='center'>
                <Img fluid={person.image.asset.fluid} />
                <h2>
                    <span className='mark'>{person.name}</span>
                </h2>
                <p>{person.description}</p>
            </div>
        </>
    );
};

export default SlicemasterPage;

export const query = graphql`
    query($slug: String!) {
        person: sanityPerson(slug: { current: { eq: $slug } }) {
            name
            id
            description
            image {
                asset {
                    fluid(maxWidth: 1000, maxHeight: 750) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
        }
    }
`;
