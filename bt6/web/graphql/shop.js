import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

const INFO = `
query queryShop {
    shop {
        name
        email
        contactEmail
        myshopifyDomain
        ianaTimezone
        currencyCode
        currencyFormats {
            moneyFormat
        }
    }
}
`;

const PRODUCT_TAGS = `
query queryShop {
    shop {
        productTags(first: 250) {
            edges {
                node
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
        }
    }
}
`;

const SHOP_QUERY = Object.freeze({
    info: INFO,
    productTags: PRODUCT_TAGS
})

export default async function shop(session, shopOptions) {
    const client = new shopify.api.clients.Graphql({ session });
    const options = {
        query: 'info',
        ...shopOptions
    }

    try {
        const data = await client.query({
            data: {
                query: SHOP_QUERY[options.query]
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
