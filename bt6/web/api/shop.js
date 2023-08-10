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
    },
    {
        method: "get",
        path: "/api/shop/current-app-installation",
        handler: async (_req, res) => {
            const result = {
                success: null,
                payload: null,
                error: null
            };

            try {
                result.payload = await Graphql.CurrentAppInstallation(res.locals.shopify.session);
                result.success = true;
            } catch (e) {
                console.log(`Failed to process shop/currentAppInstalltion: ${e.message}`);
                result.success = false;
                result.error = e.message;
            }
            res.status(200).send(result)
        },
    },
    {
        method: "post",
        path: "/api/shop/metafields",
        handler: async (req, res) => {
            const result = {
                success: null,
                payload: null,
                error: null
            };

            console.log(req.body)

            const options = {
                count: req.body.count,
                appInstallationId: req.body.appInstallationId
            }

            try {
                result.payload = await Graphql.CreateAppMetatields(res.locals.shopify.session, options);
                result.success = true;
            } catch (e) {
                console.log(`Failed to process shop/createMetafields: ${e.message}`);
                result.success = false;
                result.error = e.message;
            }
            console.log(`result.payload`, result.payload.body.data.metafieldsSet);
            res.status(200).send(result)
        },
    }
];

export default ShopApi;