import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

const SHOP_QUERY = `
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

export default async function shop(session) {
    const client = new shopify.api.clients.Graphql({ session });

    try {
        const data = await client.query({
            data: {
                query: SHOP_QUERY
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
