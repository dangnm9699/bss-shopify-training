import Graphql from "../graphql/index.js";

const ProductApi = [
    {
        method: "get",
        path: "/api/products",
        handler: async (req, res) => {
            const { ids } = req.query;
            const result = {
                success: null,
                payload: null,
                error: null
            };
            
            if (ids) {
                try {
                    result.payload = await Graphql.Nodes(res.locals.shopify.session, {
                        query: "product",
                        ids: ids.split(",").map(id=>`"${id}"`).join(","),
                    });
                    result.success = true;
                } catch (e) {
                    console.log(`Failed to process products/ids: ${e.message}`);
                    result.success = false;
                    result.error = e.message;
                }
            } else {
                result.success = true;
            }
            res.status(200).send(result)
        },
    },
    {
        method: "get",
        path: "/api/products/search",
        handler: async (req, res) => {
            const { type, q } = req.query;
            const result = {
                success: null,
                payload: null,
                error: null
            };
            
            if (type) {
                try {
                    result.payload = await Graphql.Products(res.locals.shopify.session, {
                        query: type,
                        input: q || "",
                    });
                    result.success = true;
                } catch (e) {
                    console.log(`Failed to process products/ids: ${e.message}`);
                    result.success = false;
                    result.error = e.message;
                }
            } else {
                result.success = true;
            }
            res.status(200).send(result)
        },
    },
    {
        method: "get",
        path: "/api/collections",
        handler: async (req, res) => {
            const { ids } = req.query;
            const result = {
                success: null,
                payload: null,
                error: null
            };
            
            if (ids) {
                try {
                    result.payload = await Graphql.Nodes(res.locals.shopify.session, {
                        query: "collection",
                        ids: ids.split(",").map(id=>`"${id}"`).join(","),
                    });
                    result.success = true;
                } catch (e) {
                    console.log(`Failed to process collections/ids: ${e.message}`);
                    result.success = false;
                    result.error = e.message;
                }
            } else {
                result.success = true;
            }
            res.status(200).send(result)
        },
    },
];

export default ProductApi;