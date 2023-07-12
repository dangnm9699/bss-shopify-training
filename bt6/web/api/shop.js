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
                console.log(`Failed to process shop/info: ${e.message}`);
                result.success = false;
                result.error = e.message;
            }
            res.status(200).send(result)
        },
    },
    {
        method: "get",
        path: "/api/shop/product-tags",
        handler: async (_req, res) => {
            const result = {
                success: null,
                payload: null,
                error: null
            };

            try {
                result.payload = await Graphql.Shop(res.locals.shopify.session, { query: 'productTags' });
                result.success = true;
            } catch (e) {
                console.log(`Failed to process shop/productTags: ${e.message}`);
                result.success = false;
                result.error = e.message;
            }
            res.status(200).send(result)
        },
    }
];

export default ShopApi;