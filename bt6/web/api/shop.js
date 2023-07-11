import Graphql from "../graphql/index.js";

const ShopApi = [
    {
        method: "get",
        path: "/api/shop",
        handler: async (_req, res) => {
            const result = {
                success: null,
                payload: null,
                error: null
            };

            try {
                result.payload = await Graphql.Shop(res.locals.shopify.session);
                result.success = true;
            } catch (e) {
                console.log(`Failed to process products/create: ${e.message}`);
                result.success = false;
                result.error = e.message;
            }
            res.status(200).send(result)
        },
    }

];

export default ShopApi;