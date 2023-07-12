import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

function productFields() {
    return `
    id
    handle
    title
    hasOnlyDefaultVariant
    priceRangeV2 {
        minVariantPrice {
            amount
        }
    }
    `;
}

const PRODUCTS_QUERY = Object.freeze({
    product: (query) => {
        return `{
            products(first: 15${query}) {
                edges {
                    node {
                        ${productFields()}
                    }
                }
            }
        }
        `;
    },
    collection: (collectionGid) => {
        return `{
            collection(id: "${collectionGid}") {
                products(first: 15) {
                    edges {
                        node {
                            ${productFields()}
                        }
                    }
                }
            }
        }`
    },
})

export default async function products(session, nodeOptions) {
    const client = new shopify.api.clients.Graphql({ session });
    const options = {
        query: "product",
        ...nodeOptions
    }

    try {
        const data = await client.query({
            data: {
                query: PRODUCTS_QUERY[options.query](options.input)
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
