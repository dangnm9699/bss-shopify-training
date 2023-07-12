import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

function getNodes(ids, resource, fieldsQuery) {
    return `
    {
        nodes(ids: [${ids}]) {
            id
            ...on ${resource} {
                ${fieldsQuery}
            }
        }
    }
    `;
}

const NODES_QUERY = Object.freeze({
    product: (ids) => getNodes(ids, "Product", `
        handle
        images(first: 1) {
            edges {
                node {
                    url
                }
            }
        }
        title
        hasOnlyDefaultVariant
        priceRangeV2 {
            minVariantPrice {
                amount
            }
        }
    `),
    collection: (ids) => getNodes(ids, "Collection", `
        handle
        image {
            url
        }
        title
    `),
})

export default async function nodes(session, nodeOptions) {
    const client = new shopify.api.clients.Graphql({ session });
    const options = {
        query: 'product',
        ...nodeOptions
    }

    try {
        const data = await client.query({
            data: {
                query: NODES_QUERY[options.query](options.ids)
            }
        });
        return data;
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message}\n${JSON.stringify(error.response, null, 2)}`
            );
        } else {
            throw error;
        }
    }
}
