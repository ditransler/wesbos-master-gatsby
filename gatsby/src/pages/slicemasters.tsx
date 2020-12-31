import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { ImageAsset } from '../../types/graphql-types';
import Pagination from '../components/Pagination';

const SlicemasterGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
    a {
        text-decoration: none;
    }

    .gatsby-image-wrapper {
        height: 400px;
    }

    h2 {
        transform: rotate(-2deg);
        text-align: center;
        font-size: 4rem;
        margin-bottom: -2rem;
        position: relative;
        z-index: 2;
    }

    .description {
        background: var(--yellow);
        padding: 1rem;
        margin: 2rem;
        margin-top: -6rem;
        z-index: 2;
        position: relative;
        transform: rotate(1deg);
        text-align: center;
    }
`;

type SliceMaster = {
    name: string;
    id: string;
    slug: {
        current: string;
    };
    description: string;
    image: {
        asset: ImageAsset;
    };
};

type SliceMastersPageProps = {
    data: {
        slicemasters: {
            totalCount: number;
            nodes: Array<SliceMaster>;
        };
    };
    pageContext: {
        skip: number;
        currentPage: number;
    };
};

const SliceMastersPage: React.FC<SliceMastersPageProps> = ({ data, pageContext }) => {
    const slicemasters = data.slicemasters.nodes;

    return (
        <>
            <Pagination
                pageSize={parseInt(process.env.GATSBY_PAGE_SIZE, 10)}
                totalCount={data.slicemasters.totalCount}
                currentPage={pageContext.currentPage || 1}
                skip={pageContext.skip}
                base='/slicemasters'
            />
            <SlicemasterGrid>
                {slicemasters.map((person) => (
                    <SlicemasterStyles key={person.id}>
                        <Link to={`/slicemaster/${person.slug.current}`}>
                            <h2>
                                <span className='mark'>{person.name}</span>
                            </h2>
                        </Link>
                        <Img fluid={person.image.asset.fluid} />
                        <p className='description'>{person.description}</p>
                    </SlicemasterStyles>
                ))}
            </SlicemasterGrid>
        </>
    );
};

export default SliceMastersPage;

export const query = graphql`
    query($skip: Int = 0, $pageSize: Int = 2) {
        slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
            totalCount
            nodes {
                name
                id
                slug {
                    current
                }
                description
                image {
                    asset {
                        fluid(maxWidth: 410) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
