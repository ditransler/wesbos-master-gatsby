import { useState, useEffect } from 'react';

// If we need syntax highlighting for graphql query strings
// we can fake gql
const gql = String.raw;

// Just to grab the same fields
// both from slicemaster and hotSlices
// Note: we use '_id' instead of 'id' because
// we are querying Sanity directly
const deets = `
    name
    _id
    image {
        asset {
            url
            metadata {
                lqip
            }
        }
    }
`;

const useLatestData = () => {
    // Hot slices
    const [hotSlices, setHotSlices] = useState();
    // Slicemasters
    const [slicemasters, setSlicemasters] = useState();
    // Use a side effect to fetch the data from the graphql endpoint
    useEffect(() => {
        console.log('FETCHING DATA');
        // When the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: gql`
                    query {
                        StoreSettings(id: "downtown") {
                            name
                            slicemaster {
                                ${deets}
                            }
                            hotSlices {
                                ${deets}
                            }
                        }
                    }
                `
            })
        })
            .then((res) => res.json())
            .then((res) => {
                // TODO: check for errors
                // Set the data to state
                setHotSlices(res.data.StoreSettings.hotSlices);
                setSlicemasters(res.data.StoreSettings.slicemaster);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return {
        hotSlices,
        slicemasters
    };
};

export default useLatestData;
