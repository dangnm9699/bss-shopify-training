import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

function fields() {
    return `
    id
    `;
}

const CURRENT_APP_INSTALLTION = `{
    currentAppInstallation {
        ${fields()}
    }
}
`;

export default async function currentAppInstallation(session) {
    const client = new shopify.api.clients.Graphql({ session });

    try {
        const data = await client.query({
            data: {
                query: CURRENT_APP_INSTALLTION
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
